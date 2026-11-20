# Katalog 22 gaya visual Remotion

Pilih gaya berdasarkan tujuan dan energi video, bukan hanya tren. Gunakan satu gaya utama, lalu maksimal dua aksen kecuali brief meminta campuran lain. Semua nilai animasi harus dihitung dari `frame` dan `fps`. Semua objek, termasuk efek blur dan bayangan, harus tetap sepenuhnya di dalam frame pada setiap frame. Lihat pemeriksaan di `production-and-qa.md`.

| No. | Gaya | Fungsi yang cocok | Teknik utama |
| --- | --- | --- | --- |
| 1 | 3D elements | demo produk, identitas | `@remotion/three`, kamera terukur |
| 2 | Kinetic type | pesan singkat, teaser | tipografi berbasis `interpolate` |
| 3 | Neomorphism | UI, teknologi kalem | emboss dan inner shadow |
| 4 | Particles | energi, atmosfer | posisi partikel deterministik |
| 5 | Liquid morphs | transisi organik | SVG path/metaball |
| 6 | Neon glow | musik, malam, game | beberapa lapis cahaya |
| 7 | Y2K chrome | fashion, nostalgia digital | metalik dan specular |
| 8 | Paper cutout | edukasi, cerita | potongan kertas berlapis |
| 9 | Holographic | futuristik, produk premium | iridescent dan scan |
| 10 | Isometric | penjelasan sistem | bentuk proyeksi isometrik |
| 11 | ASCII art | teknologi, eksperimen | kisi karakter monospace |
| 12 | Clay 3D | karakter ramah | bentuk matte membulat |
| 13 | Retro VHS | nostalgia, klip | tracking, noise, scanline |
| 14 | Comic book | cerita, energi tinggi | panel, halftone, balon teks |
| 15 | Split flap | jadwal, reveal data | modul karakter berputar |
| 16 | Hand drawn | edukasi, personal | coretan SVG terungkap |
| 17 | Blueprint | konsep teknis | grid, ukuran, anotasi |
| 18 | Physics | demonstrasi sebab akibat | gerak simulasi deterministik |
| 19 | Pixel art | game, nostalgia | sprite dan integer scaling |
| 20 | Bauhaus | identitas desain | geometri primer dan grid |
| 21 | Art Deco | kemewahan, sejarah | simetri, kipas, garis metalik |
| 22 | Neo brutalism | pengumuman, kampanye | blok tegas dan shadow keras |

## Resep produksi

### 1. 3D elements

- Gunakan satu objek 3D utama dengan kamera tetap atau lintasan kamera yang dihitung dari frame. `@remotion/three` cocok jika proyek memakainya; render sequence atau sprite 3D juga dapat dipakai.
- Arah visual: material, cahaya kunci, rim light, dan bayangan yang mendukung bentuk. Hindari gerak kamera yang membuat objek mendadak terpotong.
- Pastikan *projected silhouette* dan bayangan tetap dalam batas frame; uji frame saat rotasi menghasilkan dimensi terlebar. Simpan model dan tekstur secara lokal agar render dapat diulang.

### 2. Kinetic type

- Pilih satu hierarki kata: kata kunci paling besar, kalimat pendukung lebih kecil. Gerakkan skala, opasitas, tracking, atau pergeseran **di dalam** kotak aman.
- Gunakan `interpolate(frame, ...)` atau `spring({frame,fps,config})`. Ukur teks dengan font final; batasi baris, gunakan `overflowWrap`, dan kecilkan ukuran saat teks panjang.
- Hindari masuk dari luar layar. Gunakan reveal mask di dalam bounding box, atau skala 0.85→1 dengan pusat tetap.

### 3. Neomorphism

- Dasar warna netral lembut, highlight terang di kiri atas, shadow lembut di kanan bawah; gunakan efek cekung untuk tombol aktif.
- Jaga kontras teks dan kontrol. Neomorphism tidak boleh membuat informasi sulit dibaca.
- Sisakan padding sebesar radius blur/shadow di sekeliling kartu; pembungkus efek ikut diperiksa batasnya.

### 4. Particles

