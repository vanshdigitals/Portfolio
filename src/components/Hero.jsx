import { useState, useEffect, Suspense, lazy } from 'react';
import { ArrowDown } from 'lucide-react';
import Button from './Button';
import chatgptIcon from '../assets/chatgpt-icon.webp';
import canvaIcon from '../assets/canva-icon.webp';
import photoshopIcon from '../assets/photoshop-icon.webp';
import illustratorIcon from '../assets/illustrator-icon.webp';
import desktopIconsData from '../data/heroIcons.desktop.json';
import mobileIconsData from '../data/heroIcons.mobile.json';
const HeroIconEditor = import.meta.env.DEV ? lazy(() => import('./dev/HeroIconEditor')) : () => null;

const assetMap = {
  'chatgpt-icon.webp': chatgptIcon,
  'canva-icon.webp': canvaIcon,
  'photoshop-icon.webp': photoshopIcon,
  'illustrator-icon.webp': illustratorIcon
};

// Toggle availability/relocation editorial metadata block below the portrait
const SHOW_AVAILABILITY_METADATA = false;

function MoreAboutMeBadge() {
  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href="/#about"
      onClick={handleClick}
      aria-label="Scroll to About section — More About Me"
      className="group relative flex items-center justify-center w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] md:w-[116px] md:h-[116px] lg:w-[136px] lg:h-[136px] rounded-full pointer-events-auto select-none shrink-0 text-text-primary transition-colors duration-300"
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          {/* Continuous circular text path: radius 60, circumference 377px, starts at 9 o'clock */}
          <path id="heroBadgeCircle" d="M 20, 80 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="none" />
        </defs>

        {/* Outer rotating group: spins continuously on hover, smoothly pauses on exit */}
        <g
          className="motion-safe:animate-[badge-spin_10s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running] group-focus-visible:[animation-play-state:running]"
          style={{ transformOrigin: '80px 80px' }}
        >
          {/* Inner group with -4.0deg optical rotation: aligns 9 o'clock and 3 o'clock stars, and 12/6 o'clock ABOUT */}
          <g transform="rotate(-4.0 80 80)">
            <text
              fontFamily="var(--font-heading)"
              fontSize="16px"
              fontWeight="700"
              fill="currentColor"
              xmlSpace="preserve"
              className="select-none tracking-normal transition-opacity duration-300 group-hover:opacity-85"
            >
              <textPath href="#heroBadgeCircle" textLength="377" lengthAdjust="spacing">
                ✦ MORE ABOUT ME ✦ MORE ABOUT ME&#160;
              </textPath>
            </text>
          </g>
        </g>

        {/* Center downward arrow: scaled to 16px typography scale with bold 3.6 stroke weight */}
        <g 
          stroke="currentColor" 
          strokeWidth="3.6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
          className="transition-transform duration-300 group-hover:translate-y-1.5"
          style={{ transformOrigin: '80px 80px' }}
        >
          <line x1="80" y1="62" x2="80" y2="98" />
          <polyline points="70,87 80,98 90,87" />
        </g>
      </svg>
    </a>
  );
}

