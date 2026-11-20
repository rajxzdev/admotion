import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';

export type CaptionWord = {
  text: string;
  startSec: number;
  endSec: number;
};

type CaptionTrackProps = {
  words: CaptionWord[];
  wordsPerGroup?: number;
};

/**
 * Gunakan hanya untuk timestamp yang disejajarkan dengan file voice FINAL.
 * Jika voice diubah, ulangi alignment dan perbarui data ini.
 */
export const CaptionTrack: React.FC<CaptionTrackProps> = ({
  words,
  wordsPerGroup = 5,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const time = frame / fps;
  const groupSize = Math.max(1, Math.floor(wordsPerGroup));
  const groupCount = Math.ceil(words.length / groupSize);

  let firstIndex = -1;
  for (let group = 0; group < groupCount; group++) {
    const startIndex = group * groupSize;
    const endIndex = Math.min(startIndex + groupSize, words.length) - 1;
    if (time >= words[startIndex].startSec && time < words[endIndex].endSec) {
      firstIndex = startIndex;
      break;
    }
  }

  if (firstIndex < 0) return null;
  const visible = words.slice(firstIndex, firstIndex + groupSize);

  return (
    <div
      data-safe-element="caption-track"
      style={{
        position: 'absolute',
        left: width * 0.08,
        width: width * 0.84,
        bottom: height * 0.1,
        boxSizing: 'border-box',
        padding: `${Math.round(height * 0.018)}px ${Math.round(width * 0.025)}px`,
        borderRadius: 20,
        background: 'rgba(5, 10, 24, 0.86)',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontSize: Math.min(68, width * 0.043),
        fontWeight: 800,
        lineHeight: 1.18,
        textAlign: 'center',
        overflowWrap: 'anywhere',
      }}
    >
      {visible.map((word, offset) => {
        const active = time >= word.startSec && time < word.endSec;
        return (
          <React.Fragment key={`${firstIndex + offset}-${word.startSec}`}>
            {offset > 0 ? ' ' : null}
            <span style={{color: active ? '#7af2ff' : '#ffffff'}}>{word.text}</span>
          </React.Fragment>
        );
      })}
    </div>
  );
};