- Gunakan seed tetap per partikel (`random('particle-' + id)` dari Remotion atau fungsi hash tetap), lalu hitung posisi dari frame. Tetapkan jumlah partikel sesuai resolusi dan kemampuan render.
- Bentuk gerak: orbit, drift, pulsa, atau arus terarah. Spawn/fade di dalam area aman; clamp pusat dan radius partikel ke frame.
- Jika memakai Canvas, kotak Canvas saja tidak cukup: periksa rumus posisi/radius internal. Jangan gunakan `Math.random()` saat render.

### 5. Liquid morphs

- Morph SVG path dengan jumlah titik/perintah yang cocok, atau gabungkan lingkaran melalui blur dan threshold untuk efek metaball.
- Jaga transisi bentuk tetap terbaca; gunakan warna yang kontras dengan teks.
- Perluas area filter SVG di **dalam** batas komposisi, dan beri padding untuk blur sehingga cairan tidak terpotong.

### 6. Neon glow

- Bentuk cahaya dari lapis inti tajam, halo sedang, dan halo luas. Gunakan warna gelap di belakang agar efek bekerja tanpa overexposure.
- Animasikan intensitas perlahan; hindari kedip yang mengganggu dan perubahan luminans ekstrem.
- Tandai pembungkus glow, bukan hanya teks inti, sebagai elemen aman. Padding harus mencakup radius halo terbesar.

### 7. Y2K chrome

- Gabungkan gradien perak, highlight putih tajam, pantulan biru/ungu, dan tipografi membulat atau objek metalik.
- Gerakkan pantulan, bukan seluruh layout, untuk rasa chrome yang hidup. Tekstur noise tipis dapat menghindari tampilan terlalu datar.
- Semua kilau dan lens flare tetap di dalam frame; ukur lebar teks dengan font final.

### 8. Paper cutout

- Susun siluet sederhana seperti lembaran kertas: warna sedikit bertekstur, tepi halus, shadow antar lapisan, gerak paralaks kecil.
- Cocokkan kedalaman dengan urutan layer dan sumber cahaya yang konsisten.
- Gerakkan layer dalam rentang aman; shadow tidak boleh melewati batas visual frame.

### 9. Holographic

- Gunakan spektrum iridescent, strip cahaya, dan perubahan warna berdasarkan posisi/rotasi; teks utama tetap kontras.
- Tambahkan scan yang halus, bukan flicker cepat. Untuk produk, batasi efek agar bentuk asli masih terlihat.
- Mask seluruh efek dalam bentuk yang tetap di dalam frame. Periksa pantulan paling terang dan lebar halo.

### 10. Isometric

- Bangun bidang dari polygon SVG atau transform terukur; gunakan sudut proyeksi konsisten untuk semua objek.
- Struktur harus mudah diikuti: basis, ketinggian, label, lalu aliran/animasi.
- Hitung bounding box dari seluruh titik polygon setelah transform, bukan dari titik pusat saja. Label jangan bertabrakan dengan tepi.

### 11. ASCII art

- Ejaan alternatif pengguna: “acii art”. Buat kisi karakter monospace, atur kepadatan berdasarkan luminans atau pola yang dihitung dari frame.
- Jaga ukuran sel tetap dan gunakan font monospace yang tersedia saat render. Kontraskan pola utama dengan latar.
- Jumlah kolom/baris harus muat tepat; hindari karakter tambahan yang membuat baris melebar. Gunakan `whiteSpace: pre` dan ukuran grid terukur.

### 12. Clay 3D

- Bedakan dari chrome: bentuk membulat, material matte, warna pastel, cahaya lunak, bayangan kontak lembut.
- Animasi squash/stretch ringan boleh digunakan jika volume dan bentuk tetap konsisten.
- Bounding box harus memperhitungkan deformasi, bayangan, dan rotasi pada frame terlebar.

### 13. Retro VHS

- Ejaan alternatif pengguna: “retro hvs”. Gunakan garis scan, noise berbasis seed, pergeseran warna kecil, tracking horizontal, dan timestamp jika relevan.
- Efek tracking harus singkat dan tetap terbaca; hindari gambar bergetar terus menerus.
- Komposisi efek ditempatkan dalam mask frame. Teks dan objek utama tidak boleh bergeser keluar saat glitch.

