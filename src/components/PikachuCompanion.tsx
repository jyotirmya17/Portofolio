import React, { useEffect, useRef, useState, useCallback } from 'react';

interface PikachuCompanionProps {
  enabled?: boolean;
  onToggle?: () => void;
}

/**
 * High-performance state machine for Pikachu:
 * - IDLE: Standing still, blinking, looking around, or cute tail wag
 * - RUNNING: Smooth physical running with acceleration/deceleration & animated legs/ears
 * - TURNING: Brief pause / pivot frame before changing horizontal direction
 * - SLEEPING: Cute nap with floating "Zzz"
 * - THUNDERBOLT: Periodic electric charge + lightning discharge + shockwaves
 * - HAPPY: Spontaneous or click-activated joyful leap & electric sparks
 */
type PikachuState = 'idle' | 'running' | 'turning' | 'sleeping' | 'thunderbolt' | 'happy';

export const PikachuCompanion: React.FC<PikachuCompanionProps> = ({ enabled = true, onToggle }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spriteSheetRef = useRef<HTMLImageElement | null>(null);

  const [state, setState] = useState<PikachuState>('idle');
  const [speech, setSpeech] = useState<string | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [isDischarging, setIsDischarging] = useState(false);

  // High-frequency physics & animation variables held in refs to avoid React re-render thrashing
  const physics = useRef({
    x: 250,
    y: 350,
    vx: 0,
    vy: 0,
    targetX: 250,
    targetY: 350,
    dir: 0 as 0 | 1 | 2 | 3, // 0 = Down, 1 = Left, 2 = Right, 3 = Up
    idleTimer: 0,
    idleDuration: 180,
    state: 'idle' as PikachuState,
    animFrame: 0,
    frameTick: 0,
    lastThunderbolt: Date.now() - 15000,
    mouse: { x: 250, y: 350, lastMove: Date.now(), hasMoved: false },
  });

  const rafRef = useRef<number | null>(null);
  const actionTimeout = useRef<number | null>(null);

  // Track cursor and touch positions so Pikachu is delightfully responsive across mobile and desktop
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // Handled specifically by touch listeners for mobile precision
      const p = physics.current;
      p.mouse.x = e.clientX;
      p.mouse.y = e.clientY;
      p.mouse.lastMove = Date.now();
      p.mouse.hasMoved = true;
      p.targetX = e.clientX;
      p.targetY = e.clientY;

      if (p.state === 'sleeping') {
        p.state = 'idle';
        setState('idle');
        p.idleTimer = 0;
      }
    };

    // Mobile touch interaction: Tap or touch anywhere to call Pikachu or guide him
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const p = physics.current;
        p.mouse.x = t.clientX;
        p.mouse.y = t.clientY;
        p.mouse.lastMove = Date.now();
        p.mouse.hasMoved = true;

        // On mobile, keep a friendly companion offset so Pikachu never blocks what the user tapped on
        const vpW = window.innerWidth;
        const vpH = window.innerHeight;
        const offsetX = t.clientX < vpW / 2 ? 46 : -46;
        p.targetX = Math.max(30, Math.min(vpW - 30, t.clientX + offsetX));
        p.targetY = Math.max(45, Math.min(vpH - 70, t.clientY + 10));

        if (p.state === 'sleeping') {
          p.state = 'idle';
          setState('idle');
          p.idleTimer = 0;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const p = physics.current;
        p.mouse.x = t.clientX;
        p.mouse.y = t.clientY;
        p.mouse.lastMove = Date.now();
        p.mouse.hasMoved = true;

        const vpW = window.innerWidth;
        const vpH = window.innerHeight;
        const offsetX = t.clientX < vpW / 2 ? 46 : -46;
        p.targetX = Math.max(30, Math.min(vpW - 30, t.clientX + offsetX));
        p.targetY = Math.max(45, Math.min(vpH - 70, t.clientY + 10));

        if (p.state === 'sleeping') {
          p.state = 'idle';
          setState('idle');
          p.idleTimer = 0;
        }
      }
    };

    const handleResize = () => {
      const p = physics.current;
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;
      p.x = Math.max(30, Math.min(vpW - 30, p.x));
      p.y = Math.max(45, Math.min(vpH - 70, p.y));
      p.targetX = Math.max(30, Math.min(vpW - 30, p.targetX));
      p.targetY = Math.max(45, Math.min(vpH - 70, p.targetY));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Thunderbolt execution sequence
  const executeThunderbolt = useCallback(() => {
    const p = physics.current;
    p.state = 'thunderbolt';
    p.vx = 0;
    p.vy = 0;
    setState('thunderbolt');
    setIsCharging(true);
    setIsDischarging(false);
    setSpeech('Pika...');

    // Phase 1: Electrical build-up (750ms)
    setTimeout(() => {
      setIsCharging(false);
      setIsDischarging(true);
      setSpeech('THUNDERBOLT! ⚡');

      // Phase 2: Electric discharge (900ms)
      setTimeout(() => {
        setIsDischarging(false);
        setSpeech(null);

        // Phase 3: Happy victory pose then resume running
        p.state = 'happy';
        setState('happy');

        setTimeout(() => {
          p.state = 'idle';
          setState('idle');
          p.idleTimer = 0;
          p.idleDuration = 90;
        }, 1200);
      }, 950);
    }, 800);
  }, []);

  // Click on Pikachu triggers joyful leap / interaction
  const handlePikachuClick = useCallback(() => {
    const p = physics.current;
    if (p.state === 'thunderbolt') return;

    if (actionTimeout.current) clearTimeout(actionTimeout.current);
    p.state = 'happy';
    p.vx = 0;
    p.vy = -3.5; // little hop
    setState('happy');
    setSpeech('Pika-pi! ⚡');

    actionTimeout.current = window.setTimeout(() => {
      setSpeech(null);
      p.state = 'idle';
      setState('idle');
      p.idleTimer = 0;
    }, 1800);
  }, []);

  // Load the sprite sheet
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/pikachu_spritesheet.png';
    img.onload = () => {
      spriteSheetRef.current = img;
    };
  }, []);

  // Main high-performance Animation Loop
  useEffect(() => {
    if (!enabled) return;

    const p = physics.current;
    if (!p.mouse.hasMoved) {
      // Default to responsive position near bottom-right if cursor hasn't moved yet
      p.x = Math.max(80, window.innerWidth - 120);
      p.y = Math.max(80, window.innerHeight - 120);
      p.targetX = p.x;
      p.targetY = p.y;
    }

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min(33, currentTime - lastTime); // clamp dt to max 33ms to avoid delta spikes
      lastTime = currentTime;

      const p = physics.current;
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;

      // 2D distance to mouse cursor target
      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;
      const dist = Math.hypot(dx, dy);

      // STATE MACHINE UPDATE
      if (p.state === 'thunderbolt') {
        // stationary during electric discharge
        p.vx = 0;
        p.vy = 0;
      } else if (p.state === 'happy') {
        // Small joyful hop
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.vx *= 0.85;
        p.x += p.vx;
      } else if (p.state === 'sleeping') {
        p.vx = 0;
        p.vy = 0;
        p.idleTimer += 1;
        // Wakes up if cursor moves away
        if (dist > 65) {
          p.state = 'running';
          setState('running');
          p.idleTimer = 0;
        }
      } else if (p.state === 'idle') {
        // Friction deceleration
        p.vx *= 0.65;
        p.vy *= 0.65;
        p.x += p.vx;
        p.y += p.vy;
        p.idleTimer += 1;

        // Face towards cursor while idling
        if (dist > 15) {
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);
          if (absDx >= absDy) {
            p.dir = dx >= 0 ? 2 : 1; // Right or Left
          } else {
            p.dir = dy >= 0 ? 0 : 3; // Down or Up
          }
        }

        // If mouse moves away beyond follow perimeter, pursue diagonally!
        if (dist > 45) {
          p.state = 'running';
          setState('running');
          p.idleTimer = 0;
        } else {
          const now = Date.now();
          const timeSinceMove = now - p.mouse.lastMove;
          const isMobile = vpW < 768;

          // Autonomous gentle roaming: On mobile (or when cursor has stopped moving for 3.5s),
          // Pikachu periodically takes playful strolls around the safe bottom area
          if ((isMobile || timeSinceMove > 3500) && p.idleTimer > (isMobile ? 160 : 260)) {
            p.idleTimer = 0;
            const roamX = 35 + Math.random() * (vpW - 70);
            const roamY = isMobile
              ? vpH - (65 + Math.random() * 80)
              : Math.max(90, Math.min(vpH - 80, p.y + (Math.random() * 160 - 80)));
            p.targetX = roamX;
            p.targetY = roamY;
            p.state = 'running';
            setState('running');
          } else if (timeSinceMove > 25000 && p.idleTimer > 500) {
            // Take a cozy nap if completely undisturbed for 25s
            p.state = 'sleeping';
            setState('sleeping');
            p.idleTimer = 0;
          }
        }
      } else if (p.state === 'running') {
        // When Pikachu reaches comfortable follow distance beside target
        if (dist < 36) {
          p.state = 'idle';
          setState('idle');
          p.idleTimer = 0;
        } else {
          // 360-degree unit vector for fluid diagonal travel in all directions
          const dirX = dx / dist;
          const dirY = dy / dist;

          // Adaptive speed: sprint when far, run when medium, walk when close
          let maxSpeed = prefersReducedMotion ? 2.0 : 4.8;
          let accel = 0.24;

          if (!prefersReducedMotion) {
            if (dist > 360) {
              maxSpeed = 8.5; // sprint to catch up
              accel = 0.30;
            } else if (dist > 160) {
              maxSpeed = 6.2; // brisk run
              accel = 0.26;
            } else if (dist < 70) {
              maxSpeed = Math.max(2.0, (dist / 70) * 4.2); // smooth deceleration
              accel = 0.25;
            }
          }

          const targetVx = dirX * maxSpeed;
          const targetVy = dirY * maxSpeed;

          p.vx += (targetVx - p.vx) * accel;
          p.vy += (targetVy - p.vy) * accel;

          // Move diagonally along both x and y axes
          p.x += p.vx;
          p.y += p.vy;

          // Determine 4-way facing row based on movement vector with hysteresis
          const absVx = Math.abs(p.vx);
          const absVy = Math.abs(p.vy);
          if (absVx > absVy * 1.15) {
            p.dir = p.vx > 0 ? 2 : 1; // 2 = Right, 1 = Left
          } else if (absVy > absVx * 1.15) {
            p.dir = p.vy > 0 ? 0 : 3; // 0 = Down, 3 = Up
          } else if (p.dir === undefined || p.dir === null) {
            p.dir = absVx >= absVy ? (p.vx >= 0 ? 2 : 1) : (p.vy >= 0 ? 0 : 3);
          }
        }
      }

      // Responsive scale factor for mobile screens
      const scale = vpW < 600 ? 0.8 : 1;
      const marginH = 32 * scale;
      const marginBot = vpW < 768 ? 65 : 40;

      // Safe viewport boundary
      p.x = Math.max(marginH, Math.min(vpW - marginH, p.x));
      p.y = Math.max(48 * scale, Math.min(vpH - marginBot, p.y));

      // SPRITE CANVAS RENDERING (Zero React overhead)
      const canvas = canvasRef.current;
      const sheet = spriteSheetRef.current;
      if (canvas && sheet && sheet.complete) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          p.frameTick += 1;

          let col = 0;
          let row = p.dir ?? 0;

          // Row 0 = Down, Row 1 = Left, Row 2 = Right, Row 3 = Up
          // In the sprite sheet:
          // cols 0..2 = Walk (frame 0, 1, 2)
          // cols 3..5 = Run (frame 0, 1, 2)
          // cols 6..8 = Sprint / Fast run
          if (p.state === 'running') {
            row = p.dir;
            const currentSpeed = Math.hypot(p.vx, p.vy);
            if (currentSpeed > 6.0) {
              // Sprint cycle (cols 6..8)
              const step = Math.floor(p.frameTick / 4) % 4;
              const cycle = [6, 7, 6, 8];
              col = cycle[step];
            } else if (currentSpeed > 3.0) {
              // Run cycle (cols 3..5)
              const step = Math.floor(p.frameTick / 5) % 4;
              const cycle = [3, 4, 3, 5];
              col = cycle[step];
            } else {
              // Walk cycle (cols 0..2)
              const step = Math.floor(p.frameTick / 7) % 4;
              const cycle = [0, 1, 0, 2];
              col = cycle[step];
            }
          } else if (p.state === 'sleeping') {
            // Sleeping pose
            row = 0;
            col = 1;
          } else if (p.state === 'happy') {
            // Joyful pose: alternating rapid happy frames
            row = 0;
            col = (Math.floor(p.frameTick / 6) % 2 === 0) ? 0 : 2;
          } else if (p.state === 'thunderbolt') {
            // Charged stance
            row = 0;
            col = 1;
          } else {
            // IDLE: standing neutral pose facing cursor direction (with subtle wag)
            row = p.dir;
            const idleStep = Math.floor(p.frameTick / 30) % 8;
            col = idleStep === 0 ? 0 : 1;
          }

          // Sprite slice dimensions: 32x32 per frame
          const sw = 32;
          const sh = 32;
          const sx = col * sw;
          const sy = row * sh;

          // Render crisp pixel art at 2x zoom (64x64px)
          const dw = 64;
          const dh = 64;
          ctx.drawImage(sheet, sx, sy, sw, sh, 0, 0, dw, dh);
        }
      }

      // Update DOM transform directly with responsive scale
      if (containerRef.current) {
        const renderScale = vpW < 600 ? 0.8 : 1;
        containerRef.current.style.transform = `translate3d(${Math.round(p.x - 32 * renderScale)}px, ${Math.round(p.y - 48 * renderScale)}px, 0) scale(${renderScale})`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (actionTimeout.current) clearTimeout(actionTimeout.current);
    };
  }, [enabled, executeThunderbolt]);

  return (
    <>
      {/* Autonomous Animated Pikachu Character */}
      {enabled && (
        <div
          ref={containerRef}
          onClick={handlePikachuClick}
          onTouchEnd={(e) => {
            // Instant mobile tap response without blocking scroll
            e.stopPropagation();
            handlePikachuClick();
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '64px',
            height: '64px',
            zIndex: 9998,
            cursor: 'pointer',
            pointerEvents: 'auto',
            touchAction: 'manipulation',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            willChange: 'transform',
            transformOrigin: 'bottom center',
            filter: isDischarging
              ? 'drop-shadow(0 0 16px #FFE600) drop-shadow(0 4px 8px rgba(0,0,0,0.6))'
              : 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.55))',
            transition: 'filter 0.15s ease',
          }}
          title="Pikachu companion — Tap or click to interact!"
          id="pikachu-character-root"
        >
          {/* Natural Shadow on the floor */}
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '12px',
              width: '40px',
              height: '10px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.38)',
              filter: 'blur(3px)',
              pointerEvents: 'none',
              transform: state === 'happy' ? 'scale(0.7) translateY(4px)' : 'none',
              transition: 'transform 0.15s ease',
            }}
          />

          {/* Speech / Reaction Bubble */}
          {speech && (
            <div
              style={{
                position: 'absolute',
                top: '-34px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: isDischarging ? '#FFE600' : '#ffffff',
                color: '#1a102a',
                padding: '3px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 3px 12px rgba(0,0,0,0.45)',
                border: isDischarging ? '2px solid #FF9500' : '1px solid rgba(0,0,0,0.12)',
                animation: isDischarging ? 'pulse 0.2s infinite alternate' : undefined,
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              {speech}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: `5px solid ${isDischarging ? '#FFE600' : '#ffffff'}`,
                }}
              />
            </div>
          )}

          {/* Sleeping "Zzz" Bubble */}
          {state === 'sleeping' && !speech && (
            <div
              style={{
                position: 'absolute',
                top: '-24px',
                right: '-2px',
                fontSize: '13px',
                fontWeight: 800,
                color: 'var(--lav)',
                animation: 'drift 2.2s infinite ease-in-out',
                pointerEvents: 'none',
                fontFamily: 'var(--f-pixel, sans-serif)',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)',
              }}
            >
              Zzz...
            </div>
          )}

          {/* Thunderbolt Electric Lightning Particles & Shockwave */}
          {isDischarging && (
            <svg
              style={{
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                width: '164px',
                height: '164px',
                pointerEvents: 'none',
                zIndex: 15,
              }}
              viewBox="0 0 160 160"
            >
              {/* Expanding Shockwaves */}
              <circle cx="80" cy="80" r="45" fill="none" stroke="#FFE600" strokeWidth="2.5" opacity="0.85">
                <animate attributeName="r" values="18; 70" dur="0.35s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1; 0" dur="0.35s" repeatCount="indefinite" />
              </circle>

              {/* Jagged Electric Arcs */}
              <path d="M80 80 L96 48 L118 52 L138 22" stroke="#FFF04D" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M80 80 L62 48 L42 54 L20 22" stroke="#54E5FF" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M80 80 L112 92 L128 118 L152 122" stroke="#FFF04D" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M80 80 L48 92 L32 118 L8 122" stroke="#54E5FF" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M80 80 L84 112 L76 132 L88 158" stroke="#FFE600" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </svg>
          )}

          {/* High-DPI Pixel-Art Canvas */}
          <canvas
            ref={canvasRef}
            width={64}
            height={64}
            style={{
              display: 'block',
              width: '64px',
              height: '64px',
              imageRendering: 'pixelated',
              transform: state === 'happy' ? 'translateY(-6px)' : isCharging ? 'scale(0.96) translateY(2px)' : 'none',
              transition: 'transform 0.12s ease',
            }}
          />
        </div>
      )}
    </>
  );
};
