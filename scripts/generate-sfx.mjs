#!/usr/bin/env node
// Original, deterministic SFX synthesis. No external package required.
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const options = new Map();
for (let i = 2; i < process.argv.length; i += 2) {
  const flag = process.argv[i];
  const value = process.argv[i + 1];
  if (!flag?.startsWith('--') || value === undefined) {
    throw new Error('Argumen harus berbentuk --nama nilai');
  }
  options.set(flag.slice(2), value);
}

const type = options.get('type') ?? 'whoosh';
const output = options.get('out');
const duration = Number(options.get('duration') ?? '0.6');
const seedInput = Number(options.get('seed') ?? '1');
const allowed = new Set(['whoosh', 'pop', 'click', 'impact', 'riser']);

if (!allowed.has(type)) {
  throw new Error(`Tipe tidak dikenal: ${type}. Pilih ${[...allowed].join(', ')}`);
}
if (!output) throw new Error('Gunakan --out path/file.wav');
if (!Number.isFinite(duration) || duration <= 0 || duration > 10) {
  throw new Error('--duration harus > 0 dan <= 10 detik');
}
if (!Number.isSafeInteger(seedInput)) {
  throw new Error('--seed harus bilangan bulat');
}

const sampleRate = 48000;
const sampleCount = Math.round(sampleRate * duration);
const samples = new Float64Array(sampleCount);
let seed = seedInput | 0;
if (seed === 0) seed = 1;
const random = () => {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) / 0x100000000;
};
const chirp = (f0, f1, time) =>
  Math.sin(2 * Math.PI * (f0 * time + ((f1 - f0) * time * time) / (2 * duration)));

let filteredNoise = 0;
for (let i = 0; i < sampleCount; i++) {
  const time = i / sampleRate;
  const progress = i / Math.max(1, sampleCount - 1);
  const noise = random() * 2 - 1;
  let signal = 0;

  if (type === 'whoosh') {
    const cutoff = 250 + 3500 * progress;
    filteredNoise += Math.min(1, (2 * Math.PI * cutoff) / sampleRate) *
      (noise - filteredNoise);
    signal = Math.sin(Math.PI * progress) ** 1.4 * filteredNoise;
  } else if (type === 'pop') {
    signal =
      Math.exp(-time * 19) *
      (0.8 * chirp(650, 110, time) + 0.18 * noise);
  } else if (type === 'click') {
    signal =
      Math.exp(-time * 95) *
      (0.55 * noise + 0.45 * Math.sin(2 * Math.PI * 1800 * time));
  } else if (type === 'impact') {
    signal =
      Math.exp(-time * 9) *
      (0.72 * chirp(155, 54, time) + 0.28 * noise);
  } else {
    const cutoff = 350 + 7000 * progress;
    filteredNoise += Math.min(1, (2 * Math.PI * cutoff) / sampleRate) *
      (noise - filteredNoise);
    signal =
      progress ** 1.6 *
      (0.55 * filteredNoise + 0.45 * chirp(180, 1400, time));
  }

  const fadeIn = Math.min(1, time / 0.004);
  const fadeOut = Math.min(1, (duration - time) / 0.015);
  samples[i] = signal * Math.max(0, Math.min(fadeIn, fadeOut));
}

let peak = 0;
for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
const gain = peak > 0 ? 0.82 / peak : 1;
const wav = Buffer.alloc(44 + sampleCount * 2);
wav.write('RIFF', 0);
wav.writeUInt32LE(wav.length - 8, 4);
wav.write('WAVE', 8);
wav.write('fmt ', 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20); // PCM
wav.writeUInt16LE(1, 22); // mono
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write('data', 36);
wav.writeUInt32LE(sampleCount * 2, 40);
for (let i = 0; i < sampleCount; i++) {
  const value = Math.max(-1, Math.min(1, samples[i] * gain));
  wav.writeInt16LE(Math.round(value * 32767), 44 + i * 2);
}

const destination = path.resolve(output);
await mkdir(path.dirname(destination), {recursive: true});
await writeFile(destination, wav);
console.log(`${type}: ${destination} (${duration}s, ${sampleRate} Hz mono PCM16)`);
