# Virtual Assistant Chat Interface

## Deskripsi Proyek

Proyek ini bertujuan untuk mengembangkan antarmuka asisten virtual yang memungkinkan pengguna untuk berinteraksi melalui pengaturan percakapan (chat). Antarmuka ini dirancang untuk menerima pertanyaan, memberikan jawaban secara real-time, serta menyimpan histori percakapan untuk referensi di masa mendatang.

## Tools & Referensi Kode

- **[Visual Studio Code](https://code.visualstudio.com/)**: Editor kode yang digunakan untuk pengembangan proyek.
- **[Postman](https://www.postman.com/)**: Alat untuk pengujian API.
- **[XAMPP](https://www.apachefriends.org/index.html)**: Platform pengembangan PHP dan MySQL (PHP versi 8.1 atau lebih baru diperlukan).
- **[Composer](https://getcomposer.org/)**: Manajer dependensi PHP untuk mengelola paket Laravel.
- **[React](https://react.dev/)**: Library JavaScript untuk membangun antarmuka pengguna.
- **[Vite](https://vitejs.dev/guide/)**: Alat build cepat untuk React, lihat panduannya di [Vite Guide](https://vitejs.dev/guide/).
- **[Chat UI Kit React](https://github.com/chatscope/chat-ui-kit-react)**: Library untuk membangun antarmuka chat.
- **[RestAPI](https://github.com/mrmuhammadrifki/study-case-msib-telkom-indonesia-api)**: Backend untuk mendapatkan dan menyimpan histori percakapan menggunakan Laravel 10.
- **[API ChatGPT](https://platform.openai.com/docs/overview)**: Dokumentasi API tersedia di ChatGPT API Overview.

## Persyaratan

- **[Node.js](https://nodejs.org/en)**: Versi 18 atau lebih baru diperlukan.
- **[XAMPP](https://www.apachefriends.org/index.html)**: PHP versi 8.1 atau lebih baru diperlukan.
- **[Composer](https://getcomposer.org/)**: Pastikan Composer terinstal.

## Cara Menjalankan Proyek

1. **Clone** repositori ini ke dalam lokal mesin Anda dengan perintah:
   ```bash
   git clone https://github.com/mrmuhammadrifki/study-case-msib-telkom-indonesia-api.git
   ```
2. **Install** semua dependensi menggunakan perintah `npm install`.
3. **Buat** file `.env` di root project, dan tambahkan API key Anda:
   ```bash
   VITE_API_KEY=<YOUR_API_KEY>
   ```
4. **Jalankan Composer** untuk menginstall dependensi PHP menggunakan perintah:
   ```bash
   composer install
   ```
5. **Jalankan** aplikasi frontend menggunakan perintah `npm run dev`.
6. **Jalankan Server API Backend**: Untuk menjalankan server API backend, silakan ikuti panduan di repositori GitHub berikut: [Panduan Server API Backend](https://github.com/mrmuhammadrifki/study-case-msib-telkom-indonesia-api).

## Fitur yang Diimplementasikan

- **Tampilan Percakapan**: Menyediakan antarmuka chat dengan area masukan untuk pengguna dan tampilan percakapan yang rapi. Setiap pesan ditandai dengan pengirim (asisten atau pengguna).
- **Interaksi dengan Asisten Virtual**: Pengguna dapat mengajukan pertanyaan atau memberikan perintah kepada asisten virtual, yang akan memberikan respons berdasarkan API CHAT GPT.
- **Histori Percakapan**: Semua percakapan disimpan di backend menggunakan Laravel 10 dan MySQL. Pengguna dapat mengakses dan membuka kembali sesi percakapan yang telah berlangsung.
- **Pertanyaan Rekomendasi**: Bagian antarmuka yang menampilkan pertanyaan-pertanyaan yang direkomendasikan. Pengguna dapat memilih dan mengirim pertanyaan yang direkomendasikan dengan sekali klik.
- **Antarmuka Responsif**: Menggunakan library `chat-ui-kit-react` untuk memastikan antarmuka responsif dan memberikan pengalaman pengguna yang optimal. Efek visual dan animasi ditambahkan untuk meningkatkan daya tarik visual.
- **Unit Testing**: Implementasi unit testing pada API backend untuk memastikan format respons API sesuai dengan yang diharapkan.

---

Dokumentasi ini sekarang mencakup tautan langsung pada semua alat dan referensi yang digunakan dalam proyek, memudahkan akses dan penggunaan.
