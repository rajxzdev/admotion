# Contoh proyek Remotion

Contoh ini menunjukkan satu komposisi `Demo` berdurasi lima detik pada 1920×1080, 30 FPS. Gaya yang didemonstrasikan: kinetic type, neon glow, dan particles. Gaya lain dijelaskan dalam `../references/style-catalog.md`.

```bash
npm install
npm run dev
npm run typecheck
npm run render
```

`npm run render` menghasilkan `out/demo.mp4`. Bila `LayoutGuard` melaporkan elemen offside, perbaiki posisi, ukuran, transform, atau padding efek dan jalankan ulang. Guard memeriksa semua elemen DOM; `data-safe-element` memberi nama yang jelas pada error. Jangan hapus penanda itu untuk mengatasi error.

Saat memperbarui dependensi, samakan versi paket `remotion` dan seluruh paket `@remotion/*`.

Untuk video baru:

1. Salin/ubah `src/Demo.tsx` dan daftarkan komposisi baru di `src/Root.tsx`.
2. Setel resolusi, FPS, durasi, font, warna, dan gaya sesuai brief pengguna.
3. Tambahkan audio final dari sumber yang hak pakainya sesuai. Catat di manifest aset.
4. Jika voice dan caption sync dipilih, buat array `CaptionWord` dari audio final, lalu pasang `CaptionTrack`.
5. Pastikan seluruh elemen visual bertanda `data-safe-element`, termasuk pembungkus shadow/glow.
6. Render semua frame dan tinjau hasil audio serta visual.

Folder `public/` tersedia untuk aset lokal. Berkas audio tidak disertakan, sehingga demo dapat dirender tanpa pencarian atau unduhan aset.

Untuk memasang voice setelah file final tersedia di `public/audio/voice.wav`:

```tsx
import {Audio} from '@remotion/media';
import {staticFile} from 'remotion';
import {CaptionTrack, type CaptionWord} from './CaptionTrack';

const words: CaptionWord[] = [
  {text: 'Halo', startSec: 0.12, endSec: 0.48},
  {text: 'semua', startSec: 0.49, endSec: 0.86},
];

export const VoiceLayer = () => (
  <>
    <Audio src={staticFile('audio/voice.wav')} />
    <CaptionTrack words={words} />
  </>
);
```

Timestamp di atas hanya ilustrasi bentuk data. Untuk video sungguhan, ambil timestamp dari voice final dan periksa hasilnya.
