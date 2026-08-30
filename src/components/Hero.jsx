import { Fragment } from 'react';
import chatgptIcon from '../assets/chatgpt-icon.webp';
import canvaIcon from '../assets/canva-icon.webp';
import photoshopIcon from '../assets/photoshop-icon.webp';
import illustratorIcon from '../assets/illustrator-icon.webp';

const marqueeItems = [
  "SOCIAL MEDIA DESIGN",
  "CAROUSEL DESIGN",
  "POST DESIGN",
  "REEL COVERS",
  "HIGHLIGHT COVERS",
  "POSTERS",
  "SOCIAL MEDIA BRANDING"
];

const MarqueeContent = ({ ariaHidden = false }) => (
  <span
    aria-hidden={ariaHidden}
    className={`flex items-center whitespace-nowrap font-heading font-bold uppercase text-white dark:text-[#FFD722] tracking-wide text-[9vw] sm:text-[clamp(26px,4vw,50px)] ${ariaHidden ? 'motion-reduce:hidden' : ''}`}
  >
    {marqueeItems.map((item, idx) => (
      <Fragment key={idx}>
        <span>{item}</span>
        <svg 
          className="w-[0.8em] h-[0.8em] text-[#FFD722] dark:text-white mx-[0.2em] shrink-0" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 0C12 5 17 12 24 12C17 12 12 19 12 24C12 19 7 12 0 12C7 12 12 5 12 0Z" />
        </svg>
      </Fragment>
    ))}
  </span>
);

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative w-full mt-16 lg:mt-24 pt-0 pb-0 flex flex-col items-center justify-start bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-[320ms] overflow-x-clip"
      style={{ scrollMarginTop: 'var(--header-h, 64px)' }}
    >

      {/*
        ── COMPOSITION GROUP ──────────────────────────────────────────────────────
        Single-column CSS grid. All layers share col-start-1 row-start-1 so they
        stack naturally. Height is content-driven (no fixed heights).

        max-w-[1600px] caps the composition so ultra-wide / TV screens stay
        controlled and centered.

        px-4 sm:px-6 gives equal breathing room on both sides at all widths.
      */}
      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 grid grid-cols-1 items-start isolate">

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
          <div style={{ transform: 'translateX(0.8%)' }}>
            <h1
              className="font-furgatorio portfolio-wordmark text-[#007BFF] leading-[1.1] m-0 select-none whitespace-nowrap"
            >
              PORTFOLIO
            </h1>
          </div>
        </div>

        {/*
          ── PORTRAIT + PLACARD ── Layer z-20 ──────────────────────────────────
        */}
        <div className="col-start-1 row-start-1 z-20 w-full relative flex flex-col items-center justify-start pointer-events-none self-start">
          
          {/* 
            PORTRAIT CONTAINER (z-10) 
            Negative bottom margin causes the placard below to slide up UNDER the portrait.
          */}
          <div
            className="relative z-10 w-[68%] sm:w-[70%] md:w-[60%] lg:w-[50%] max-w-[580px]
                       pt-[18vw] sm:pt-[18vw] md:pt-[18vw] lg:pt-[19vw] xl:pt-[270px]
                       -mb-[22%] sm:-mb-[18%] lg:-mb-[14%] xl:-mb-[80px]"
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

            {/* ── MOBILE ONLY: ICONS ON SHOULDERS ── */}
            {/* ChatGPT (Mobile) — upper-left / left shoulder */}
            <img
              src={chatgptIcon}
              alt="ChatGPT"
              className="sm:hidden absolute top-[36%] left-[13%] -translate-x-1/2 -translate-y-1/2 -rotate-[45deg] w-[31%] aspect-square object-contain drop-shadow-md z-10 pointer-events-auto"
            />
            {/* Canva (Mobile) — upper-right / right shoulder */}
            <img
              src={canvaIcon}
              alt="Canva"
              className="sm:hidden absolute top-[35%] right-[6%] -translate-y-1/2 rotate-[22deg] w-[26%] aspect-square object-contain drop-shadow-md z-10 pointer-events-auto"
            />

            {/* ── DESKTOP ONLY: FLOATING ICONS ── */}
            {/* ChatGPT — upper-left */}
            <img
              src={chatgptIcon}
              alt="ChatGPT"
              className="hidden sm:block absolute top-[22%] left-[10%] -translate-y-1/2 w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)] object-contain drop-shadow-md z-10 pointer-events-auto"
            />
            {/* Canva — upper-right */}
            <img
              src={canvaIcon}
              alt="Canva"
              className="hidden sm:block absolute top-[22%] right-[10%] -translate-y-1/2 w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)] object-contain drop-shadow-md z-10 pointer-events-auto"
            />

            {/* ── RESPONSIVE ICONS: PHOTOSHOP & ILLUSTRATOR ── */}
            {/* Photoshop — lower-left, arm/hand region. Pushed further out and larger on mobile. */}
            <img
              src={photoshopIcon}
              alt="Photoshop"
              className="absolute top-[78%] sm:top-[72%] left-[-22%] sm:left-[10%] -translate-y-1/2 -rotate-[80deg]
                         w-[25%] aspect-square sm:w-[clamp(36px,5vw,68px)] sm:h-[clamp(36px,5vw,68px)] sm:aspect-auto
                         object-contain drop-shadow-md z-10 pointer-events-auto"
            />

            {/* Illustrator — lower-right, arm/hand region. Pushed further out and larger on mobile. */}
            <img
              src={illustratorIcon}
              alt="Illustrator"
              className="absolute top-[72%] right-[-22%] sm:right-[10%] -translate-y-1/2 rotate-[78deg]
                         w-[25%] aspect-square sm:w-[clamp(36px,5vw,68px)] sm:h-[clamp(36px,5vw,68px)] sm:aspect-auto
                         object-contain drop-shadow-md z-10 pointer-events-auto"
            />

          </div>

          {/* 
            PLACARD CONTAINER (z-0) 
            Sits behind the portrait base. Large top padding ensures text clears the overlapping photo.
          */}
          <div className="relative z-0 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-[580px] bg-[#DCEBFF] dark:bg-[#2A2410] rounded-[24px] pointer-events-auto flex flex-col items-center justify-end text-center pt-[28%] sm:pt-[22%] lg:pt-[18%] xl:pt-[110px] pb-6 md:pb-8 px-4 sm:px-6 transition-colors duration-300">
            <p className="font-heading font-bold text-[13px] md:text-[14px] text-[#0A3A7A] dark:text-[#FFD722] leading-[1.6]">
              Open For Offline <span className="opacity-50 font-normal mx-0.5">|</span> Hybrid <span className="opacity-50 font-normal mx-0.5">|</span> Online
              <br />
              Freelance <span className="opacity-50 font-normal mx-0.5">|</span> Internships <span className="opacity-50 font-normal mx-0.5">|</span> Job Work
            </p>
            
            <div className="w-[40px] h-[1px] bg-[#0A3A7A]/20 dark:bg-[#FFD722]/20 my-3.5 md:my-4"></div>
            
            <p className="font-body text-[12px] md:text-[13px] text-[#0A3A7A]/75 dark:text-[#FFD722]/75 leading-[1.5]">
              Also open to relocate
              <br />
              <span className="font-semibold text-[#0A3A7A] dark:text-[#FFD722] mt-0.5 inline-block tracking-wide">
                Noida &middot; Delhi &middot; Gurugram
              </span>
            </p>
          </div>

        </div>

      </div>

      {/*
        ── YELLOW MARQUEE STRIP ── Layer z-30 ────────────────────────────────
        On mobile: positioned relative at the bottom of the section (acting as the top boundary of About).
        On desktop: absolute positioned inside Hero.
      */}
      <div className="relative w-full mt-0 mb-[50px] sm:absolute sm:w-auto sm:h-auto sm:mt-0 sm:mb-0 sm:inset-x-0 sm:bottom-[3%] sm:translate-y-0 z-30 pointer-events-none flex flex-col items-center gap-[15px] -rotate-1">
        <div
            className="
              w-[120vw] max-w-none
              bg-[#007BFF]
              flex items-center
              h-[14.5vw] sm:h-[clamp(50px,8.5vw,90px)]
              pointer-events-auto
              overflow-hidden
            "
          >
            <div className="flex w-max shrink-0 motion-safe:animate-marquee-mobile sm:motion-safe:animate-marquee will-change-transform" style={{ animationDirection: 'reverse' }}>
              <MarqueeContent />
              <MarqueeContent ariaHidden={true} />
            </div>
          </div>
            
          {/* DUPLICATE MARQUEE */}
          <div
            className="
              w-[120vw] max-w-none
              bg-[#007BFF]
              flex items-center
              h-[14.5vw] sm:h-[clamp(50px,8.5vw,90px)]
              pointer-events-auto
              overflow-hidden
            "
          >
            <div className="flex w-max shrink-0 motion-safe:animate-marquee-mobile sm:motion-safe:animate-marquee will-change-transform">
              <MarqueeContent />
              <MarqueeContent ariaHidden={true} />
            </div>
          </div>
        </div>
    </section>
  );
}
