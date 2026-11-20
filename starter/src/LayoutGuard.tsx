import React, {useLayoutEffect, useMemo, useRef} from 'react';
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  useCurrentFrame,
} from 'remotion';

type LayoutGuardProps = {
  children: React.ReactNode;
  /**
   * Margin untuk semua elemen bertanda, sebagai proporsi ukuran frame.
   * 0.04 = empat persen dari setiap tepi.
   */
  safeMarginRatio?: number;
};

/**
 * Membatalkan render bila elemen DOM melewati area aman.
 * data-safe-element memberi nama yang jelas pada pesan error.
 * data-frame-background/data-frame-viewport mengizinkan elemen tepat memenuhi frame.
 * Isi di dalam Canvas, SVG, dan WebGL masih perlu pemeriksaan matematis/visual.
 */
export const LayoutGuard: React.FC<LayoutGuardProps> = ({
  children,
  safeMarginRatio = 0.04,
}) => {
  const frame = useCurrentFrame();
  const rootRef = useRef<HTMLDivElement>(null);
  const handle = useMemo(() => delayRender(`layout check frame ${frame}`), [frame]);

  useLayoutEffect(() => {
    let cancelled = false;
    let settled = false;

    const pass = () => {
      if (!settled) {
        settled = true;
        continueRender(handle);
      }
    };

    const fail = (error: unknown) => {
      if (!settled) {
        settled = true;
        cancelRender(error instanceof Error ? error : new Error(String(error)));
      }
    };

    const check = async () => {
      await document.fonts.ready;
      if (cancelled) return;

      const root = rootRef.current;
      if (!root) throw new Error(`Frame ${frame}: root LayoutGuard tidak ada`);

      const frameRect = root.getBoundingClientRect();
      const elements = root.querySelectorAll<HTMLElement | SVGElement>(
        '*',
      );

      for (const element of elements) {
        if (element.getClientRects().length === 0) continue;
        const rect = element.getBoundingClientRect();
        const fullFrame =
          element.hasAttribute('data-frame-background') ||
          element.hasAttribute('data-frame-viewport');
        const margin = fullFrame ? 0 : safeMarginRatio;
        const leftLimit = frameRect.left + frameRect.width * margin;
        const rightLimit = frameRect.right - frameRect.width * margin;
        const topLimit = frameRect.top + frameRect.height * margin;
        const bottomLimit = frameRect.bottom - frameRect.height * margin;
        const offside =
          rect.left < leftLimit ||
          rect.right > rightLimit ||
          rect.top < topLimit ||
          rect.bottom > bottomLimit;

        if (offside) {
          const label = element.getAttribute('data-safe-element') || element.tagName;
          throw new Error(
            `Frame ${frame}: elemen "${label}" offside. ` +
              `bbox=(${rect.left.toFixed(1)},${rect.top.toFixed(1)})–` +
              `(${rect.right.toFixed(1)},${rect.bottom.toFixed(1)}), ` +
              `area aman=(${leftLimit.toFixed(1)},${topLimit.toFixed(1)})–` +
              `(${rightLimit.toFixed(1)},${bottomLimit.toFixed(1)}).`,
          );
        }
      }

      pass();
    };

    void check().catch((error) => {
      if (!cancelled) fail(error);
    });

    return () => {
      cancelled = true;
      pass();
    };
  }, [frame, handle, safeMarginRatio]);

  return (
    <AbsoluteFill ref={rootRef} style={{overflow: 'hidden', isolation: 'isolate'}}>
      {children}
    </AbsoluteFill>
  );
};
