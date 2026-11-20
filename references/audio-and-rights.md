# Audio, voice, SFX, musik NCS, dan hak pakai

## Pilihan yang ditawarkan ke pengguna

Untuk permintaan audio, tanyakan jenis sumber yang diinginkan jika belum jelas:

- **Voice:** hasilkan TTS dengan suara yang tersedia, cari voice/rekaman berlisensi, atau pakai rekaman pengguna.
- **Sound effect:** hasilkan efek sederhana dengan alat audio atau `scripts/generate-sfx.mjs`, cari efek dari pustaka berlisensi, atau pakai file pengguna.
- **Musik:** cari track NCS resmi yang sesuai brief, pakai musik berlisensi pengguna, atau buat musik orisinal bila alat yang tersedia mendukung pembuatan musik dan hak pakainya jelas.

Jangan menyebut musik hasil generasi sebagai “rilisan NCS”. NCS adalah label/sumber track tertentu, bukan nama lisensi universal.

## Saat mencari track NoCopyrightSounds

1. Mulai dari katalog resmi [1](https://ncs.io/) dan baca [2](https://ncs.io/usage-policy) serta [3](https://ncs.io/usage-policy/terms) pada waktu penggunaan.
2. Tentukan apakah video dibuat oleh kreator independen atau untuk brand/perusahaan, iklan produk, film, game, atau distribusi lain. Kebijakan penggunaan dapat berbeda menurut konteks; jangan menyimpulkan izin dari nama “NoCopyrightSounds”.
3. Buka halaman track yang dipilih. Catat judul, artis, URL resmi, URL unduh resmi, teks atribusi resmi, versi kebijakan yang diperiksa, dan rencana platform tayang.
4. Pastikan penggunaan, pemotongan track, monetisasi, dan kebutuhan atribusi sesuai kebijakan yang berlaku. Jika belum pasti atau perlu lisensi terpisah, minta pengguna menyediakan izin/track lain atau hubungi pemegang hak. Jangan menyisipkan track sebagai placeholder yang terlihat final.
5. Simpan atribusi yang harus dipublikasikan di berkas `CREDITS.md` proyek video.

Dokumen ini memberi alur pemeriksaan, bukan izin otomatis. Kebijakan resmi dapat berubah.

## Voice

- Minta bahasa, karakter suara, durasi, dan naskah. Bila alat menyediakan contoh suara, biarkan pengguna memilih jika pilihan itu memengaruhi hasil.
- Gunakan hanya alat voice yang benar-benar tersedia. Catat penyedia/alat, ketentuan penggunaan output, dan file final.
- Bila pengguna memberikan rekaman, periksa izin pemakaian yang relevan dan jangan meniru suara orang nyata tanpa hak yang sesuai.
- Simpan voice final sebelum alignment caption. Jika naskah atau kecepatan voice berubah, ulangi alignment.

## Sound effect

- Efek sintesis bawaan dapat dibuat tanpa layanan eksternal:

  ```bash
  node scripts/generate-sfx.mjs --type whoosh --out sfx/whoosh.wav --duration 0.65 --seed 7
  ```

- Tipe yang tersedia: `whoosh`, `pop`, `click`, `impact`, `riser`. Skrip menghasilkan WAV mono 48 kHz, 16 bit; tentukan durasi sesuai shot. Efek lebih kompleks membutuhkan generator audio lain atau sumber aset yang hak pakainya sesuai.
- Saat mencari SFX, catat pembuat, tautan sumber, jenis lisensi, kewajiban kredit, dan apakah penggunaan komersial diizinkan.

## Sinkronisasi dan pencampuran

- Rancang timeline dari voice dan beat musik final. Untuk caption sync, forced alignment atau penandaan manual menghasilkan pasangan `{text,startSec,endSec}`. Koreksi semua timing yang terdengar meleset.
- Ubah waktu ke frame dengan `Math.round(second * fps)` jika perlu membuat cue frame. Saat memeriksa aktif/tidaknya kata, `frame / fps` menghindari akumulasi pembulatan.
- SFX harus menjelaskan aksi visual; jangan menutup ujaran. Atur fade dan level musik di bawah voice. Periksa peak akhir agar tidak clipping, lalu dengarkan pada speaker dan headphone bila tersedia.
- Teks atribusi publik harus dibuat berdasarkan ketentuan tiap aset, bukan hanya dari lisensi skill.

## Manifest audio yang perlu disimpan dalam proyek video

```json
[
  {
    "kind": "voice",
    "file": "public/audio/voice.wav",
    "source": "TTS atau rekaman pengguna",
    "creator": "Nama atau alat",
    "sourceUrl": null,
    "licenseOrTerms": "URL atau rujukan dokumen",
    "attribution": null,
    "usageCheckedAt": "YYYY-MM-DD"
  },
  {
    "kind": "music",
    "file": "public/audio/music.mp3",
    "source": "NCS / lisensi lain",
    "creator": "Artis",
    "sourceUrl": "https://ncs.io/...",
    "licenseOrTerms": "https://ncs.io/usage-policy",
    "attribution": "Teks resmi track",
    "usageCheckedAt": "YYYY-MM-DD"
  }
]
```

Jangan mengisi entri seolah-olah aset sudah tersedia sebelum file dan hak pakainya diverifikasi.