### 14. Comic book

- Buat panel dengan border tebal, halftone, warna pop, speed lines, dan balon dialog yang terhubung dengan pembicara.
- Animasikan urutan baca panel dengan `Sequence`; jeda cukup agar teks terbaca.
- Balon, ekor balon, dan speed lines dihitung sebagai elemen; ujungnya tidak boleh offside.

### 15. Split flap

- Bentuk modul karakter dua setengah kartu, sumbu putar di tengah, tipografi seragam. Perbarui satu karakter per interval frame yang jelas.
- Gunakan `rotateX` atau precomposed frames; hitung huruf sebelumnya dan berikutnya secara deterministik.
- Baris modul harus dipusatkan sesuai jumlah karakter terpanjang. Jangan biarkan ujung kartu atau shadow melewati frame.

### 16. Hand drawn

- Gunakan path SVG dengan `strokeDasharray` dan `strokeDashoffset` untuk menampilkan proses menggambar. Tambahkan wobble kecil dari fungsi sinus/seed tetap.
- Pilih ketebalan garis dan tekstur yang tetap jelas pada resolusi akhir.
- Periksa semua titik path serta stroke width. Jangan mulai menggambar dari koordinat negatif.

### 17. Blueprint

- Latar biru gelap, grid halus, garis konstruksi, dimension lines, panah, dan label teknis.
- Reveal bertahap: grid → kerangka → detail → anotasi. Pastikan label tetap menjadi fokus.
- Grid dapat tepat mengisi frame; seluruh panah, marker, dan teks berada di area aman.

### 18. Physics

- Ejaan alternatif pengguna: “physic”. Simulasi harus dapat diulang pada frame acak: gunakan solusi analitik (mis. parabola), atau precompute state untuk tiap frame sebelum render.
- Untuk collision, tentukan massa, gesekan, gravitasi, batas, dan seed secara eksplisit. Uji keadaan ekstrem di frame pertama, tengah, dan akhir.
- Clamp posisi dengan ukuran benda termasuk radius dan shadow. Jangan mengandalkan simulasi mutable yang hanya benar bila frame dirender berurutan.

### 19. Pixel art

- Gunakan ukuran piksel virtual dan scale integer, sprite sheet atau bentuk SVG kotak. `imageRendering: pixelated` menjaga tepi tajam.
- Gerak per langkah frame cocok untuk nuansa game; desain UI dan font mengikuti grid yang sama.
- Pastikan resolusi virtual kali faktor scale tidak melebihi frame, dan sprite tidak keluar saat animasi.

### 20. Bauhaus

- Warna primer, bentuk lingkaran/persegi/segitiga, tipografi sederhana, komposisi grid yang seimbang.
- Gerak geometris jelas dan teratur; satu bentuk dapat menjadi penunjuk narasi.
- Ketebalan stroke dan rotasi bentuk dihitung dalam bounding box. Hindari tepi lingkaran terpotong.

### 21. Art Deco

- Simetri, garis emas/kuningan, kipas, sunburst, motif bertingkat, latar gelap atau krem.
- Masuknya elemen bisa berurutan dari tengah ke samping; gerak cenderung anggun.
- Ornamen di tepi tetap memiliki margin. Aksen metalik dan shadow ikut masuk pemeriksaan.

### 22. Neo brutalism

- Ejaan alternatif pengguna: “neo brutaslim”. Gunakan border tebal, warna kontras, layout blok, tipografi besar, dan shadow keras dengan offset.
- Tempo bisa cepat dan lugas, tetapi hierarki pesan tetap jelas.
- Hitung offset shadow sebagai bagian ukuran nyata kartu; jangan meletakkan kartu tepat di tepi.

## Memadukan gaya

- **Demo produk profesional:** 3D elements + blueprint + kinetic type.
- **Iklan agresif:** kinetic type + neo brutalism + comic book.
- **Edukasi kalem:** paper cutout + isometric + hand drawn.
- **Teaser musik:** neon glow + particles + liquid morphs.
- **Nostalgia digital:** retro VHS + Y2K chrome + ASCII art.

Contoh ini hanya inspirasi; tujuan dan tekanan yang dipilih pengguna tetap menentukan hasil.
