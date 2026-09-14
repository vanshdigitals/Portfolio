import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Button from '../Button';

// ── TIMELINE STAGES DATA ────────────────────────────────────────────────
export const JOURNEY_STAGES = [
  {
    numeral: '01',
    category: 'DRAWING',
    title: 'Drawing',
    description: 'Started with drawing and visual experimentation.',
    offsetY: 0,
  },
  {
    numeral: '02',
    category: 'DIGITAL EXPLORATION',
    title: 'Digital',
    description: 'Moved from paper to screens and explored websites, layouts and digital creation.',
    offsetY: 6,
  },
  {
    numeral: '03',
    category: 'CREATIVE PRACTICE',
    title: 'Practice',
    description: 'Turned curiosity into hands-on design practice and real projects.',
    offsetY: -4,
  },
  {
    numeral: '04',
    category: 'DESIGN TODAY',
    title: 'Today',
    description: 'Graphic Designer & Visual Designer, creating social media carousels, reel covers, posters and promotional visuals.',
    offsetY: 4,
  },
];

export default function JourneyTimeline({ sectionRef }) {
  const prefersReducedMotion = useReducedMotion();
  const desktopContainerRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const desktopDotRefs = useRef([]);
  const mobileDotRefs = useRef([]);

  // Desktop horizontal geometry
  const [desktopLayout, setDesktopLayout] = useState({
    trackLeft: 0,
    trackWidth: 0,
    fractions: [0, 0.333, 0.667, 1.0],
    ready: false,
  });

  // Mobile vertical geometry
  const [mobileLayout, setMobileLayout] = useState({
    trackLeft: 17,
    trackTop: 0,
    trackHeight: 0,
    fractions: [0, 0.333, 0.667, 1.0],
    ready: false,
  });

  // Current scroll progress state for node styling
  const [currentProgress, setCurrentProgress] = useState(0);

  // Scroll mapping: starts when About section is well in view, settles as timeline and CTA conclude
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 45%', 'end 85%'],
  });

  // Smooth, continuous spring physics for fluid beam travel without stutters
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Measure desktop node centers for exact track alignment
  useEffect(() => {
    const measureDesktop = () => {
      if (!desktopContainerRef.current) return;
      const containerRect = desktopContainerRef.current.getBoundingClientRect();
      const dotCenters = desktopDotRefs.current.map((dot) => {
        if (!dot) return 0;
        const r = dot.getBoundingClientRect();
        return r.left + r.width / 2 - containerRect.left;
      });

      if (dotCenters.length === 4 && dotCenters[3] > dotCenters[0]) {
        const trackLeft = dotCenters[0];
        const trackWidth = dotCenters[3] - dotCenters[0];
        const fractions = dotCenters.map((x) =>
          Math.max(0, Math.min(1, (x - trackLeft) / trackWidth))
        );
        setDesktopLayout({
          trackLeft,
          trackWidth,
          fractions,
          ready: true,
        });
      }
    };

    // Measure mobile node centers for vertical line alignment
    const measureMobile = () => {
      if (!mobileContainerRef.current) return;
      const containerRect = mobileContainerRef.current.getBoundingClientRect();
      const dotCentersX = mobileDotRefs.current.map((dot) => {
        if (!dot) return 0;
        const r = dot.getBoundingClientRect();
        return r.left + r.width / 2 - containerRect.left;
      });
      const dotCentersY = mobileDotRefs.current.map((dot) => {
        if (!dot) return 0;
        const r = dot.getBoundingClientRect();
        return r.top + r.height / 2 - containerRect.top;
      });

      if (dotCentersY.length === 4 && dotCentersY[3] > dotCentersY[0]) {
        const trackLeft = dotCentersX[0] || 17;
        const trackTop = dotCentersY[0];
        const trackHeight = dotCentersY[3] - dotCentersY[0];
        const fractions = dotCentersY.map((y) =>
          Math.max(0, Math.min(1, (y - trackTop) / trackHeight))
        );
        setMobileLayout({
          trackLeft,
          trackTop,
          trackHeight,
          fractions,
          ready: true,
        });
      }
    };

    const updateAll = () => {
      measureDesktop();
      measureMobile();
    };

    // Double RAF ensures fonts and layout styles have stabilized
    requestAnimationFrame(() => {
      requestAnimationFrame(updateAll);
    });

    window.addEventListener('resize', updateAll);
    const ro = new ResizeObserver(updateAll);
    if (desktopContainerRef.current) ro.observe(desktopContainerRef.current);
    if (mobileContainerRef.current) ro.observe(mobileContainerRef.current);

    return () => {
      window.removeEventListener('resize', updateAll);
      ro.disconnect();
    };
  }, []);

  // Track progress value to drive node active and leading state
  useEffect(() => {
    const unsub = smoothProgress.on('change', (v) => {
      setCurrentProgress(Math.max(0, Math.min(1, v)));
    });
    return () => unsub();
  }, [smoothProgress]);

  // Framer transform for beam scaleX (desktop) and scaleY (mobile)
  const beamScaleX = useTransform(smoothProgress, [0, 1], [0, 1], { clamp: true });
  const beamScaleY = useTransform(smoothProgress, [0, 1], [0, 1], { clamp: true });

  const easeLevel3 = [0.16, 1, 0.3, 1];
  const fadeIn = (delay = 0) =>
    prefersReducedMotion
      ? { initial: false, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay, ease: easeLevel3 },
        };

  return (
    <div className="w-full flex flex-col items-center">
      {/* ── DESKTOP & TABLET HORIZONTAL TIMELINE (min-[720px]+) ─────────── */}
      <div
        ref={desktopContainerRef}
        className="hidden min-[720px]:block relative w-full pt-4 pb-2 select-none"
      >
        {/* 1. Stage Numerals Row */}
        <div className="grid grid-cols-4 gap-4 lg:gap-6 xl:gap-8 w-full mb-2">
          {JOURNEY_STAGES.map((stage, idx) => {
            const threshold = idx === 0 ? 0 : desktopLayout.fractions[idx] - 0.02;
            const isActive = currentProgress >= threshold;
            return (
              <div key={stage.numeral} className="flex items-center">
                <div className="w-[18px] flex justify-center">
                  <span
                    className={`font-mono text-[12px] font-medium tracking-[0.08em] transition-colors duration-300 ${
                      isActive
                        ? 'text-[#007BFF] font-semibold'
                        : 'text-text-muted'
                    }`}
                  >
                    {stage.numeral}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Timeline Track Row: 1px Baseline + Active Beam + Clean Circular Nodes */}
        <div className="relative w-full h-[16px] flex items-center mb-3">
          {/* Baseline 1px track connecting Node 01 center to Node 04 center */}
          {desktopLayout.ready && (
            <div
              className="absolute h-[1px] bg-[#E4E1D9] dark:bg-[#2A2C31] pointer-events-none z-0"
              style={{
                left: `${desktopLayout.trackLeft}px`,
                width: `${desktopLayout.trackWidth}px`,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              {/* Active blue illuminated beam traveling along the 1px baseline */}
              <motion.div
                style={{
                  scaleX: beamScaleX,
                  transformOrigin: 'left center',
                }}
                className="absolute inset-0 w-full h-full bg-[#007BFF] shadow-[0_0_4px_rgba(0,123,255,0.4)]"
              />
            </div>
          )}

          {/* 4 Clean Circular Nodes (Shares exact same vertical centerline with 1px baseline) */}
          <div className="grid grid-cols-4 gap-4 lg:gap-6 xl:gap-8 w-full h-full relative z-10 pointer-events-none">
            {JOURNEY_STAGES.map((stage, idx) => {
              const threshold = idx === 0 ? 0 : desktopLayout.fractions[idx] - 0.02;
              const nextThreshold =
                idx === 3 ? 1.05 : desktopLayout.fractions[idx + 1] - 0.02;

              const isActive = currentProgress >= threshold;
              const isLeading =
                isActive &&
                (idx === 3 ? currentProgress >= 0.96 : currentProgress < nextThreshold);

              return (
                <div key={stage.numeral} className="flex items-center h-full">
                  <div className="w-[18px] flex justify-center items-center h-full">
                    <div
                      ref={(el) => (desktopDotRefs.current[idx] = el)}
                      className={`w-[8px] h-[8px] rounded-full transition-all duration-300 pointer-events-auto ${
                        isActive
                          ? isLeading
                            ? 'bg-[#007BFF] shadow-[0_0_8px_rgba(0,123,255,0.65)]'
                            : 'bg-[#007BFF] shadow-[0_0_4px_rgba(0,123,255,0.35)]'
                          : 'bg-[#71717A] dark:bg-[#52525B]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Stage Content Row */}
        <div className="grid grid-cols-4 gap-4 lg:gap-6 xl:gap-8 w-full">
          {JOURNEY_STAGES.map((stage, idx) => {
            const threshold = idx === 0 ? 0 : desktopLayout.fractions[idx] - 0.02;
            const isActive = currentProgress >= threshold;
            return (
              <motion.div
                key={stage.numeral}
                {...fadeIn(0.1 + idx * 0.08)}
                className="flex flex-col pr-2 xl:pr-4"
                style={{ transform: `translateY(${stage.offsetY}px)` }}
              >
                {/* Category / Phase Label */}
                <span
                  className={`font-meta-label transition-colors duration-300 ${
                    isActive ? 'text-text-primary' : 'text-text-muted'
                  }`}
                >
                  {stage.category}
                </span>

                {/* Stage Title */}
                <h3
                  className={`font-heading text-[15px] md:text-[17px] lg:text-[18px] xl:text-[20px] font-medium leading-tight mt-1 transition-colors duration-300 ${
                    isActive ? 'text-text-primary' : 'text-text-secondary'
                  }`}
                >
                  {stage.title}
                </h3>

                {/* Supporting Sentence */}
                <p className="font-body-small text-[12px] md:text-[13px] lg:text-[13.5px] text-text-secondary mt-1.5 leading-[1.45] md:leading-[1.5] lg:leading-[1.55] max-w-[280px]">
                  {stage.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE VERTICAL TIMELINE (< min-[720px]) ──────────────────────── */}
      <div
        ref={mobileContainerRef}
        className="block min-[720px]:hidden relative w-full pt-4 pb-2 px-2 select-none"
      >
        {/* Baseline vertical 1px track connecting Node 01 center to Node 04 center */}
        {mobileLayout.ready && (
          <div
            className="absolute w-[1px] bg-[#E4E1D9] dark:bg-[#2A2C31] pointer-events-none z-0"
            style={{
              left: `${mobileLayout.trackLeft}px`,
              top: `${mobileLayout.trackTop}px`,
              height: `${mobileLayout.trackHeight}px`,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Animated blue light beam progressing top -> bottom */}
            <motion.div
              style={{
                scaleY: beamScaleY,
                transformOrigin: 'top center',
              }}
              className="absolute inset-0 w-full h-full bg-[#007BFF] shadow-[0_0_4px_rgba(0,123,255,0.4)]"
            />
          </div>
        )}

        {/* 4 Vertical Stage Rows */}
        <div className="flex flex-col gap-8 relative z-10 w-full">
          {JOURNEY_STAGES.map((stage, idx) => {
            const threshold = idx === 0 ? 0 : mobileLayout.fractions[idx] - 0.02;
            const nextThreshold =
              idx === 3 ? 1.05 : mobileLayout.fractions[idx + 1] - 0.02;

            const isActive = currentProgress >= threshold;
            const isLeading =
              isActive &&
              (idx === 3 ? currentProgress >= 0.96 : currentProgress < nextThreshold);

            return (
              <div key={stage.numeral} className="flex items-start gap-4">
                {/* Circular Node / Dot */}
                <div className="shrink-0 pt-1.5 flex items-center justify-center w-[18px]">
                  <div
                    ref={(el) => (mobileDotRefs.current[idx] = el)}
                    className={`w-[8px] h-[8px] rounded-full transition-all duration-300 pointer-events-auto ${
                      isActive
                        ? isLeading
                          ? 'bg-[#007BFF] shadow-[0_0_8px_rgba(0,123,255,0.65)]'
                          : 'bg-[#007BFF] shadow-[0_0_4px_rgba(0,123,255,0.35)]'
                        : 'bg-[#71717A] dark:bg-[#52525B]'
                    }`}
                  />
                </div>

                {/* Content Block */}
                <div className="flex flex-col grow min-w-0 pb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[11px] font-medium tracking-[0.08em] transition-colors duration-300 ${
                        isActive ? 'text-[#007BFF] font-semibold' : 'text-text-muted'
                      }`}
                    >
                      {stage.numeral}
                    </span>
                    <span className="text-text-muted text-[10px]">•</span>
                    <span
                      className={`font-meta-label text-[11px] transition-colors duration-300 ${
                        isActive ? 'text-text-primary' : 'text-text-muted'
                      }`}
                    >
                      {stage.category}
                    </span>
                  </div>

                  <h3
                    className={`font-heading text-[17px] font-medium leading-snug mt-1 transition-colors duration-300 ${
                      isActive ? 'text-text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {stage.title}
                  </h3>

                  <p className="font-body-small text-[13.5px] text-text-secondary mt-1 leading-[1.5]">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── TIMELINE ENDING & NATURAL CTA ─────────────────────────────────── */}
      <div className="w-full flex flex-col items-center pt-8 pb-0">
        {/* Editorial Closing Line */}
        <motion.p
          {...fadeIn(0.45)}
          className="text-center font-heading text-[15px] md:text-[17px] font-normal text-text-secondary tracking-[0.03em] italic mb-4"
        >
          Still learning. Still creating.
        </motion.p>

        {/* Explore My Work CTA */}
        <motion.div {...fadeIn(0.5)} className="flex justify-center">
          <Button
            size="hero"
            label="Explore My Work"
            href="/#work"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('work');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '#work');
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
