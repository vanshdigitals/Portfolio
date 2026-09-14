import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// ── ADJUSTABLE INTERACTION CONFIGURATION ────────────────────────────────
export const PORTRAIT_REVEAL_CONFIG = {
  followSmoothing: 0.1,    // Follow lag (0.05 = dreamy/delayed, 0.15 = fast/tight)
  waveSpeed: 0.0025,       // Fluid edge oscillation speed
  fadeSpeed: 0.08,         // Transition fade speed on mouse/touch leave (~200ms)
};

export default function InteractivePortrait({
  bwSrc,
  colorSrc,
  alt = 'Portrait of Vansh Gupta',
  width = '1122',
  height = '1402',
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const colorImgRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Animation & position refs (no React state to prevent unnecessary re-renders)
  const posRef = useRef({
    targetX: 200,
    targetY: 200,
    currentX: 200,
    currentY: 200,
    opacity: 0,
    isHovered: false,
    colorLoaded: false,
    animId: null,
    dpr: 1,
    width: 420,
    height: 525,
  });

  // Handle canvas sizing and retina scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      posRef.current.dpr = dpr;
      posRef.current.width = rect.width;
      posRef.current.height = rect.height;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Main interaction and animation loop (Mouse + Touch)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { followSmoothing, waveSpeed, fadeSpeed } = PORTRAIT_REVEAL_CONFIG;

    let isRunning = false;

    const render = (time) => {
      const state = posRef.current;
      const { width, height, dpr } = state;

      // Smooth coordinate interpolation (fluid lag)
      state.currentX += (state.targetX - state.currentX) * followSmoothing;
      state.currentY += (state.targetY - state.currentY) * followSmoothing;

      // Smooth opacity interpolation
      const targetOpacity = state.isHovered ? 1 : 0;
      state.opacity += (targetOpacity - state.opacity) * fadeSpeed;

      // When fully faded out, clear canvas and halt loop to save CPU
      if (!state.isHovered && state.opacity < 0.005) {
        state.opacity = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunning = false;
        state.animId = null;
        return;
      }

      // Clear entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colorImg = colorImgRef.current;
      const isLoaded = state.colorLoaded || (colorImg && colorImg.complete && colorImg.naturalWidth > 0);

      if (isLoaded && state.opacity > 0.001) {
        ctx.save();
        ctx.scale(dpr, dpr);

        // Dynamically compute responsive reveal radius based on rendered container width:
        // Desktop (~420px): baseRadius ~75px
        // Tablet (~340px): baseRadius ~60px
        // Mobile (~280px): baseRadius ~48px
        const baseRadius = Math.min(80, Math.max(46, width * 0.175));
        const feather = baseRadius * 0.52;
        const edgeIntensity = Math.min(8, baseRadius * 0.12);

        // 1. Build organic wavy spotlight path
        ctx.beginPath();
        const points = 36;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          // Harmonic wave equation for organic, fluid edge
          const wave = Math.sin(angle * 3 + time * waveSpeed) * 0.6 +
                       Math.cos(angle * 5 - time * (waveSpeed * 0.75)) * 0.4;
          const r = baseRadius + wave * edgeIntensity;
          const px = state.currentX + Math.cos(angle) * r;
          const py = state.currentY + Math.sin(angle) * r;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        // 2. Fill path with soft feathered radial gradient (no hard circular edge, no halo)
        const innerRadius = Math.max(0, baseRadius - feather);
        const outerRadius = baseRadius + edgeIntensity;
        const gradient = ctx.createRadialGradient(
          state.currentX, state.currentY, innerRadius,
          state.currentX, state.currentY, outerRadius
        );
        gradient.addColorStop(0, `rgba(0, 0, 0, ${state.opacity})`);
        gradient.addColorStop(0.5, `rgba(0, 0, 0, ${state.opacity * 0.75})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();

        // 3. Composite original colour portrait ONLY within the organic feathered mask
        ctx.globalCompositeOperation = 'source-in';
        ctx.drawImage(colorImg, 0, 0, width, height);

        ctx.restore();
      }

      state.animId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        posRef.current.animId = requestAnimationFrame(render);
      }
    };

    const updatePosition = (clientX, clientY, instant = false) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

      if (instant || posRef.current.opacity < 0.05) {
        posRef.current.currentX = x;
        posRef.current.currentY = y;
      }
      posRef.current.targetX = x;
      posRef.current.targetY = y;
    };

    // Desktop Mouse Handlers
    const handleMouseEnter = (e) => {
      updatePosition(e.clientX, e.clientY, true);
      posRef.current.isHovered = true;
      startLoop();
    };

    const handleMouseMove = (e) => {
      updatePosition(e.clientX, e.clientY);
      startLoop();
    };

    const handleMouseLeave = () => {
      posRef.current.isHovered = false;
    };

    // Tablet & Mobile Touch Handlers
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY, true);
        posRef.current.isHovered = true;
        startLoop();
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
        startLoop();
      }
    };

    const handleTouchEnd = () => {
      posRef.current.isHovered = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);

      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);

      if (posRef.current.animId) {
        cancelAnimationFrame(posRef.current.animId);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none touch-pan-y ${className}`}
    >
      {/* ── Base Black & White Portrait (Clean PNG Cutout) ── */}
      <img
        src={bwSrc}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none rounded-none border-none shadow-none"
      />

      {/* ── Preloaded Original Color Image for Canvas Compositing ─────────── */}
      <img
        ref={colorImgRef}
        src={colorSrc}
        alt=""
        aria-hidden="true"
        onLoad={() => { posRef.current.colorLoaded = true; }}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />

      {/* ── Interactive Colour Reveal Canvas Overlay ─────────────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
