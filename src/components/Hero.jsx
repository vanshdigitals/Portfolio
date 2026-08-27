import React, { Fragment, useState, useEffect, useRef } from 'react';
import chatgptIcon from '../assets/Chatgpt.png';
import canvaIcon from '../assets/Canva.png';
import photoshopIcon from '../assets/Photoshop.png';
import illustratorIcon from '../assets/Ilustrator.png';

// ── MARQUEE CONTENT ──────────────────────────────────────────────────────────
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

// ── BADGE DATA ───────────────────────────────────────────────────────────────
const defaultBadges = [
  // MOBILE ICONS
  {
    id: 'chatgpt-mobile',
    type: 'image',
    content: chatgptIcon,
    x: 5, y: 38, rotation: -45,
    visibility: 'sm:hidden',
    className: 'w-[31%] aspect-square object-contain drop-shadow-md'
  },
  {
    id: 'canva-mobile',
    type: 'image',
    content: canvaIcon,
    x: 81, y: 35, rotation: 22,
    visibility: 'sm:hidden',
    className: 'w-[26%] aspect-square object-contain drop-shadow-md'
  },
  {
    id: 'photoshop-mobile',
    type: 'image',
    content: photoshopIcon,
    x: -9, y: 78, rotation: -80,
    visibility: 'sm:hidden',
    className: 'w-[25%] aspect-square object-contain drop-shadow-md'
  },
  {
    id: 'illustrator-mobile',
    type: 'image',
    content: illustratorIcon,
    x: 109, y: 72, rotation: 78,
    visibility: 'sm:hidden',
    className: 'w-[25%] aspect-square object-contain drop-shadow-md'
  },
  // MOBILE TEXT PILLS
  {
    id: 'ai-assisted-mobile',
    type: 'text',
    content: 'AI-Assisted',
    x: -12, y: 55, rotation: -1,
    visibility: 'sm:hidden',
    className: 'bg-white/95 border border-black/5 shadow-sm rounded-full py-1.5 px-3 whitespace-nowrap font-heading font-bold text-black text-[10px] leading-none tracking-tight'
  },
  {
    id: 'design-workflows-mobile',
    type: 'text',
    content: 'Design Workflows',
    x: -15, y: 62, rotation: 0,
    visibility: 'sm:hidden',
    className: 'bg-white/95 border border-black/5 shadow-sm rounded-full py-1.5 px-3 whitespace-nowrap font-heading font-bold text-black text-[10px] leading-none tracking-tight'
  },
  {
    id: 'canva-experienced-mobile',
    type: 'text',
    content: 'Canva Experienced',
    x: 110, y: 47, rotation: 40,
    visibility: 'sm:hidden',
    className: 'bg-white/95 border border-black/5 shadow-sm rounded-full py-1.5 px-3 whitespace-nowrap font-heading font-bold text-black text-[10px] leading-none tracking-tight'
  },
  {
    id: '3-yrs-mobile',
    type: 'text',
    content: '3+ Yrs',
    x: 105, y: 55, rotation: 3,
    visibility: 'sm:hidden',
    className: 'bg-white/95 border border-black/5 shadow-sm rounded-full py-1.5 px-3 whitespace-nowrap font-heading font-bold text-black text-[10px] leading-none tracking-tight'
  },
  // DESKTOP ICONS
  {
    id: 'chatgpt-desktop',
    type: 'image',
    content: chatgptIcon,
    x: 15, y: 22, rotation: 0,
    visibility: 'hidden sm:block',
    className: 'w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)] object-contain drop-shadow-md'
  },
  {
    id: 'canva-desktop',
    type: 'image',
    content: canvaIcon,
    x: 85, y: 22, rotation: 0,
    visibility: 'hidden sm:block',
    className: 'w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)] object-contain drop-shadow-md'
  },
  {
    id: 'photoshop-desktop',
    type: 'image',
    content: photoshopIcon,
    x: 15, y: 72, rotation: -80,
    visibility: 'hidden sm:block',
    className: 'w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)] object-contain drop-shadow-md'
  },
  {
    id: 'illustrator-desktop',
    type: 'image',
    content: illustratorIcon,
    x: 85, y: 72, rotation: 78,
    visibility: 'hidden sm:block',
    className: 'w-[clamp(36px,5vw,68px)] h-[clamp(36px,5vw,68px)] object-contain drop-shadow-md'
  }
];

