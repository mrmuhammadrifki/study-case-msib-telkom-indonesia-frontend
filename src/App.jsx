import { useState, useEffect } from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Button,
  ConversationHeader,
  Avatar,
} from '@chatscope/chat-ui-kit-react';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recommendedQuestions] = useState([
    'Apa beda hardware dan software?',
    'Bagaimana memilih sistem operasi?',
    'Apa itu keamanan siber dan cara melindungi data?',
    'Apa itu cloud computing dan manfaatnya?',
    'Bagaimana memulai karier di IT?',
  ]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/conversations');
      const data = await response.json();

      if (data.success) {
        const fetchedMessages = data.data.map((conv) => ({
          message: conv.message,
          direction: conv.direction,
          sender: conv.sender,
        }));
        setMessages(fetchedMessages);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  async function saveConversation(message) {
    const formData = new FormData();
    formData.append('message', message.message);
    formData.append('direction', message.direction);
    formData.append('sender', message.sender);

    try {
      const response = await fetch('http://localhost:8000/api/conversations', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!data.success) {
        console.error('Failed to save conversation:', data.message);
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  }

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);

    await handleProcessMessageToMamihAI(newMessages);
  };

  async function handleProcessMessageToMamihAI(messages) {
    let apiMessages = messages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'MamihAI') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: 'system',
      content: 'Explain like I am a 10 year old',
    };

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        const mamihAIMessage = {
          message: data.choices[0].message.content,
          direction: 'incoming',
          sender: 'MamihAI',
        };

        const userMessage = {
          message: messages[messages.length - 1].message,
          direction: messages[messages.length - 1].direction,
          sender: messages[messages.length - 1].sender,
        };

        const updatedMessages = [...messages, mamihAIMessage];
        setMessages(updatedMessages);

        saveConversation(userMessage);
        saveConversation(mamihAIMessage);

        setTyping(false);
      });
  }

  return (
    <>
      <MainContainer
        responsive
        style={{
          maxWidth: '700px',
          height: '600px',
          margin: 'auto',
        }}
      >
        <ChatContainer>
          <ConversationHeader style={{ textAlign: 'left' }}>
            <Avatar name="Muhammad Rifki" src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg" />
            <ConversationHeader.Content userName="Muhammad Rifki" />
          </ConversationHeader>
          <MessageList
            style={{ paddingTop: '1rem', paddingBottom: '2rem', textAlign: 'center' }}
            scrollBehavior="smooth"
            typingIndicator={typing ? <TypingIndicator content="Mamih AI sedang mengetik..." /> : null}
          >
            {recommendedQuestions.map((question, i) => (
              <Button
                key={i}
                style={{
                  backgroundColor: '#f0f0f0',
                  color: '#000',
                  marginBottom: recommendedQuestions.length - 1 == i ? '24px' : '8px',
                }}
                onClick={() => handleSend(question)}
              >
                {question}
              </Button>
            ))}
            <Message
              model={{
                message: 'Halo, saya Mamih AI asisten pribadi kamu',
                direction: 'incoming',
                sender: 'MamihAI',
                position: 'single',
              }}
              style={{
                marginBottom: '8px',
                textAlign: 'start',
              }}
            />
            {messages.map((message, i) => (
              <Message
                key={i}
                model={message}
                style={{
                  marginBottom: '8px',
                  textAlign: 'start',
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            attachButton={false}
            placeholder="Tulis pesan disini"
            onSend={(message) => handleSend(message)}
          />
        </ChatContainer>
      </MainContainer>
    </>
  );
}

export default App;
