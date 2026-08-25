/**
 * AnimatedNavIndicator
 *
 * Owns:
 *  - Geometry measurement (ResizeObserver + font-load)
 *  - rAF spring travel + continuous phase flow (living wave)
 *  - prefers-reduced-motion: instant snap, static shape
 */
import { useRef, useEffect, useState, useCallback } from 'react';

// ── Spring config ─────────────────────────────────────────────────────────────
const STIFFNESS = 140;
const DAMPING   = 26;
const MASS      = 1;
const EPSILON   = 0.15;

// ── Wave geometry ─────────────────────────────────────────────────────────────
const WAVE_H    = 10;
const AMPLITUDE = 3;
const MID       = WAVE_H / 2;

function buildSinePath(width, crests, phase = 0) {
  if (!width || crests < 1) return '';
  const step = width / crests;
  
  // Safely normalize phase to [0, 1) to prevent JS negative modulo issues
  let normalizedPhase = phase % 1;
  if (normalizedPhase < 0) normalizedPhase += 1;
  
  // Shift X to the right by phase * wavelength (which is 2 steps)
  const shiftX = normalizedPhase * (2 * step);
  
  // Draw extra cycles on left and right to allow seamless shifting
  const startI = -2;
  const endI = crests + 2;
  
  let d = '';
  for (let i = startI; i < endI; i++) {
    const startX = (i * step) + shiftX;
    const cx     = startX + (step / 2);
    const cy     = (Math.abs(i) % 2 === 0) ? MID - AMPLITUDE : MID + AMPLITUDE;
    const ex     = startX + step;
    
    if (i === startI) {
      d += `M ${startX.toFixed(2)} ${MID}`;
    }
    d += ` Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${ex.toFixed(2)} ${MID}`;
  }
  return d;
}

