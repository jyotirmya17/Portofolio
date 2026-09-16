import React, { useEffect, useRef } from 'react';

export const VisitorCursor: React.FC = () => {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const you = cursorRef.current;
    if (!you) return;

    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      you.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      you.classList.add('on');
    };

    const onMouseLeave = () => {
      you.classList.remove('on');
    };

    const onBlur = () => {
      you.classList.remove('on');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return (
    <span className="cursor you" ref={cursorRef} aria-hidden="true">
      <span className="cur-in">
        <svg viewBox="0 0 22 24">
          <path
            d="M2 1.5v19l5.2-4.6 3.6 7.6 3.3-1.5-3.6-7.5h7z"
            fill="#6c3fc1"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <span className="lbl">you</span>
      </span>
    </span>
  );
};
