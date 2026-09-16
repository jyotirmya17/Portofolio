import React, { useEffect, useRef } from 'react';
import { TOOLKIT_CATEGORIES } from '../data';

interface ToolkitProps {
  onShowToast: (msg: string) => void;
}

export const Toolkit: React.FC<ToolkitProps> = ({ onShowToast }) => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    let zIndex = 10;
    const stickers = board.querySelectorAll<HTMLElement>('.sticker');
    const cleanups: (() => void)[] = [];

    stickers.forEach((el) => {
      let ox = 0;
      let oy = 0;
      let sx = 0;
      let sy = 0;
      let base = { l: 0, t: 0, r: 0, b: 0 };
      let bRect: DOMRect;
      let isOn = false;

      const handlePointerDown = (e: PointerEvent) => {
        isOn = true;
        el.setPointerCapture(e.pointerId);
        el.classList.remove('tidy');
        el.classList.add('drag');
        el.style.zIndex = String(++zIndex);

        ox = parseFloat(el.style.getPropertyValue('--dx')) || 0;
        oy = parseFloat(el.style.getPropertyValue('--dy')) || 0;
        sx = e.clientX - ox;
        sy = e.clientY - oy;

        const r = el.getBoundingClientRect();
        bRect = board.getBoundingClientRect();
        base = {
          l: r.left - ox,
          t: r.top - oy,
          r: r.right - ox,
          b: r.bottom - oy,
        };
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!isOn) return;
        let nx = e.clientX - sx;
        let ny = e.clientY - sy;
        const pad = 8;
        nx = Math.max(bRect.left - base.l + pad, Math.min(bRect.right - base.r - pad, nx));
        ny = Math.max(bRect.top - base.t + pad, Math.min(bRect.bottom - base.b - pad, ny));

        el.style.setProperty('--dx', `${nx}px`);
        el.style.setProperty('--dy', `${ny}px`);
      };

      const handlePointerEnd = () => {
        if (!isOn) return;
        isOn = false;
        el.classList.remove('drag');
      };

      el.addEventListener('pointerdown', handlePointerDown);
      el.addEventListener('pointermove', handlePointerMove);
      el.addEventListener('pointerup', handlePointerEnd);
      el.addEventListener('pointercancel', handlePointerEnd);

      cleanups.push(() => {
        el.removeEventListener('pointerdown', handlePointerDown);
        el.removeEventListener('pointermove', handlePointerMove);
        el.removeEventListener('pointerup', handlePointerEnd);
        el.removeEventListener('pointercancel', handlePointerEnd);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const isTidyingRef = useRef(false);

  const handleTidy = () => {
    if (isTidyingRef.current) return;
    const board = boardRef.current;
    if (!board) return;
    const stickers = board.querySelectorAll<HTMLElement>('.sticker');

    isTidyingRef.current = true;

    // 1. Smoothly wiggle all skills in their current position for 1.5 seconds (iPhone style)
    stickers.forEach((el) => {
      el.classList.remove('tidy');
      el.classList.add('vibrate');
    });

    // 2. After exactly 1.5 seconds, stop wiggle and smoothly return to original place over 1 second
    setTimeout(() => {
      stickers.forEach((el) => {
        el.classList.remove('vibrate');
        el.classList.add('tidy');
        // Force style recalculation so browser commits starting transform with .tidy transition active
        void el.offsetWidth;
      });

      requestAnimationFrame(() => {
        stickers.forEach((el) => {
          el.style.setProperty('--dx', '0px');
          el.style.setProperty('--dy', '0px');
        });
      });

      // 3. Clean up tidy class and show toast after the 1-second transition finishes
      setTimeout(() => {
        stickers.forEach((el) => {
          el.classList.remove('tidy');
        });
        onShowToast('All tidy');
        isTidyingRef.current = false;
      }, 1000);
    }, 1500);
  };

  return (
    <section className="sec" id="toolkit" style={{ paddingTop: '40px' }}>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="toolkit-heading">
            My toolkit
          </h2>
          <p className="note">
            <svg
              viewBox="0 0 50 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M46 28C34 30 18 26 8 10" />
              <path d="M4 18l3-10 10 2" />
            </svg>
            go on, move things around
          </p>
        </div>

        <p
          style={{
            maxWidth: '56ch',
            margin: '-30px 0 36px',
            fontSize: '18px',
            color: 'var(--fg-soft)',
            lineHeight: '1.6',
          }}
        >
          Tools I use to turn ideas into things that actually run.
        </p>

        <div className="tk-board dots" id="board" ref={boardRef}>
          {TOOLKIT_CATEGORIES.map((cat, cIdx) => (
            <div key={cIdx} className="tk-row">
              <span className="tk-label">{cat.title}</span>
              {cat.items.map((item, iIdx) => (
                <span key={iIdx} className={`sticker ${cat.keyClass}`}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="tk-foot">
          <p>Made a mess? That's the fun part.</p>
          <button
            className="btn btn-ghost"
            type="button"
            id="tidy"
            onClick={handleTidy}
            style={{ height: '42px', fontSize: '15px' }}
          >
            Tidy up
          </button>
        </div>
      </div>
    </section>
  );
};
