# Remotion Video Director

Skill agent berbahasa Indonesia untuk merancang, membuat, dan merender video Remotion. Paket ini memuat alur pertanyaan pengguna, resep **22 gaya visual**, aturan audio, pemeriksaan ketat elemen di dalam frame, contoh proyek, dan lisensi Apache 2.0.

## Memasang skill

1. Ekstrak ZIP sehingga folder `remotion-video-director/` tetap utuh.
2. Salin folder itu ke direktori skill yang dibaca agent Anda. File `SKILL.md` harus berada di akar folder skill.
3. Minta agent membaca/menggunakan skill `remotion-video-director` ketika membuat video Remotion.

Skill ini menggunakan format `SKILL.md` yang dapat dibaca agent pendukung format tersebut. Jalur pemasangan berbeda menurut agent; ikuti dokumentasi agent yang Anda pakai.

## Alur saat dipakai

Agent akan meminta pengguna memilih **tujuan video** dan **tekanan/energi** jika belum disebutkan. Jika pengguna memberikan tautan GitHub ke skill miliknya, agent wajib menanyakan peran tautan itu terlebih dahulu. Bila memakai voice, agent menanyakan pilihan caption sinkron. Jika lingkungan dapat melakukan render, agent menawarkan pilihan video dirender oleh agent atau proyek disiapkan untuk pengguna render sendiri.

Pengguna dapat meminta voice, SFX, atau track NoCopyrightSounds untuk dicari/dihasilkan sesuai kemampuan alat yang tersedia. Paket menyertakan generator SFX sederhana berbasis Node.js; voice dan musik membutuhkan alat atau sumber yang sesuai.

## Isi paket

| Berkas | Isi |
| --- | --- |
| `SKILL.md` | Aturan utama agent dan urutan kerja |
| `references/style-catalog.md` | 22 gaya dengan resep implementasi dan batas aman |
| `references/audio-and-rights.md` | Voice, SFX, NCS, caption, dan pemeriksaan hak pakai |
| `references/brief-template.md` | Form brief serta shot list |
| `references/production-and-qa.md` | Aturan frame, quality gate, dan perintah render |
| `scripts/generate-sfx.mjs` | Generator WAV deterministik tanpa dependensi |
| `starter/` | Proyek Remotion contoh; demo menunjukkan kinetic type, neon glow, dan particles |
| `LICENSE`, `NOTICE` | Apache License 2.0 untuk kode/dokumentasi paket |

Semua 22 gaya ada dalam katalog sebagai instruksi agent. Demo proyek sengaja hanya menunjukkan pola dasar; agent memilih dan membangun gaya yang diminta pengguna untuk video sesungguhnya.

## Menjalankan contoh

Perlu Node.js 20+ dan akses untuk memasang paket npm:

```bash
cd starter
npm install
npm run dev
npm run typecheck
npm run render
```

Hasil render contoh: `starter/out/demo.mp4`. Render menggunakan `LayoutGuard`; elemen DOM yang keluar area aman membatalkan render. Untuk komposisi baru, beri nama elemen penting dengan `data-safe-element` dan periksa isi Canvas, SVG, serta 3D secara terpisah.

Contoh membuat efek suara orisinal:

```bash
node scripts/generate-sfx.mjs --type whoosh --out starter/public/audio/whoosh.wav --duration 0.65 --seed 7
```

## Lisensi

Kode dan dokumentasi paket ini menggunakan **Apache License 2.0**. Aset yang nanti dipilih atau dibuat pengguna—terutama voice, musik NCS, SFX dari perpustakaan luar, font, gambar, dan model 3D—memiliki ketentuan sendiri. Catat izin dan atribusinya untuk setiap video.