// ── DRAGGABLE BADGE COMPONENT ────────────────────────────────────────────────
const DraggableBadge = ({ badge, isEditMode, onUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  
  const handlePointerDown = (e) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !isEditMode) return;
    
    // Find the portrait container (parent of all badges)
    const container = e.target.closest('.badge-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    
    // Calculate new percentages
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    const newY = ((e.clientY - rect.top) / rect.height) * 100;
    
    onUpdate(badge.id, {
      x: Number(newX.toFixed(2)),
      y: Number(newY.toFixed(2))
    });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  const handleWheel = (e) => {
    if (!isEditMode) return;
    e.preventDefault();
    // Adjust rotation by 1 degree per tick
    const delta = Math.sign(e.deltaY) * 1;
    onUpdate(badge.id, { rotation: badge.rotation + delta });
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      className={`absolute z-20 ${badge.visibility} ${isEditMode ? 'cursor-move touch-none ring-1 ring-blue-500/50 hover:ring-2 hover:ring-blue-500' : 'pointer-events-none'}`}
      style={{
        left: `${badge.x}%`,
        top: `${badge.y}%`,
        transform: `translate(-50%, -50%) rotate(${badge.rotation}deg)`,
        // In prod, let the normal float animation run on the parent container if needed, 
        // but since these had `pointer-events-auto` originally we preserve that if needed
        pointerEvents: isEditMode ? 'auto' : 'none'
      }}
    >
      {badge.type === 'image' ? (
        <img src={badge.content} alt={badge.id} className={badge.className} draggable={false} />
      ) : (
        <div className={badge.className}>
          {badge.content}
        </div>
      )}
      
      {/* Dev Tooltip */}
      {isEditMode && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-50">
          x:{badge.x} y:{badge.y} r:{badge.rotation}°
        </div>
      )}
    </div>
  );
};

// ── HERO COMPONENT ───────────────────────────────────────────────────────────
export default function Hero() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [badges, setBadges] = useState(defaultBadges);

  // Load from localStorage in DEV
  useEffect(() => {
    if (import.meta.env.DEV) {
      const saved = localStorage.getItem('heroBadgesConfig');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Merge with defaults in case we added new ones
          const merged = defaultBadges.map(defBadge => {
            const found = parsed.find(b => b.id === defBadge.id);
            return found ? { ...defBadge, x: found.x, y: found.y, rotation: found.rotation } : defBadge;
          });
          setBadges(merged);
        } catch (e) {
          console.error("Failed to parse saved badges", e);
        }
      }
    }
  }, []);

  const handleUpdateBadge = (id, updates) => {
    setBadges(prev => {
      const next = prev.map(b => b.id === id ? { ...b, ...updates } : b);
      if (import.meta.env.DEV) {
        localStorage.setItem('heroBadgesConfig', JSON.stringify(next));
      }
      return next;
    });
  };

  const handleExport = () => {
    const cleanData = badges.map(({ id, x, y, rotation }) => ({ id, x, y, rotation }));
    const json = JSON.stringify(cleanData, null, 2);
    console.log("=== HERO BADGES EXPORT ===");
    console.log(json);
    navigator.clipboard.writeText(json).then(() => {
      alert("Copied to clipboard! Paste this into the defaultBadges array to lock positions.");
    });
  };

  return (
    <section 
      id="hero" 
      className="relative w-full mt-16 lg:mt-24 pt-0 pb-0 flex flex-col items-center justify-start bg-[var(--bg)] text-[var(--text-primary)] border-b border-border transition-colors duration-[320ms] overflow-x-clip"
      style={{ scrollMarginTop: 'var(--header-h, 64px)' }}
    >
      {import.meta.env.DEV && (
        <div className="absolute top-4 left-4 z-50 flex gap-2">
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-1.5 text-xs font-bold rounded ${isEditMode ? 'bg-blue-600 text-white' : 'bg-white/80 text-black border border-black/10'}`}
          >
            {isEditMode ? 'Finish Editing Layout' : 'Edit Hero Layout'}
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

      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 grid grid-cols-1 items-start isolate">
        
        {/* PORTFOLIO WORDMARK */}
        <div className="col-start-1 row-start-1 z-10 w-full justify-self-center self-start flex justify-center">
          <div style={{ transform: 'translateX(0.8%)' }}>
            <h1 className="font-furgatorio portfolio-wordmark portfolio-gradient leading-[1.1] m-0 select-none whitespace-nowrap animate-portfolio-init motion-safe:animate-portfolio-flicker">
              PORTFOLIO
            </h1>
          </div>
        </div>

        {/* PORTRAIT + ICONS */}
        <div
          className="col-start-1 row-start-1 z-20 pointer-events-none
                     w-[58%] sm:w-[70%] md:w-[60%] lg:w-[50%] max-w-[580px]
                     justify-self-center self-start
                     pt-[18vw] sm:pt-[18vw] md:pt-[18vw] lg:pt-[19vw] xl:pt-[270px]"
        >
          {/* Portrait Container - ADDED badge-container class for bounds tracking */}
          <div className="relative w-full scale-[1.11] origin-[50%_15%] sm:transform-none badge-container">
            <img
              src="/images/hero-portrait.webp"
              alt="Vansh Gupta"
              width="1377"
              height="2000"
              fetchpriority="high"
              className="w-full h-auto object-contain block select-none pointer-events-none"
              draggable="false"
            />

            {/* DYNAMIC BADGES */}
            {badges.map((badge) => (
              <DraggableBadge 
                key={badge.id}
                badge={badge} 
                isEditMode={isEditMode} 
                onUpdate={handleUpdateBadge} 
              />
            ))}
          </div>
        </div>

        {/* YELLOW MARQUEE STRIP */}
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
            
          {/* DUPLICATE MARQUEE */}
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