export default function AnimatedNavIndicator({
  navRef, itemRefs, activeIndex, pointCounts, reducedMotion, isDark
}) {
  const [rects,   setRects]   = useState([]);
  const [visible, setVisible] = useState(false);

  const svgRef    = useRef(null);
  const springRef = useRef({ x: 0, vx: 0, targetX: 0, width: 60, targetWidth: 60, phase: 0 });
  
  const rafRef    = useRef(null);
  const isInitialized = useRef(false);
  
  // Keep latest config in ref so loop doesn't need restarting on index change
  const configRef = useRef({ crests: 4 });

  // ── Measurement ──────────────────────────────────────────────────────────────
  const measureRects = useCallback(() => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const measured = (itemRefs.current || []).map((el) => {
      if (!el) return { left: 0, width: 0 };
      const r = el.getBoundingClientRect();
      return { left: r.left - navRect.left, width: r.width };
    });
    setRects(measured);
  }, [navRef, itemRefs]);

  useEffect(() => {
    measureRects();
    const t = setTimeout(measureRects, 150);
    if (document.fonts?.ready) document.fonts.ready.then(measureRects);
    const ro = new ResizeObserver(measureRects);
    if (navRef.current) ro.observe(navRef.current);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [measureRects]);

  // ── Main Animation Loop ──────────────────────────────────────────────────────
  const startLoop = useCallback(() => {
    if (reducedMotion) return;
    if (rafRef.current) return; // already running

    let last = null;

    const tick = (now) => {
      if (!last) last = now;
      const dt = Math.min(now - last, 50); // cap at 50ms
      last = now;

      const sp = springRef.current;
      const svg = svgRef.current;
      const crests = configRef.current.crests;

      // 1. Spring physics (travel)
      const force = -STIFFNESS * (sp.x - sp.targetX) - DAMPING * sp.vx;
      sp.vx += (force / MASS) * (dt / 1000);
      
      const dx = sp.vx * (dt / 1000);
      sp.x  += dx;

      // Lerp width (arrives quickly, no stretch across gap)
      sp.width += (sp.targetWidth - sp.width) * Math.min((dt / 1000) * 5, 1);

      const settled = Math.abs(sp.x - sp.targetX) < EPSILON && Math.abs(sp.vx) < EPSILON;
      if (settled) {
        sp.x = sp.targetX;
        sp.vx = 0;
        sp.width = sp.targetWidth;
      }

      // 2. Living Wave Phase Flow (Coupled to Travel)
      // Wavelength is the exact physical width of one full sine cycle
      const wavelength = 2 * (sp.width / crests);
      
      // Moving right (+dx) must shift the internal phase backwards to anchor the wave to the global screen.
      // This is the "walking/rolling" constraint: the wave acts as a fixed medium the container slides over.
      const travelPhase = -dx / wavelength;
      
      // The constant idle sea-flow (treadmill)
      const baseSpeed = 1000 / 3500; // cycles per sec
      const idlePhase = baseSpeed * (dt / 1000);
      
      sp.phase += travelPhase + idlePhase;

      // 3. Render
      if (svg) {
        // Skew slightly in direction of travel (max 6deg)
        const skewAmount = Math.max(-6, Math.min(6, sp.vx * -0.015));
        svg.style.transform = `translateX(${sp.x.toFixed(2)}px) skewX(${skewAmount.toFixed(2)}deg)`;
        svg.style.width     = `${sp.width.toFixed(2)}px`;
        svg.setAttribute('viewBox', `0 0 ${sp.width.toFixed(2)} ${WAVE_H}`);
        const pathEl = svg.querySelector('path');
        if (pathEl) pathEl.setAttribute('d', buildSinePath(sp.width, crests, sp.phase));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [reducedMotion]);

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // ── React to activeIndex / rects ─────────────────────────────────────────────
  useEffect(() => {
    if (activeIndex == null || activeIndex < 0 || !rects[activeIndex]) {
      setVisible(false);
      stopLoop();
      return;
    }

    setVisible(true);
    const { left, width } = rects[activeIndex];
    const crests = pointCounts[activeIndex] ?? 4;
    configRef.current.crests = crests;
    
    const sp = springRef.current;

    if (reducedMotion) {
      stopLoop();
      sp.x = left; sp.targetX = left; sp.vx = 0;
      sp.width = width; sp.targetWidth = width;
      const svg = svgRef.current;
      if (svg) {
        svg.style.transform = `translateX(${left}px)`;
        svg.style.width     = `${width}px`;
        svg.setAttribute('viewBox', `0 0 ${width} ${WAVE_H}`);
        const pathEl = svg.querySelector('path');
        if (pathEl) pathEl.setAttribute('d', buildSinePath(width, crests, 0));
      }
      return;
    }

    if (!isInitialized.current) {
      sp.x = left;
      sp.vx = 0;
      sp.width = width;
      isInitialized.current = true;
    }

    sp.targetX     = left;
    sp.targetWidth = width;
    
    // Ensure loop is running
    startLoop();
  }, [activeIndex, rects, reducedMotion, pointCounts, startLoop, stopLoop]);

  // Cleanup
  useEffect(() => stopLoop, [stopLoop]);

  const initCrests = pointCounts[activeIndex] ?? 4;
  const initW      = rects[activeIndex]?.width || 60;

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-[30px] left-0 w-full h-[10px] pointer-events-none"
    >
      <svg
        ref={svgRef}
        className="absolute top-0 h-[10px] overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateX(${springRef.current.x}px)`,
          width: `${initW}px`,
          transition: 'opacity 150ms ease',
          willChange: 'transform, width',
        }}
        viewBox={`0 0 ${initW} ${WAVE_H}`}
        preserveAspectRatio="none"
      >
        <path
          d={buildSinePath(initW, initCrests, springRef.current.phase)}
          stroke={isDark ? '#FFD722' : '#007BFF'}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{ transition: 'stroke 320ms cubic-bezier(.4,0,.2,1)' }}
        />
      </svg>
    </div>
  );
}
