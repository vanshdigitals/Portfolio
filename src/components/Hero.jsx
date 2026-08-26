import { Fragment } from 'react';
import chatgptIcon from '../assets/Chatgpt.png';
import canvaIcon from '../assets/Canva.png';
import photoshopIcon from '../assets/Photoshop.png';
import illustratorIcon from '../assets/Ilustrator.png';

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
    className={`flex items-center whitespace-nowrap font-heading font-bold uppercase text-black tracking-wide text-[9vw] sm:text-[clamp(26px,4vw,50px)] ${ariaHidden ? 'motion-reduce:hidden' : ''}`}
  >
    {marqueeItems.map((item, idx) => (
      <Fragment key={idx}>
        <span>{item}</span>
        <svg 
          className="w-[0.8em] h-[0.8em] text-[#0B7FF3] mx-[0.2em] shrink-0" 
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
      className="relative w-full mt-16 lg:mt-24 pt-0 pb-0 flex flex-col items-center justify-start bg-[var(--bg)] text-[var(--text-primary)] border-b border-border transition-colors duration-[320ms] overflow-x-clip"
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
              className="font-furgatorio portfolio-wordmark portfolio-gradient leading-[1.1] m-0 select-none whitespace-nowrap animate-portfolio-init motion-safe:animate-portfolio-flicker"
            >
              PORTFOLIO
            </h1>
          </div>
        </div>

        {/*
          ── PORTRAIT + ICONS ── Layer z-20 ────────────────────────────────────

          TWO-LEVEL WRAPPER PATTERN:

          Outer div  → handles vertical offset from PORTFOLIO so the portrait
                       slides into its correct overlap position. Width here
                       controls the portrait's rendered size.

          Inner div  → `relative` with `w-full` — this becomes the positioning
                       parent for ALL four icons. Icon `top/left/right` percentages
                       are calculated against the portrait IMAGE bounds (not the
                       padded outer div), so icons track portrait anatomy at every
                       breakpoint.

          RESPONSIVE PORTRAIT SIZING:
            mobile  (<640px):  80% of content area — slightly smaller than before
            sm      (640px+):  70%
            md      (768px+):  60%
            lg      (1024px+): 50%
            xl cap:            580px max — prevents infinite growth on large screens

          VERTICAL OFFSET (pt-*):
            Controls how far the portrait slides down beneath PORTFOLIO.
            Smaller values = tighter connection between text and portrait.
        */}
        <div
          className="col-start-1 row-start-1 z-20 pointer-events-none
                     w-[58%] sm:w-[70%] md:w-[60%] lg:w-[50%] max-w-[580px]
                     justify-self-center self-start
                     pt-[18vw] sm:pt-[18vw] md:pt-[18vw] lg:pt-[19vw] xl:pt-[270px]"
        >
          {/* Portrait Container */}
          <div className="relative w-full scale-[1.11] origin-[50%_15%] sm:transform-none">

            {/* Portrait image — renders at natural aspect ratio via h-auto. Width/Height attributes prevent layout shift. */}
            <img
              src="/images/hero-portrait.webp"
              alt="Vansh Gupta"
              width="1377"
              height="2000"
              fetchpriority="high"
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
              className="sm:hidden absolute top-[38%] left-[-10%] -translate-y-1/2 -rotate-45 w-[31%] aspect-square object-contain drop-shadow-md z-10 pointer-events-auto"
            />

            {/* Canva (Mobile) — upper-right / right shoulder */}
            <img
              src={canvaIcon}
              alt="Canva"
              className="sm:hidden absolute top-[35%] right-[6%] -translate-y-1/2 rotate-[22deg] w-[26%] aspect-square object-contain drop-shadow-md z-10 pointer-events-auto"
            />

            {/* AI Text Pills (Mobile) */}
            <div className="sm:hidden absolute top-[60%] left-[-25%] -mt-[4px] z-20 flex flex-col items-start gap-1.5 -translate-y-1/2 rotate-[3deg]">
              <div className="-rotate-[4deg] translate-y-[2px] mb-2 flex items-center justify-center bg-white/95 border border-black/5 shadow-sm rounded-full py-1.5 px-3 whitespace-nowrap">
                <span className="font-heading font-bold text-black text-[10px] leading-none tracking-tight">AI-Assisted</span>
              </div>
              <div className="-ml-2 rotate-[3deg] flex items-center justify-center bg-white/95 border border-black/5 shadow-sm rounded-full py-1.5 px-3 whitespace-nowrap">
                <span className="font-heading font-bold text-black text-[10px] leading-none tracking-tight">Design Workflows</span>
              </div>
            </div>

            {/* Canva Text Pills (Mobile) */}
            <div className="sm:hidden absolute top-[52%] right-[-25%] z-20 flex flex-col items-end gap-[2px] -translate-y-1/2 -rotate-[3deg]">
              <div className="rotate-[43deg] -mt-2 flex items-center justify-center bg-white/95 border border-black/5 shadow-sm rounded-full py-1.5 px-3 whitespace-nowrap">
                <span className="font-heading font-bold text-black text-[10px] leading-none tracking-tight">Canva Experienced</span>
              </div>
              <div className="rotate-[6deg] mr-6 flex items-center justify-center bg-white/95 border border-black/5 shadow-sm rounded-full py-1.5 px-3 whitespace-nowrap">
                <span className="font-heading font-bold text-black text-[10px] leading-none tracking-tight">3+ Yrs</span>
              </div>
            </div>

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
        </div>

        {/*
          ── YELLOW MARQUEE STRIP ── Layer z-30 ────────────────────────────────
          Sits above portrait (z-20) at the bottom of the composition.
          
          h-[clamp(50px,8.5vw,90px)]:
            min 50px (was 44px) — thicker on mobile for better readability
            scale 8.5vw on tablet/desktop
            max 90px for large screens
        */}
        <div className="absolute inset-x-0 bottom-[3%] translate-y-[28px] sm:translate-y-0 z-30 pointer-events-none">
          <div
            className="
              absolute left-1/2 -translate-x-1/2
              w-[120vw] max-w-none
              rotate-3
              bg-[#FFD722]
              flex items-center
              h-[14.5vw] sm:h-[clamp(50px,8.5vw,90px)]
              mt-[1.2vw] sm:mt-0
              border-y-2 border-black
              pointer-events-auto
              overflow-hidden
            "
          >
            <div className="flex w-max shrink-0 motion-safe:animate-marquee">
              <MarqueeContent />
              <MarqueeContent ariaHidden={true} />
            </div>
          </div>
            
          {/* DUPLICATE MARQUEE (-6deg, normal, shifted down more, reversed direction) */}
          <div
            className="
              absolute left-1/2 -translate-x-1/2 top-[14.5vw]
              w-[120vw] max-w-none
              -rotate-[6deg]
              bg-[#FFD722]
              flex items-center
              h-[14.5vw] sm:h-[clamp(50px,8.5vw,90px)]
              mt-[1.2vw] sm:mt-0
              border-y-2 border-black
              pointer-events-auto
              overflow-hidden
            "
          >
            <div className="flex w-max shrink-0 motion-safe:animate-marquee" style={{ animationDirection: 'reverse' }}>
              <MarqueeContent />
              <MarqueeContent ariaHidden={true} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
