# NGABRAG PWA

Paket ini berisi game NGABRAG v3, ikon aplikasi, dan cache offline. Folder hasil ekstrak siap diunggah ke hosting statis melalui HTTPS.

## Pasang pada situs NGABRAG yang sudah ada

1. Ekstrak ZIP.
2. Unggah isi folder paket ke folder situs yang dilayani GitHub Pages, Netlify, atau hosting statis lain. Pastikan `index.html`, `sw.js`, dan `manifest.webmanifest` berada di folder yang sama, bersama `icons/` dan `vendor/`.
3. Untuk situs yang ada di `https://ictcikpus.github.io/Ngabrag/`, gunakan direktori yang membuka alamat itu agar progres tersimpan di origin yang sama. Pertahankan file lain yang sudah dipakai situs.
4. Buka alamat HTTPS game dan tunggu tulisan **File game siap dimainkan offline**.

## Instal di ponsel

- **Android Chrome** — ketuk **Instal aplikasi** pada layar awal dan konfirmasi. Jika browser mengarahkan Anda ke menunya, pilih **Instal aplikasi** atau **Tambahkan ke layar utama**.
- **iPhone Safari** — buka menu **Bagikan**, pilih **Tambah ke Layar Utama**, lalu ketuk **Tambah**.

Progres tetap tersimpan di browser yang digunakan. Jika data situs atau cache dihapus, buka lagi game saat online untuk mengunduh file offline.

## Uji lokal

Jalankan `python -m http.server 8000` dari folder ini, lalu buka `http://localhost:8000/`. Instalasi dari ponsel memerlukan alamat situs HTTPS. Mode offline bisa diuji setelah game siap dengan memutus jaringan lalu membuka ulang alamat yang sama.

Jika game diperbarui, terbitkan isi paket sebagai satu rilis dan ganti ID cache pada `sw.js`. Service worker baru aktif setelah tab lama ditutup.
