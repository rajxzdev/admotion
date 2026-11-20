import React from 'react';
import {fitText} from '@remotion/layout-utils';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {LayoutGuard} from './LayoutGuard';

const hash01 = (seed: number): number => {
  const value = Math.sin(seed * 127.1 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const clamp = (value: number, low: number, high: number): number =>
  Math.max(low, Math.min(high, value));

export const Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const title = 'REMOTION';
  const titleFontSize = Math.min(
    114,
    fitText({
      text: title,
      withinWidth: width * 0.78 - 96,
      fontFamily: 'Arial',
      fontWeight: '900',
    }).fontSize,
  );
  const enter = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exit = interpolate(frame, [125, 149], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <LayoutGuard safeMarginRatio={0.04}>
      <AbsoluteFill
        data-frame-background="true"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, #17275d 0%, #090d22 55%, #050713 100%)',
        }}
      />

      {Array.from({length: 70}, (_, index) => {
        const size = 3 + hash01(index + 2) * 5;
        const x = clamp(
          width * (0.08 + hash01(index * 3 + 11) * 0.84) +
            Math.sin(frame / 23 + index) * 11,
          width * 0.06,
          width * 0.94 - size,
        );
        const y = clamp(
          height * (0.08 + hash01(index * 5 + 23) * 0.84) +
            Math.cos(frame / 27 + index) * 11,
          height * 0.06,
          height * 0.94 - size,
        );
        return (
          <div
            key={index}
            data-safe-element={`particle-${index}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              background: index % 3 === 0 ? '#82fbff' : '#d7a7ff',
              opacity: (0.25 + 0.55 * hash01(index + 5)) * enter * exit,
            }}
          />
        );
      })}

      <div
        data-safe-element="hero-title-and-glow"
        style={{
          position: 'absolute',
          left: '11%',
          right: '11%',
          top: '29%',
          boxSizing: 'border-box',
          padding: 48,
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          transform: `scale(${0.86 + enter * 0.14})`,
          opacity: enter * exit,
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: titleFontSize,
            lineHeight: 1.05,
            letterSpacing: -3,
            textShadow:
              '0 0 12px #73e8ff, 0 0 28px #2eaeff, 0 0 42px #a650ff',
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: Math.min(38, width * 0.026),
            letterSpacing: 5,
            fontWeight: 700,
            color: '#aeefff',
          }}
        >
          VIDEO DIRECTOR
        </div>
      </div>

      <div
        data-safe-element="supporting-message"
        style={{
          position: 'absolute',
          left: '20%',
          right: '20%',
          bottom: '16%',
          color: '#e8e9ff',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontSize: Math.min(31, width * 0.022),
          fontWeight: 500,
          opacity: enter * exit,
        }}
      >
        Gerak deterministik · komposisi aman · siap dikembangkan
      </div>
    </LayoutGuard>
  );
};
