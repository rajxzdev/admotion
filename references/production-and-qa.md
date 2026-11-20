# Produksi Remotion dan quality gate

## Struktur proyek

`starter/` memberikan komposisi minimal dan dua komponen yang bisa disalin ke proyek lain:

- `src/LayoutGuard.tsx`: memeriksa kotak semua elemen DOM pada setiap frame render setelah font siap; render dibatalkan jika ada yang keluar area aman.
- `src/CaptionTrack.tsx`: caption berbasis timestamp audio final.
- `src/Demo.tsx`: contoh kinetic type, neon glow, dan partikel deterministik.

Proyek baru boleh memakai struktur lain, tetapi harus mempertahankan pemeriksaan yang setara. Setiap komposisi harus menetapkan `id`, `width`, `height`, `fps`, dan `durationInFrames` secara eksplisit.

## Aturan geometri: nol offside

1. Frame komposisi adalah persegi panjang `[0,width] × [0,height]`. Seluruh elemen visual, termasuk bayangan, glow, dan gerak transisi, harus berada di dalamnya pada semua frame. Untuk teks, CTA, caption, dan objek penting, gunakan margin aman awal 4% dari lebar/tinggi. Sesuaikan margin platform agar tidak tertutup antarmuka.
2. Beri `data-safe-element="nama"` pada setiap elemen visual penting atau pembungkus yang benar-benar mencakup efeknya agar error mudah ditelusuri. Guard tetap memeriksa elemen yang tidak bertanda. `LayoutGuard` memeriksa `getBoundingClientRect()` setelah font siap. Gunakan `data-frame-background` untuk lapisan latar yang tepat memenuhi frame; gunakan `data-frame-viewport` untuk kanvas/viewport yang tepat memenuhi frame. Keduanya masih harus berada di dalam frame.
3. Background full bleed harus tepat sebesar frame. Background yang di-*scale* lebih besar dari frame tetap melanggar prinsip ini; crop aset terlebih dahulu atau gunakan `object-fit: cover` dalam kotak frame tanpa menggeser elemen konten ke luar.
4. Untuk SVG, Canvas, WebGL, dan 3D, DOM hanya bisa memeriksa viewport/kanvas. Hitung atau inspeksi bounding bentuk internal juga: radius partikel, stroke width, titik path, bayangan, dan proyeksi model 3D.
5. Font dan teks: tunggu font final; uji kalimat terpanjang; batasi lebar, lakukan wrapping atau sizing dinamis. Gunakan `fitText()` dari [4](https://www.remotion.dev/docs/layout-utils/fit-text) bila panjang teks berubah. Tidak boleh mengakali kegagalan dengan `overflow: hidden` yang memotong huruf penting.
6. `spring()` dapat overshoot. Ukur puncak posisinya di seluruh timeline, bukan hanya awal dan akhir. Jika ada satu frame gagal, perbaiki gerak/ukuran lalu render ulang.
7. Animasi masuk/keluar dimulai dan berakhir di dalam frame; gunakan opacity, reveal mask, transform kecil dalam kotak aman. Jangan menempatkan elemen sementara di luar frame.

## Pemeriksaan saat membangun

- Jalankan Studio dan periksa orientasi target, terutama format vertikal.
- Gunakan garis bantu margin dan panel platform saat merancang; hilangkan dari hasil akhir.
- Tinjau frame pertama, frame terakhir, setiap potongan/transisi, ukuran teks terpanjang, puncak rotasi 3D, dan puncak spring.
- Render penuh dengan guard aktif. Karena setiap frame video final dirender, pelanggaran DOM akan membatalkan proses. Periksa juga isi Canvas/SVG/3D secara visual atau dengan batas matematis.
- Dengarkan awal, tengah, dan akhir suara; cek sinkron caption pada potongan voice dan sesudah jeda panjang.

## Perintah contoh

Di direktori `starter/`:

```bash
npm install
npm run dev
npm run render
```

`npm run render` menghasilkan `out/demo.mp4` dengan komposisi `Demo`. Untuk proyek turunan, ubah ID dan path output sesuai kebutuhan. Periksa hasil dengan:

```bash
ffprobe -v error -show_entries stream=index,codec_name,width,height,r_frame_rate -show_entries format=duration -of json out/demo.mp4
```

Jika tidak dapat memasang dependensi atau menjalankan browser renderer di lingkungan agent, jangan mengklaim video sudah dirender atau pemeriksaan semua frame telah lulus. Berikan proyek dan perintah yang dapat dijalankan pengguna. Jika agent mampu merender, tawarkan pilihan render sebelum menjalankan render final.

## Kriteria selesai

- Tujuan dan tekanan/energi video benar-benar dipilih pengguna atau sudah tertulis jelas dalam permintaan.
- Gaya dan durasi cocok dengan brief.
- Tidak ada elemen offside pada frame mana pun; guard aktif saat render final.
- Audio ada hanya jika diminta/diizinkan, dapat didengar jelas, dan sumber/hak pakainya dicatat.
- Jika voice dan caption sync dipilih, teks cocok dengan suara final dan timestamp diverifikasi.
- Lisensi skill Apache 2.0 dibedakan dari lisensi aset.
- Hasil sesuai pilihan render: video final jika agent merender; proyek, aset, dan perintah jika pengguna merender.