export default function Hero() {
  const isDev = import.meta.env.DEV;
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isEditMode = isDev && urlParams?.get('edit') === 'icons';

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 1024px)');
    const onMediaChange = (e) => setIsDesktop(e.matches);
    const onResize = () => setWindowWidth(window.innerWidth);

    mql.addEventListener('change', onMediaChange);
    window.addEventListener('resize', onResize);
    return () => {
      mql.removeEventListener('change', onMediaChange);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const [editorMode, setEditorMode] = useState('desktop');

  const [desktopConfig, setDesktopConfig] = useState(() => {
    if (isEditMode) {
      const saved = sessionStorage.getItem('heroIconsSession_desktop');
      if (saved) {
        try { return JSON.parse(saved); } catch(e) {}
      }
    }
    return JSON.parse(JSON.stringify(desktopIconsData));
  });

  const [mobileConfig, setMobileConfig] = useState(() => {
    if (isEditMode) {
      const saved = sessionStorage.getItem('heroIconsSession_mobile');
      if (saved) {
        try { return JSON.parse(saved); } catch(e) {}
      }
    }
    return JSON.parse(JSON.stringify(mobileIconsData));
  });

  const activeConfig = isEditMode 
    ? (editorMode === 'desktop' ? desktopConfig : mobileConfig) 
    : (isDesktop ? desktopConfig : mobileConfig);

  /**
   * Continuous shoulder clearance formula:
   * Prevents top icons (ChatGPT and Canva) from dropping onto the shoulder in the tablet band (480–1024px).
   * Because the portrait padding-to-image ratio is constant (17.1%) below 1024px and only expands above 1024px
   * (reaching 23% at 1440px), applying desktop y prematurely at tablet widths causes a ~35-45px drop onto the shoulder.
   * In view mode, this smoothly bridges the confirmed-good mobile y and desktop y endpoints.
   */
  const getIconY = (icon) => {
    if (isEditMode) return icon.y;
    if (icon.id === 'chatgpt') {
      const mobY = mobileConfig.icons.find(i => i.id === 'chatgpt')?.y ?? 47.5;
      const deskY = desktopConfig.icons.find(i => i.id === 'chatgpt')?.y ?? 52.7;
      if (windowWidth <= 600) return mobY;
      if (windowWidth >= 1440) return deskY;
      const t = windowWidth < 1024 
        ? 0.15 * ((windowWidth - 600) / (1024 - 600))
        : 0.15 + 0.85 * ((windowWidth - 1024) / (1440 - 1024));
      return mobY + t * (deskY - mobY);
    }
    if (icon.id === 'canva') {
      const mobY = mobileConfig.icons.find(i => i.id === 'canva')?.y ?? 45.0;
      const deskY = desktopConfig.icons.find(i => i.id === 'canva')?.y ?? 50.3;
      if (windowWidth <= 600) return mobY;
      if (windowWidth >= 1440) return deskY;
      const t = windowWidth < 1024 
        ? 0.15 * ((windowWidth - 600) / (1024 - 600))
        : 0.15 + 0.85 * ((windowWidth - 1024) / (1440 - 1024));
      return mobY + t * (deskY - mobY);
    }
    return icon.y;
  };

  const [selectedId, setSelectedId] = useState('chatgpt');

  useEffect(() => {
    if (isEditMode) {
      sessionStorage.setItem('heroIconsSession_desktop', JSON.stringify(desktopConfig));
      sessionStorage.setItem('heroIconsSession_mobile', JSON.stringify(mobileConfig));
    }
  }, [desktopConfig, mobileConfig, isEditMode]);

  const handleReset = () => {
    if (editorMode === 'desktop') {
      setDesktopConfig(JSON.parse(JSON.stringify(desktopIconsData)));
      sessionStorage.removeItem('heroIconsSession_desktop');
    } else {
      setMobileConfig(JSON.parse(JSON.stringify(mobileIconsData)));
      sessionStorage.removeItem('heroIconsSession_mobile');
    }
  };

  return (
    <section 
      id="hero" 
      className={`relative mt-16 lg:mt-24 pt-0 pb-0 flex flex-col items-center justify-start bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-[320ms] overflow-x-clip ${isEditMode ? (editorMode === 'desktop' ? 'w-[1440px] max-w-none mx-auto' : 'w-[390px] max-w-none mx-auto') : 'w-full'}`}
      style={{ scrollMarginTop: 'var(--header-h, 64px)' }}
    >

      {/*
        ── COMPOSITION GROUP ──────────────────────────────────────────────────────
        Single-column CSS grid. All layers share col-start-1 row-start-1 so they
        stack naturally. Height is content-driven (no fixed heights).

      {/*
        ── COMPOSITION GROUP ──────────────────────────────────────────────────────
        Single-column CSS grid. All layers share col-start-1 row-start-1 so they
        stack naturally. Height is content-driven (no fixed heights).

        max-w-[1536px] matches the Header's container so ultra-wide / TV screens stay
        controlled and aligned.

        px-4 lg:px-5 xl:px-6 2xl:px-8 matches Header's exact responsive padding tokens.
      */}
      <div className="relative w-full max-w-[1536px] mx-auto px-4 lg:px-5 xl:px-6 2xl:px-8 grid grid-cols-1 items-start isolate @container">

        {/*
          ── PORTFOLIO WORDMARK ── Layer z-10 (behind portrait) ────────────────
          flex + justify-center ensures the h1's fit-content bounding box is
          optically centered — fixing any glyph-metric sidebearing imbalance
          that text-align:center alone cannot correct.
        */}
        <div className="col-start-1 row-start-1 z-10 w-full justify-self-center self-start flex justify-center">
          {/*
            OPTICAL CENTERING CORRECTION
            Furgatorio Titling's final "O" carries extra right-side advance space,
            so the text bounding box centres ~1% left of the visible glyph edges.
            translateX(0.8%) shifts the visual rendering right without touching layout.

            Applied to a wrapper div — NOT the h1 — because the h1's portfolio-init
            animation uses transform and ends with `translateX(0)` in forwards fill mode,
            which would override any base transform on the h1 itself.

            The percentage is relative to this div's own width (= rendered text width),
            so the correction scales proportionally with font size at every breakpoint:
              375px  → text ≈ 368px → shift ≈ 2.9px
              768px  → text ≈ 752px → shift ≈ 6.0px
              1440px → text ≈ 1415px → shift ≈ 11.3px
          */}
          <div style={{ transform: 'translateX(clamp(0px, 0.8%, calc((100cqw - 100%) / 2)))' }}>
            <h1
              className="font-furgatorio portfolio-wordmark text-[#007BFF] leading-[1.1] m-0 select-none whitespace-nowrap"
            >
              PORTFOLIO
            </h1>
          </div>
        </div>

        {/*
          ── PORTRAIT + CTA ── Layer z-20 ──────────────────────────────────────
        */}
        <div className="col-start-1 row-start-1 z-20 w-full relative flex flex-col items-center justify-start pointer-events-none self-start">
          
          {/* 
            PORTRAIT CONTAINER (z-10) 
            Negative bottom margin causes the placard below to slide up UNDER the portrait.
            Constrained by max-w-[min(580px,71cqw)] so floating icons never exceed the safe padded content boundary.
          */}
          <div
            className={`relative z-10 ${isEditMode ? (editorMode === 'desktop' ? 'w-[clamp(400px,60cqw,580px)]' : 'w-[clamp(240px,60cqw,400px)]') : 'w-[clamp(240px,60cqw,580px)] max-w-[min(580px,71cqw)]'}
                       pt-[clamp(70px,18cqw,270px)]
                       ${SHOW_AVAILABILITY_METADATA ? '-mb-[22%] sm:-mb-[18%] lg:-mb-[14%] xl:-mb-[80px]' : 'mb-0'}
                       lg:-translate-y-12 xl:-translate-y-16 lg:-mb-12 xl:-mb-16`}
          >

            {/* Portrait image — renders at natural aspect ratio via h-auto. Width/Height attributes prevent layout shift. */}
            <img
              src="/images/hero-portrait.webp"
              alt="Vansh Gupta"
              width="1377"
              height="2000"
              fetchPriority="high"
              className="w-full h-auto object-contain block select-none pointer-events-none"
              draggable="false"
            />

            {/*
              ICON POSITIONS — anchored to portrait image anatomy:
              
              top: 22% → shoulder/head-transition zone (below face, at collar)
              top: 72% → lower arm / hand zone
              left/right: 10% → near the silhouette edges without face overlap

              -translate-y-1/2 vertically centers each icon on its anchor row.

              ICON SIZING — clamp():
                mobile  (375px):  5vw = 18.75px → clamp min 36px applies
                tablet  (768px):  5vw = 38.4px  → ~38px
                desktop (1440px): 5vw = 72px    → clamp max 68px applies
            */}

            {/* ── FLOATING ICONS (DATA-DRIVEN, PROPORTIONAL) ── */}
            {activeConfig.icons.map((icon) => {
              const rotation = icon.id === 'photoshop' ? '-80deg' : icon.id === 'illustrator' ? '78deg' : '0deg';
              const isSelected = isEditMode && selectedId === icon.id;
              return (
                <div 
                  key={icon.id}
                  className="absolute z-10"
                  style={{
                    left: `${icon.x}%`,
                    top: `${getIconY(icon)}%`,
                    width: '11.724%', /* 68px / 580px */
                    aspectRatio: '1 / 1',
                    transform: `translate(-50%, -50%) scale(${activeConfig.scale}) rotate(${icon.rotation || 0}deg)`,
                    outline: isSelected ? '1px solid #007BFF' : 'none',
                    pointerEvents: isEditMode ? 'auto' : 'none'
                  }}
                  onClick={isEditMode ? () => setSelectedId(icon.id) : undefined}
                >
                  <img
                    src={assetMap[icon.asset]}
                    alt=""
                    style={{ transform: `rotate(${rotation})` }}
                    className="w-full h-full object-contain drop-shadow-md pointer-events-none"
                    draggable="false"
                  />
                  {isSelected && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-[#007BFF] text-white text-[10px] px-1 rounded whitespace-nowrap">
                      {icon.id}
                    </div>
                  )}
                </div>
              );
            })}

          </div>

          {/* 
            EDITORIAL AVAILABILITY METADATA (Flush on page background)
            Preserved for later restoration; set SHOW_AVAILABILITY_METADATA = true to re-enable.
          */}
          {SHOW_AVAILABILITY_METADATA && (
            <div className="relative z-0 pointer-events-auto flex flex-col items-center text-center pt-[26%] sm:pt-[22%] lg:pt-[18%] xl:pt-[105px] pb-4 md:pb-6 px-4">
              <p className="font-body font-medium text-[13px] md:text-[14px] text-text-primary leading-[1.6]">
                Open For Offline <span className="opacity-40 font-normal mx-1">|</span> Hybrid <span className="opacity-40 font-normal mx-1">|</span> Online
                <br />
                Freelance <span className="opacity-40 font-normal mx-1">|</span> Internships <span className="opacity-40 font-normal mx-1">|</span> Job Work
              </p>
              
              <div className="w-10 h-px bg-hairline my-3 md:my-3.5" aria-hidden="true" />
              
              <p className="font-body text-[12px] md:text-[13px] text-text-secondary leading-[1.5]">
                Also open to relocate
                <br />
                <span className="font-semibold text-text-primary dark:text-[#FFD722] mt-0.5 inline-block tracking-wide">
                  Noida &middot; Delhi &middot; Gurugram
                </span>
              </p>
            </div>
          )}

          {/* ── HERO BOTTOM ROW: Centered CTA Button with responsive bottom spacing ── */}
          <div className="relative w-full max-w-full mx-auto flex items-center justify-center -mt-[64px] sm:-mt-[74px] lg:-mt-[80px] mb-10 sm:mb-12 md:mb-14 lg:mb-16 pb-0 z-30 pointer-events-none">
            {/* EXPLORE MY WORK CTA BUTTON (Bottom-Center) */}
            <div className="pointer-events-auto flex justify-center">
              <Button 
                size="hero"
                label="Explore My Work" 
                href="/#work" 
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('work');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              />
            </div>
          </div>

        </div>

        {/* ── STICKY BADGE TRACK (Scoped strictly to Hero section height; hidden on mobile view) ── */}
        <div className="hidden md:flex col-start-1 row-start-1 h-full w-full pointer-events-none z-30 flex-col justify-end items-start pb-10 sm:pb-12 md:pb-14 lg:pb-16">
          <div className="sticky bottom-10 sm:bottom-12 md:bottom-14 lg:bottom-16 pointer-events-auto flex">
            <MoreAboutMeBadge />
          </div>
        </div>

      </div>


      {isEditMode && (
        <Suspense fallback={null}>
          <HeroIconEditor 
            config={activeConfig} 
            setConfig={editorMode === 'desktop' ? setDesktopConfig : setMobileConfig} 
            onReset={handleReset}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            editorMode={editorMode}
            setEditorMode={setEditorMode}
          />
        </Suspense>
      )}
    </section>
  );
}
