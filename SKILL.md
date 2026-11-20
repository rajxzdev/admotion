---
name: remotion-video-director
description: Rancang dan buat video Remotion dengan 22 gaya visual, audio pilihan pengguna, caption yang sinkron, pemeriksaan ketat batas frame, dan pilihan render.
---

# Remotion Video Director

Gunakan skill ini ketika pengguna ingin membuat, mengubah, atau merender video dengan Remotion. Baca `references/style-catalog.md` untuk gaya visual, `references/audio-and-rights.md` untuk audio, dan `references/production-and-qa.md` untuk produksi dan pemeriksaan akhir. `starter/` adalah proyek contoh yang dapat disalin dan dikembangkan.

## Aturan interaksi yang wajib

1. **Tautan GitHub skill.** Setiap kali pengguna menempel tautan GitHub yang menunjuk atau tampak menunjuk ke sebuah skill/repo skill, termasuk skill milik pengguna, ajukan satu pertanyaan sebelum memakai tautan itu: **“Tautan skill GitHub ini ingin saya gunakan sebagai referensi, integrasikan ke skill Remotion, atau audit saja?”** Tunggu jawabannya sebelum membuka, mengunduh, menjalankan, atau menggabungkan isi repo. Jika ada beberapa tautan, tanyakan sekaligus tentang peran masing-masing. Kewajiban bertanya ini berlaku juga bila pesan pengguna tampak memberi petunjuk; konfirmasi perannya secara singkat.
2. **Tujuan video.** Pastikan pengguna memilih tujuan: demo, iklan, edukasi, konten sosial, presentasi, teaser, video musik, atau tujuan lain. Jika sudah dinyatakan jelas, catat pilihannya; jika belum, tanyakan. Jangan memilih diam-diam.
3. **Tekanan/energi.** Pastikan pengguna memilih nuansa: kalem, profesional, arogan, agresif, ceria, inspiratif, misterius, sinematik, atau deskripsi lain. Jika belum jelas, tanyakan. Terapkan pilihan ini pada tempo, tipografi, gerak, warna, suara, dan jeda.
4. **Voice dan caption.** Jika ada voice/narasi, tanyakan apakah pengguna menginginkan caption yang disinkronkan ke suara: ya/tidak. Jika “ya”, gunakan timestamp kata atau frasa dari audio final. Jangan menyebut caption “sinkron” jika waktunya hanya ditebak dari panjang teks. Jika tidak ada voice, jangan memaksa pertanyaan caption voice; subtitle biasa boleh ditawarkan terpisah.
5. **Pilihan render.** Cek kemampuan lingkungan terlebih dahulu. Jika Remotion dan dependensinya bisa dijalankan, tawarkan **“Saya renderkan”** atau **“Saya siapkan proyek dan perintah agar Anda render sendiri”** sebelum render final. Hormati pilihan yang sudah diberikan tanpa bertanya ulang. Jika lingkungan tidak bisa render, berikan proyek yang bisa dijalankan dan perintah render yang tepat, serta jelaskan keterbatasannya secara singkat.
6. **Pertanyaan secukupnya.** Gabungkan pilihan yang belum terjawab dalam satu pesan singkat. Pilihan teknis kecil seperti FPS dapat diberi nilai awal dan ditawarkan untuk diubah. Jangan menunda pekerjaan yang tidak bergantung pada jawaban.

Contoh pertanyaan awal bila informasinya belum ada:

> Untuk videonya, pilih tujuan (demo/iklan/edukasi/lainnya), energi (kalem/profesional/arogan/agresif/lainnya), gaya visual utama dari katalog, format layar (16:9/9:16/1:1), dan apakah ingin voice. Jika memakai voice, apakah caption perlu sinkron?

Jika pengguna meminta render dan lingkungan mampu, tanyakan pilihan render setelah konsep dan kebutuhan teknis jelas. Jika tautan GitHub skill turut dikirim, pertanyaan tautan pada aturan 1 harus dijawab sebelum repo digunakan.

## Cakupan gaya visual

Skill ini mendukung: **3D elements, kinetic type, neomorphism, particles, liquid morphs, neon glow, Y2K chrome, paper cutout, holographic, isometric, ASCII art, clay 3D, retro VHS, comic book, split flap, hand drawn, blueprint, physics, pixel art, Bauhaus, Art Deco, dan neo brutalism**. Ejaan pengguna “acii art”, “retro hvs”, “physic”, dan “neo brutaslim” dipahami sebagai gaya yang sesuai di katalog. Pilih satu gaya utama dan paling banyak dua aksen bila pengguna tidak meminta campuran yang lebih rumit. Jangan memaksa semua gaya masuk ke satu video.

## Alur kerja

### 1. Brief dan konsep

- Catat tujuan, audiens, pesan utama, ajakan bertindak, energi, durasi, rasio, bahasa, gaya, aset/brand, tenggat, dan platform tayang. Gunakan `references/brief-template.md`.
- Tulis konsep satu kalimat, urutan shot dengan durasi, teks layar, transisi, serta rencana audio. Dapatkan informasi yang benar-benar diperlukan dari pengguna; buat asumsi yang mudah direvisi untuk detail kecil.
- Tentukan resolusi dan FPS secara eksplisit. Nilai awal: 1920×1080 untuk 16:9, 1080×1920 untuk 9:16, 1080×1080 untuk 1:1; 30 FPS. Sesuaikan durasi dan platform.

