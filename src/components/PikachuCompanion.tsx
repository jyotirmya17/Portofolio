import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Zap } from 'lucide-react';

interface PikachuCompanionProps {
  enabled: boolean;
  onToggle: () => void;
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

export const PikachuCompanion: React.FC<PikachuCompanionProps> = ({ enabled, onToggle }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spriteSheetRef = useRef<HTMLImageElement | null>(null);

  const [state, setState] = useState<PikachuState>('idle');
  const [speech, setSpeech] = useState<string | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [isDischarging, setIsDischarging] = useState(false);

  // High-frequency physics & animation variables held in refs to avoid React re-render thrashing
  const physics = useRef({
    x: 200,
    y: 0, // calculated relative to viewport bottom
    vx: 0,
    vy: 0,
    targetX: 300,
    targetY: 0,
    facing: 1 as 1 | -1, // 1 = right, -1 = left
    desiredFacing: 1 as 1 | -1,
    turnTimer: 0,
    idleTimer: 0,
    idleDuration: 180, // ~3 seconds at 60fps
    state: 'idle' as PikachuState,
    animFrame: 0,
    frameTick: 0,
    lastThunderbolt: Date.now() - 15000,
    mouse: { x: -1000, y: -1000, lastMove: 0 },
  });

  const rafRef = useRef<number | null>(null);
  const actionTimeout = useRef<number | null>(null);

  // Pick a fresh horizontal destination along the lower viewport strip
  const pickNewTarget = useCallback(() => {
    const p = physics.current;
    const vpW = window.innerWidth;
    const padding = 70;
    const minX = padding;
    const maxX = Math.max(minX + 120, vpW - padding);

    // Pick target with minimum distance to make the run meaningful
    let newTargetX = minX + Math.random() * (maxX - minX);
    if (Math.abs(newTargetX - p.x) < 140) {
      newTargetX = p.x > vpW / 2 ? p.x - 220 : p.x + 220;
    }
    p.targetX = Math.max(minX, Math.min(maxX, newTargetX));

    // Desired horizontal facing
    p.desiredFacing = p.targetX > p.x ? 1 : -1;

    // Small vertical variation (+/- 24px from base floor)
    const baseFloor = window.innerHeight - 56;
    p.targetY = Math.max(window.innerHeight - 110, Math.min(window.innerHeight - 38, baseFloor + (Math.random() * 32 - 16)));
  }, []);

  // Track cursor position non-intrusively for curious glances & interaction
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      physics.current.mouse = {
        x: e.clientX,
        y: e.clientY,
        lastMove: Date.now(),
      };
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
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
      pickNewTarget();
    }, 1800);
  }, [pickNewTarget]);

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

    // Initialize position near bottom-left of viewport
    const p = physics.current;
    p.x = Math.max(100, Math.min(window.innerWidth - 100, p.x || 200));
    p.y = window.innerHeight - 56;
    p.targetX = p.x + 200;
    p.targetY = p.y;
    pickNewTarget();

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min(33, currentTime - lastTime); // clamp dt to max 33ms to avoid delta spikes
      lastTime = currentTime;

      const p = physics.current;
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;

      // Floor constraints
      const floorY = vpH - 56;
      if (p.y > floorY + 20 || p.y < floorY - 60) {
        p.y = floorY;
        p.targetY = floorY;
      }

      // STATE MACHINE UPDATE
      if (p.state === 'thunderbolt') {
        // stationary during electric discharge
        p.vx = 0;
      } else if (p.state === 'happy') {
        // Small hop physics
        p.y += p.vy;
        p.vy += 0.25; // gravity
        if (p.y > floorY) {
          p.y = floorY;
          p.vy = 0;
        }
      } else if (p.state === 'sleeping') {
        p.vx = 0;
        p.idleTimer += 1;
        if (p.idleTimer > 280) { // ~4.5s
          p.state = 'idle';
          setState('idle');
          p.idleTimer = 0;
          p.idleDuration = 60;
          pickNewTarget();
        }
      } else if (p.state === 'turning') {
        p.turnTimer -= 1;
        p.vx *= 0.6; // decelerate rapidly to halt
        p.x += p.vx;
        if (p.turnTimer <= 0) {
          p.facing = p.desiredFacing;
          p.state = 'running';
          setState('running');
        }
      } else if (p.state === 'idle') {
        p.vx *= 0.7; // friction decelerate
        p.x += p.vx;
        p.idleTimer += 1;

        // Check if mouse is hovering nearby; if so, face the mouse curiously!
        const now = Date.now();
        if (now - p.mouse.lastMove < 2000) {
          const dxMouse = p.mouse.x - p.x;
          if (Math.abs(dxMouse) > 30 && Math.abs(dxMouse) < 300) {
            const mouseFacing = dxMouse > 0 ? 1 : -1;
            if (p.facing !== mouseFacing && p.idleTimer % 30 === 0) {
              p.facing = mouseFacing;
            }
          }
        }

        if (p.idleTimer >= p.idleDuration) {
          p.idleTimer = 0;
          pickNewTarget();

          // Check if direction change requires a turning state
          if (p.desiredFacing !== p.facing) {
            p.state = 'turning';
            p.turnTimer = 8; // brief 8-frame pivot
            setState('turning');
          } else {
            p.state = 'running';
            setState('running');
          }
        }
      } else if (p.state === 'running') {
        // Distance to target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.abs(dx);

        // Check if Pikachu needs to flip direction
        const neededFacing = dx > 0 ? 1 : -1;
        if (neededFacing !== p.facing && dist > 40) {
          p.desiredFacing = neededFacing;
          p.state = 'turning';
          p.turnTimer = 8;
          setState('turning');
        } else if (dist < 14) {
          // Reached target! Choose next spontaneous behavior
          p.state = 'idle';
          setState('idle');
          p.vx = 0;
          p.idleTimer = 0;

          const now = Date.now();
          const canThunderbolt = now - p.lastThunderbolt > 35000;
          const roll = Math.random();

          if (canThunderbolt && roll < 0.25) {
            p.lastThunderbolt = now;
            executeThunderbolt();
          } else if (roll < 0.40) {
            // Take a quick nap
            p.state = 'sleeping';
            setState('sleeping');
            p.idleTimer = 0;
          } else {
            // Natural pause (1.5 to 3.5 seconds)
            p.idleDuration = 90 + Math.floor(Math.random() * 120);
          }
        } else {
          // Accelerate smoothly towards target
          const maxSpeed = prefersReducedMotion ? 1.4 : 3.2;
          const accel = 0.22;
          const targetVx = (dx / dist) * maxSpeed;

          // Ease in/out
          if (dist < 60) {
            // Decelerate near destination
            p.vx += (targetVx * (dist / 60) - p.vx) * 0.18;
          } else {
            p.vx += (targetVx - p.vx) * accel;
          }

          p.x += p.vx;

          // Gentle vertical smoothing towards targetY
          p.y += (p.targetY - p.y) * 0.08;
        }

        // Boundary guard
        if (p.x < 40) {
          p.x = 40;
          p.targetX = vpW / 2;
          p.desiredFacing = 1;
          p.state = 'turning';
          p.turnTimer = 6;
          setState('turning');
        } else if (p.x > vpW - 40) {
          p.x = vpW - 40;
          p.targetX = vpW / 2;
          p.desiredFacing = -1;
          p.state = 'turning';
          p.turnTimer = 6;
          setState('turning');
        }
      }

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
          let row = 0;

          // Row 0 = Down, Row 1 = Left, Row 2 = Right, Row 3 = Up
          // In the sprite sheet:
          // cols 0..2 = Walk (frame 0, 1, 2)
          // cols 3..5 = Run (frame 0, 1, 2)
          // cols 6..8 = Sprint / Fast run
          if (p.state === 'running') {
            row = p.facing === 1 ? 2 : 1;
            // Cycle 4-step walk/run cycle [1, 2, 1, 0]
            const step = Math.floor(p.frameTick / 6) % 4;
            const cycle = [3, 4, 3, 5]; // use dynamic running frames from cols 3..5
            col = cycle[step];
          } else if (p.state === 'turning') {
            // Turning pivot frame (looking front-angled)
            row = 0;
            col = 1;
          } else if (p.state === 'sleeping') {
            // Sleeping curled pose (facing forward/resting)
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
            // IDLE: gentle breath / subtle head look
            row = p.facing === 1 ? 2 : 1;
            col = 1; // standing neutral pose
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

      // Update DOM transform directly (avoids React re-render thrashing!)
      if (containerRef.current) {
        // High precision translate3d
        containerRef.current.style.transform = `translate3d(${Math.round(p.x - 32)}px, ${Math.round(p.y - 48)}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (actionTimeout.current) clearTimeout(actionTimeout.current);
    };
  }, [enabled, pickNewTarget, executeThunderbolt]);

  return (
    <>
      {/* Floating Toggle Button (Bottom-Right, non-obtrusive, accessible) */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 900,
        }}
      >
        <button
          onClick={onToggle}
          style={{
            background: enabled ? 'rgba(255, 212, 71, 0.18)' : 'rgba(25, 17, 40, 0.92)',
            border: enabled ? '1.5px solid var(--butter)' : '1.5px solid var(--line)',
            color: enabled ? 'var(--butter)' : 'var(--fg-soft)',
            padding: '7px 14px',
            borderRadius: '999px',
            fontSize: '12.5px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.15s ease',
          }}
          className="hover:scale-105"
          id="btn-pikachu-toggle"
          title="Toggle Pikachu website companion"
        >
          <Zap size={13} style={{ fill: enabled ? 'currentColor' : 'none' }} />
          <span>Pikachu {enabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Autonomous Animated Pikachu Character */}
      {enabled && (
        <div
          ref={containerRef}
          onClick={handlePikachuClick}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '64px',
            height: '64px',
            zIndex: 9998,
            cursor: 'pointer',
            pointerEvents: 'auto',
            willChange: 'transform',
            filter: isDischarging
              ? 'drop-shadow(0 0 16px #FFE600) drop-shadow(0 4px 8px rgba(0,0,0,0.6))'
              : 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.55))',
            transition: 'filter 0.15s ease',
          }}
          title="Pikachu companion — Click to interact!"
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
