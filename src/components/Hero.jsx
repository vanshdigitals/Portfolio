import portrait from '../assets/New Profile Icon DP.png';
import chatgptIcon from '../assets/Chatgpt.png';
import canvaIcon from '../assets/Canva.png';
import photoshopIcon from '../assets/Photoshop.png';
import illustratorIcon from '../assets/Ilustrator.png';

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
                     w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] max-w-[580px]
                     justify-self-center self-start
                     pt-[25vw] sm:pt-[20vw] md:pt-[17vw] lg:pt-[13vw] xl:pt-[190px]"
        >
          {/* Inner: the true positioning context for icons */}
          <div className="relative w-full">

            {/* Portrait image — renders at natural aspect ratio via h-auto */}
            <img
              src={portrait}
              alt="Vansh Gupta"
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

            {/* ChatGPT — upper-left, shoulder/head region */}
            <img
              src={chatgptIcon}
              alt="ChatGPT"
              className="absolute top-[22%] left-[10%] -translate-y-1/2
                         w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)]
                         object-contain drop-shadow-md z-10 pointer-events-auto"
            />

            {/* Canva — upper-right, shoulder/head region */}
            <img
              src={canvaIcon}
              alt="Canva"
              className="absolute top-[22%] right-[10%] -translate-y-1/2
                         w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)]
                         object-contain drop-shadow-md z-10 pointer-events-auto"
            />

            {/* Photoshop — lower-left, arm/hand region */}
            <img
              src={photoshopIcon}
              alt="Photoshop"
              className="absolute top-[72%] left-[10%] -translate-y-1/2
                         w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)]
                         object-contain drop-shadow-md z-10 pointer-events-auto"
            />

            {/* Illustrator — lower-right, arm/hand region */}
            <img
              src={illustratorIcon}
              alt="Illustrator"
              className="absolute top-[72%] right-[10%] -translate-y-1/2
                         w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)]
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
        <div className="absolute inset-x-0 bottom-[3%] z-30 pointer-events-none">
          <div
            className="
              absolute left-1/2 -translate-x-1/2
              w-[120vw] max-w-none
              rotate-3
              bg-[#FFD722]
              flex items-center
              h-[clamp(50px,8.5vw,90px)]
              pointer-events-auto
              overflow-hidden
            "
          >
            <div className="flex w-max shrink-0 motion-safe:animate-marquee">
              <span
                className="
                  whitespace-nowrap
                  font-heading font-bold uppercase
                  text-black
                  tracking-wide
                  text-[clamp(24px,3.5vw,46px)]
                  px-4
                "
              >
                SOCIAL MEDIA DESIGN • CAROUSEL DESIGN • POST DESIGN • REEL COVERS • HIGHLIGHT COVERS • POSTERS • SOCIAL MEDIA BRANDING • 
              </span>
              <span
                aria-hidden="true"
                className="
                  motion-reduce:hidden
                  whitespace-nowrap
                  font-heading font-bold uppercase
                  text-black
                  tracking-wide
                  text-[clamp(24px,3.5vw,46px)]
                  px-4
                "
              >
                SOCIAL MEDIA DESIGN • CAROUSEL DESIGN • POST DESIGN • REEL COVERS • HIGHLIGHT COVERS • POSTERS • SOCIAL MEDIA BRANDING • 
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
