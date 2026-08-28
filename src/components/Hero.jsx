import { Fragment, useState, useEffect } from 'react';
import chatgptIcon from '../assets/chatgpt-icon.png';
import canvaIcon from '../assets/canva-icon.png';
import photoshopIcon from '../assets/photoshop-icon.png';
import illustratorIcon from '../assets/illustrator-icon.png';

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

const defaultPills = [
  { id: 'ai-assisted', content: 'AI-Assisted', x: 101.75, y: 46.36, rotation: -11 },
  { id: 'design-workflows', content: 'Design Workflows', x: 1.68, y: 63.92, rotation: 3 },
  { id: 'canva-experienced', content: 'Canva Experienced', x: 94.55, y: 59.19, rotation: 0 },
  { id: '5-brands', content: '5+ BRANDS', x: 1.03, y: 50.19, rotation: 10 },
  { id: 'internships', content: 'OPEN TO INTERNSHIPS', x: 49.1, y: 89.14, rotation: 0 },
  { id: 'chatgpt-icon', type: 'image', content: chatgptIcon, x: 12.8, y: 36.23, rotation: -45, width: 31 }
];

const DraggableTextPill = ({ pill, isEditMode, onUpdate, isSelected, onSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handlePointerDown = (e) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect(pill.id);
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !isEditMode) return;
    
    const container = e.target.closest('.badge-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    const newY = ((e.clientY - rect.top) / rect.height) * 100;
    
    onUpdate(pill.id, {
      x: Number(newX.toFixed(2)),
      y: Number(newY.toFixed(2))
    });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`sm:hidden absolute z-20 flex items-center justify-center whitespace-nowrap ${
        pill.type === 'image' ? '' : 'bg-white/95 border border-black/5 shadow-sm rounded-full py-1.5 px-3'
      } ${isEditMode ? 'cursor-move touch-none ring-1 ring-blue-500/50 hover:ring-2 hover:ring-blue-500 pointer-events-auto' : 'pointer-events-none'}`}
      style={{
        left: `${pill.x}%`,
        top: `${pill.y}%`,
        transform: `translate(-50%, -50%) rotate(${pill.rotation}deg)`,
        width: pill.type === 'image' ? `${pill.width}%` : 'auto'
      }}
    >
      {pill.type === 'image' ? (
        <img src={pill.content} alt={pill.id} className="w-full aspect-square object-contain drop-shadow-md pointer-events-none" draggable={false} />
      ) : (
        <span className="font-heading font-bold text-black text-[10px] leading-none tracking-tight">
          {pill.content}
        </span>
      )}
      {isEditMode && isSelected && (
        <div className="absolute top-[120%] left-1/2 -translate-x-1/2 mt-2 bg-black/90 text-white text-[10px] p-2 rounded shadow-xl pointer-events-auto flex flex-col gap-2 z-50 cursor-default">
          <div className="text-center font-heading font-normal opacity-80 border-b border-white/20 pb-1">
            x:{pill.x} y:{pill.y} r:{pill.rotation}° {pill.type === 'image' && `w:${pill.width}%`}
          </div>
          <div className="flex gap-2 justify-center">
            {pill.type === 'image' && (
              <>
                <button 
                  onPointerDown={(e) => { e.stopPropagation(); onUpdate(pill.id, { width: Math.max(5, pill.width - 2) }); }}
                  className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded font-bold"
                >
                  -
                </button>
                <button 
                  onPointerDown={(e) => { e.stopPropagation(); onUpdate(pill.id, { width: pill.width + 2 }); }}
                  className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded font-bold"
                >
                  +
                </button>
              </>
            )}
            <button 
              onPointerDown={(e) => { e.stopPropagation(); onUpdate(pill.id, { rotation: pill.rotation - 5 }); }}
              className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded"
            >
              ↺ -5°
            </button>
            <button 
              onPointerDown={(e) => { e.stopPropagation(); onUpdate(pill.id, { rotation: pill.rotation + 5 }); }}
              className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded"
            >
              ↻ +5°
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Hero() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPillId, setSelectedPillId] = useState(null);
  const [pills, setPills] = useState(defaultPills);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const saved = localStorage.getItem('heroTextPillsConfigV4');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const merged = defaultPills.map(def => {
            const found = parsed.find(p => p.id === def.id);
            return found ? { ...def, x: found.x, y: found.y, rotation: found.rotation, ...(found.width && {width: found.width}) } : def;
          });
          setPills(merged);
        } catch (e) {
          console.error("Failed to parse saved pills", e);
        }
      }
    }
  }, []);

  const handleUpdatePill = (id, updates) => {
    setPills(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      if (import.meta.env.DEV) {
        localStorage.setItem('heroTextPillsConfigV4', JSON.stringify(next));
      }
      return next;
    });
  };

  const handleExport = () => {
    const cleanData = pills.map(({ id, x, y, rotation, width }) => ({ id, x, y, rotation, ...(width && {width}) }));
    const json = JSON.stringify(cleanData, null, 2);
    console.log("=== HERO TEXT PILLS EXPORT ===");
    console.log(json);
    navigator.clipboard.writeText(json).then(() => {
      alert("Copied to clipboard! Paste this into the defaultPills array.");
    });
  };

  return (
    <section 
      id="hero" 
      className="relative w-full mt-16 lg:mt-24 pt-0 pb-0 flex flex-col items-center justify-start bg-[var(--bg)] text-[var(--text-primary)] border-b border-hairline transition-colors duration-[320ms] overflow-x-clip"
      style={{ scrollMarginTop: 'var(--header-h, 64px)' }}
    >
      {import.meta.env.DEV && (
        <div className="absolute top-4 left-4 z-50 flex gap-2">
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-1.5 text-xs font-bold rounded ${isEditMode ? 'bg-blue-600 text-white' : 'bg-white/80 text-black border border-black/10'}`}
          >
            {isEditMode ? 'Finish Editing Pills' : 'Edit Text Pills'}
          </button>
          {isEditMode && (
            <button 
              onClick={handleExport}
              className="px-3 py-1.5 text-xs font-bold rounded bg-green-600 text-white"
            >
              Export JSON
            </button>
          )}
        </div>
      )}

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
          <div className="relative w-full scale-[1.11] origin-[50%_15%] sm:transform-none badge-container">

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
            {/* Canva (Mobile) — upper-right / right shoulder */}
            <img
              src={canvaIcon}
              alt="Canva"
              className="sm:hidden absolute top-[35%] right-[6%] -translate-y-1/2 rotate-[22deg] w-[26%] aspect-square object-contain drop-shadow-md z-10 pointer-events-auto"
            />

            {/* MOBILE TEXT PILLS (DRAGGABLE IN DEV) */}
            {pills.map(pill => (
              <DraggableTextPill 
                key={pill.id} 
                pill={pill} 
                isEditMode={isEditMode} 
                onUpdate={handleUpdatePill} 
                isSelected={selectedPillId === pill.id}
                onSelect={setSelectedPillId}
              />
            ))}

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

      </div>

      {/*
        ── YELLOW MARQUEE STRIP ── Layer z-30 ────────────────────────────────
        On mobile: positioned relative at the bottom of the section (acting as the top boundary of About).
        On desktop: absolute positioned inside Hero.
      */}
      <div className="relative w-full h-[29vw] mt-12 mb-[50px] sm:absolute sm:w-auto sm:h-auto sm:mt-0 sm:mb-0 sm:inset-x-0 sm:bottom-[3%] sm:translate-y-0 z-30 pointer-events-none">
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
            <div className="flex w-max shrink-0 motion-safe:animate-marquee will-change-transform">
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
            <div className="flex w-max shrink-0 motion-safe:animate-marquee will-change-transform" style={{ animationDirection: 'reverse' }}>
              <MarqueeContent />
              <MarqueeContent ariaHidden={true} />
            </div>
          </div>
        </div>
    </section>
  );
}
