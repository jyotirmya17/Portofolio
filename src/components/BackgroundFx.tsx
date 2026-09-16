import React, { useEffect, useRef } from 'react';

export const BackgroundFx: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const STEP = 22;
    const SIZE = 4;
    const COLORS = ['63,162,255', '139,143,255', '69,211,156', '255,212,71'];
    const SHAPES = [
      [[0, 0], [1, 0], [2, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 1], [2, 1]],
      [[0, 0], [1, 0], [0, 1], [1, 1]],
      [[0, 0], [1, 0], [2, 0], [3, 0]],
      [[0, 0], [1, 0], [1, 1], [2, 1]],
      [[0, 0], [0, 1], [0, 2], [1, 2]],
    ];

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let dotsCanvas: HTMLCanvasElement | null = null;
    let raf = 0;
    let last = 0;
    let nextFall = 0;

    interface Blink {
      x: number;
      y: number;
      rgb: string;
      peak: number;
      t0: number;
      dur: number;
    }

    interface Fall {
      x: number;
      y: number;
      shape: number[][];
      rgb: string;
      peak: number;
      t0: number;
      step: number;
      steps: number;
    }

    let blinks: Blink[] = [];
    let falls: Fall[] = [];

    function rnd(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function pick<T>(a: T[]): T {
      return a[(Math.random() * a.length) | 0];
    }

    function tint() {
      return Math.random() < 0.18
        ? { rgb: pick(COLORS), peak: rnd(0.45, 0.7) }
        : { rgb: '255,255,255', peak: rnd(0.18, 0.38) };
    }

    function cell(x: number, y: number, rgb: string, a: number) {
      if (!ctx || a <= 0) return;
      ctx.fillStyle = `rgba(${rgb},${a.toFixed(3)})`;
      ctx.fillRect(x * STEP + 9, y * STEP + 9, SIZE, SIZE);
    }

    function base() {
      if (!ctx || !dotsCanvas) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(dotsCanvas, 0, 0, W, H);
    }

    function drawStill() {
      base();
      const n = Math.round((cols * rows) / 90);
      for (let i = 0; i < n; i++) {
        const c = tint();
        cell((Math.random() * cols) | 0, (Math.random() * rows) | 0, c.rgb, c.peak * 0.8);
      }
    }

    function resize() {
      if (!cv) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cols = Math.ceil(W / STEP) + 1;
      rows = Math.ceil(H / STEP) + 1;

      dotsCanvas = document.createElement('canvas');
      dotsCanvas.width = cv.width;
      dotsCanvas.height = cv.height;
      const d = dotsCanvas.getContext('2d');
      if (d) {
        d.scale(dpr, dpr);
        d.fillStyle = 'rgba(255,255,255,.075)';
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            d.beginPath();
            d.arc(x * STEP + 11, y * STEP + 11, 1.15, 0, 6.2832);
            d.fill();
          }
        }
      }

      blinks = blinks.filter((b) => b.x < cols && b.y < rows);
      if (reduce) drawStill();
    }

    function frame(t: number) {
      raf = requestAnimationFrame(frame);
      if (t - last < 33) return;
      last = t;
      base();

      const target = Math.round((cols * rows) / 65);
      for (let s = 0; s < 3 && blinks.length < target; s++) {
        const c = tint();
        blinks.push({
          x: (Math.random() * cols) | 0,
          y: (Math.random() * rows) | 0,
          rgb: c.rgb,
          peak: c.peak,
          t0: t,
          dur: rnd(900, 2800),
        });
      }

      blinks = blinks.filter((b) => {
        const p = (t - b.t0) / b.dur;
        if (p >= 1) return false;
        cell(b.x, b.y, b.rgb, b.peak * Math.sin(Math.PI * p));
        return true;
      });

      if (t > nextFall && falls.length < 4) {
        const c2 = Math.random() < 0.45 ? { rgb: pick(COLORS), peak: 0.6 } : { rgb: '255,255,255', peak: 0.42 };
        falls.push({
          x: (Math.random() * (cols - 4)) | 0,
          y: (Math.random() * rows * 0.6) | 0,
          shape: pick(SHAPES),
          rgb: c2.rgb,
          peak: c2.peak,
          t0: t,
          step: rnd(200, 320),
          steps: 5 + ((Math.random() * 5) | 0),
        });
        nextFall = t + rnd(1400, 3200);
      }

      falls = falls.filter((f) => {
        const e = (t - f.t0) / f.step;
        const k = Math.floor(e);
        if (k >= f.steps) return false;
        const a = f.peak * Math.min(1, e) * Math.min(1, (f.steps - e) / 2);
        f.shape.forEach((p) => {
          cell(f.x + p[0], f.y + p[1] + k, f.rgb, a);
          cell(f.x + p[0], f.y + p[1] + k - 1, f.rgb, a * 0.28);
        });
        return true;
      });
    }

    resize();
    window.addEventListener('resize', resize);

    if (!reduce) {
      raf = requestAnimationFrame(frame);
      const onVis = () => {
        if (document.hidden) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else if (!raf) {
          last = 0;
          raf = requestAnimationFrame(frame);
        }
      };
      document.addEventListener('visibilitychange', onVis);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVis);
      };
    }

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="bgfx" ref={canvasRef} aria-hidden="true" />;
};