### 2. Audio sesuai permintaan

- Pengguna boleh meminta agent **menghasilkan atau mencari voice**, **menghasilkan atau mencari sound effect**, serta **mencari lagu NCS**. Bila “generate lagu NCS” diminta, jelaskan bahwa lagu baru bukan rilisan resmi NoCopyrightSounds; tawarkan musik orisinal dengan hak pakai yang jelas jika alat pembuat musik tersedia.
- Cek alat yang benar-benar tersedia. Untuk voice, gunakan TTS yang tersedia atau cari voice/rekaman yang boleh dipakai. Untuk SFX, gunakan alat audio/sintesis yang tersedia atau cari aset berlisensi. Untuk NCS, telusuri katalog/sumber resmi dan periksa aturan track spesifik sebelum memasukkannya.
- Jangan mengarang file, tautan, izin, atau status lisensi. Simpan sumber, pembuat, ketentuan, atribusi, dan tanggal pemeriksaan di manifest audio. Ikuti `references/audio-and-rights.md`.
- Susun audio final sebelum alignment caption. Sesuaikan level voice, musik, dan SFX agar ujaran tetap jelas; periksa clipping.

### 3. Bangun video

- Gunakan `useCurrentFrame()` dan `useVideoConfig()`; semua animasi harus merupakan fungsi deterministik dari frame. Gunakan `interpolate`, `spring`, `Sequence`, SVG, CSS, atau `@remotion/three` sesuai kebutuhan. Jangan memakai `Math.random()`, waktu sistem, animasi CSS berjalan sendiri, atau simulasi fisika yang bergantung pada urutan render frame.
- Ikuti resep visual per gaya di `references/style-catalog.md`. Gunakan aset lokal/URL yang stabil dan tersedia saat render. Jangan memakai font atau aset tanpa hak pakai yang sesuai.
- Gunakan `starter/src/LayoutGuard.tsx` atau pemeriksaan setara. Guard memeriksa semua elemen DOM; beri `data-safe-element` pada **setiap elemen visual penting** agar error mudah dilacak, termasuk teks, caption, gambar, CTA, partikel/kanvas, dekorasi, dan pembungkus efek. Lapisan latar yang tepat memenuhi seluruh frame diberi `data-frame-background`; kanvas yang tepat memenuhi frame diberi `data-frame-viewport`. Untuk SVG/Canvas/3D, validasi pula isi internalnya, karena kotak DOM luar saja tidak memeriksa bentuk di dalamnya.
- **Nol toleransi offside:** tidak ada bagian elemen yang keluar frame pada frame mana pun, termasuk saat masuk/keluar, transisi, glow, dan shadow. Gunakan reveal mask, opacity, atau scale yang tetap di dalam frame sebagai alternatif gerak dari luar layar. Sisakan ruang aman tambahan untuk teks/CTA dan antarmuka platform. `overflow: hidden` adalah cadangan visual, bukan pengganti pemeriksaan.

### 4. Caption dan sinkronisasi

- Bila pengguna memilih caption sinkron, buat timestamp dari **voice final** dengan forced alignment atau penandaan manual yang diperiksa. Konversi waktu ke frame menggunakan FPS komposisi. Pakai `starter/src/CaptionTrack.tsx` sebagai pola.
- Cocokkan ejaan dengan ujaran, jaga keterbacaan dan kontras, pecah baris secara alami, dan uji timestamp di sekitar pemotongan shot. Periksa awal/akhir voice dan jeda. Bila tidak ada voice, jangan membuat klaim “sync to voice”.

### 5. Quality gate dan hasil

- Periksa semua frame melalui render penuh dengan guard aktif. Perbaiki setiap pelanggaran batas; jangan menonaktifkan guard agar render lolos. Periksa khusus frame awal/akhir, setiap transisi, nilai puncak spring, dan teks terpanjang.
- Tinjau hasil visual dan audio pada resolusi target. Verifikasi durasi, dimensi, FPS, codec, suara, serta caption. Jika tidak bisa melakukan pemeriksaan tertentu, jelaskan keterbatasan nyata itu.
- Jika pengguna memilih **agent merender**, kirim video final beserta proyek dan daftar aset/atribusi. Jika memilih **render sendiri**, kirim proyek yang dapat dijalankan dan perintah `npm install`, `npm run dev`, serta `npm run render`. Sertakan catatan singkat tentang aset yang perlu disediakan.

## Lisensi

Kode dan dokumentasi skill ini memakai **Apache License 2.0** (`LICENSE`). Lisensi tersebut **tidak otomatis melisensikan** voice, SFX, musik NCS, font, gambar, model 3D, atau aset lain dari pihak ketiga. Simpan izin dan atribusinya secara terpisah. Jangan menyebut track NCS “bebas hak cipta” tanpa memeriksa kebijakan pemakaian track dan platformnya.
