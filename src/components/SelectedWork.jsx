import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import WorkMediaCard, { getCardWidthClass } from './WorkMediaCard';
import { PROJECTS, getDeliverablesString } from '../data/projects';

// Inner Carousel Component (Supports multi-slide carousels on all screen sizes)
export function ProjectInnerCarousel({ carousel, index, onSequenceComplete, prefersReducedMotion }) {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // 1:1 finger tracking active
  const [dragOffset, setDragOffset] = useState(0);      // live px offset during drag

  const interactionTimeoutRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  // Intersection observer to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries[0].isIntersecting);
    }, {
      threshold: 0.6 // Card must be 60% visible to autoplay
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Handle manual interaction to pause autoplay
  const handleInteraction = useCallback(() => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 5000); // Resume autoplay after 5 seconds idle
  }, []);

  const goToSlide = useCallback((idx) => {
    if (isTransitioning) return; // lock gesture during transition
    if (idx < 0 || idx >= carousel.slides.length) return;
    
    handleInteraction();
    setActiveSlide(idx);
    
    // Lock interactions while CSS transition plays
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // match snap transition duration
  }, [isTransitioning, carousel.slides?.length, handleInteraction]);

  // Touch Handlers — 1:1 finger tracking, decide target only on release
  const SWIPE_THRESHOLD = 50; // px of horizontal travel to advance exactly one slide

  const handleTouchStart = (e) => {
    handleInteraction();
    if (isTransitioning) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchMove = (e) => {
    if (isTransitioning) return;
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;
    // Engage horizontal drag only when the gesture is primarily horizontal
    // (lets vertical page scrolling pass through untouched).
    if (!isDragging && Math.abs(dx) <= Math.abs(dy)) return;
    if (!isDragging) setIsDragging(true);
    setDragOffset(dx); // track follows finger 1:1
  };

  const handleTouchEnd = () => {
    if (isTransitioning) return;
    const dx = dragOffset;
    setIsDragging(false);
    setDragOffset(0); // release drag; goToSlide/return snaps with ease-out
    // One intentional swipe = exactly one slide, regardless of velocity/length.
    if (dx <= -SWIPE_THRESHOLD) {
      goToSlide(activeSlide + 1); // dragged left -> next
    } else if (dx >= SWIPE_THRESHOLD) {
      goToSlide(activeSlide - 1); // dragged right -> prev
    }
  };

  // Autoplay Effect
  useEffect(() => {
    if (prefersReducedMotion || !isVisible || isInteracting || !carousel.slides) return;

    const timer = setTimeout(() => {
      if (activeSlide < carousel.slides.length - 1) {
        setActiveSlide(activeSlide + 1);
      } else {
        if (onSequenceComplete) onSequenceComplete();
      }
    }, 3000); // Hold for 3 seconds

    return () => clearTimeout(timer);
  }, [activeSlide, isVisible, isInteracting, prefersReducedMotion, carousel.slides?.length, onSequenceComplete]);

  const ratio = carousel.aspect?.replace('aspect-[', '')?.replace(']', '') ?? '4/5';

  return (
    <div
      ref={containerRef}
      className={`snap-start shrink-0 relative flex flex-col group/card h-full ${getCardWidthClass(ratio)}`}
      onTouchStart={handleInteraction}
    >
      <WorkMediaCard
        className="w-full"
        ratio={ratio}
        type={carousel.label || "Carousel"}
        title={carousel.title}
        media={carousel.slides}
        controls={
          <>
            <div className="font-heading font-medium text-[11px] text-text-muted tracking-widest pl-1">
              {String(activeSlide + 1).padStart(2, '0')} / {String(carousel.slides?.length || 0).padStart(2, '0')}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goToSlide(activeSlide - 1)}
                disabled={activeSlide === 0 || isTransitioning}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-bg border border-border/60 text-text-primary disabled:opacity-30 transition-opacity hover:border-border"
                aria-label="Previous slide"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={() => goToSlide(activeSlide + 1)}
                disabled={activeSlide === (carousel.slides?.length || 1) - 1 || isTransitioning}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-bg border border-border/60 text-text-primary disabled:opacity-30 transition-opacity hover:border-border"
                aria-label="Next slide"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </>
        }
      >
        {/* Swipable media track */}
        <div
          className="absolute inset-0 w-full h-full touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex w-full h-full ${!prefersReducedMotion && !isDragging ? 'transition-transform duration-[300ms] ease-[cubic-bezier(.22,1,.36,1)]' : ''}`}
            style={{ transform: `translateX(calc(${activeSlide * -100}% + ${dragOffset}px))` }}
          >
            {carousel.slides?.map((slide, i) => (
              <div key={i} className="w-full h-full shrink-0 relative">
                <img
                  src={slide}
                  alt={`${carousel.title} slide ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </WorkMediaCard>
    </div>
  );
}

export function ProjectStaticCard({ image, title, type, ratio }) {
  return (
    <div className={`snap-start shrink-0 relative flex flex-col group/card h-full ${getCardWidthClass(ratio)}`}>
      <WorkMediaCard className="w-full" ratio={ratio} type={type} title={title} media={[image]}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </WorkMediaCard>
    </div>
  );
}

// Track component for each collection (carousels, posters, reel covers, highlight covers)
function ProjectCollectionTrack({ collection, prefersReducedMotion, isSubsection = false }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (!el) return;
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll, collection.items]);

  const scrollTrack = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = Math.max(300, trackRef.current.clientWidth * 0.7);
    trackRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Collection Header Row */}
      <div className="flex items-center justify-between">
        <p className={isSubsection 
          ? "font-heading text-[10.5px] sm:text-[11px] font-semibold text-text-muted uppercase tracking-[0.14em] pl-1"
          : "font-heading text-[11px] sm:text-xs font-bold text-text-primary uppercase tracking-[0.2em] pl-1 opacity-80"
        }>
          {collection.title}
        </p>
        {collection.items && collection.items.length > 1 && (
          <div className={`hidden sm:flex items-center gap-1.5 ${!canScrollLeft && !canScrollRight ? 'xl:hidden' : ''}`} aria-label={`${collection.title} navigation`}>
            <button
              type="button"
              onClick={() => scrollTrack(-1)}
              disabled={!canScrollLeft}
              className="w-7 h-7 rounded-full border border-border/60 bg-surface flex items-center justify-center text-text-muted hover:text-text-primary disabled:opacity-25 disabled:pointer-events-none transition-all hover:border-border cursor-pointer"
              aria-label={`Previous ${collection.title} item`}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(1)}
              disabled={!canScrollRight}
              className="w-7 h-7 rounded-full border border-border/60 bg-surface flex items-center justify-center text-text-muted hover:text-text-primary disabled:opacity-25 disabled:pointer-events-none transition-all hover:border-border cursor-pointer"
              aria-label={`Next ${collection.title} item`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Track Container */}
      <div className="relative -mx-4 px-4 sm:-mx-5 sm:px-5 md:mx-0 md:px-0">
        <div
          ref={trackRef}
          onScroll={checkScroll}
          className="relative flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {collection.items && collection.items.map((item, idx) => {
            if (collection.type === 'Carousel') {
              return (
                <ProjectInnerCarousel 
                  key={item.id || idx} 
                  carousel={item} 
                  index={idx} 
                  prefersReducedMotion={prefersReducedMotion}
                />
              );
            } else {
              const ratio = item.aspect?.replace('aspect-[', '')?.replace(']', '') ?? '1/1';
              return (
                <ProjectStaticCard 
                  key={`${collection.title}-${idx}`} 
                  image={item.url} 
                  title={item.title || item.label}
                  type={item.label || collection.title}
                  ratio={ratio}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

// Wrapper to handle single collection tracks or section groups with multiple horizontal rows
function ProjectCollectionSection({ collection, prefersReducedMotion }) {
  if (collection.subsections && collection.subsections.length > 0) {
    return (
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Main Section Header (e.g. CAROUSELS) */}
        <p className="font-heading text-[11px] sm:text-xs font-bold text-text-primary uppercase tracking-[0.2em] pl-1 opacity-80">
          {collection.title}
        </p>

        {/* Subsections: SET 1, SET 2 with breathing room */}
        <div className="flex flex-col gap-7 sm:gap-8 md:gap-9">
          {collection.subsections.map((sub, sIdx) => (
            <ProjectCollectionTrack
              key={sIdx}
              collection={sub}
              prefersReducedMotion={prefersReducedMotion}
              isSubsection={true}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <ProjectCollectionTrack
      collection={collection}
      prefersReducedMotion={prefersReducedMotion}
    />
  );
}

const ASSET_SECTION_CONFIG = {
  carousels: { title: 'Carousels', type: 'Carousel' },
  reelCovers: { title: 'Reel Covers', type: 'Static' },
  festivalOffers: { title: 'Combo / Festival Offers', type: 'Static' },
  storyCovers: { title: 'Story Covers', type: 'Static' },
  branding: { title: 'Branding', type: 'Static' },
  posters: { title: 'Posters', type: 'Static' },
  festivalCreatives: { title: 'Festival Creatives', type: 'Static' },
  highlightCovers: { title: 'Highlight Covers', type: 'Static' }
};

// Reusable component for each project node
function ProjectNode({ project, index }) {
  const nodeRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Track this specific node's intersection
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start center", "center center"]
  });
  
  // When the node reaches the center of the viewport, it becomes active
  const ringColor = useTransform(scrollYProgress, [0.8, 1], ["rgba(255, 215, 34, 0)", "rgba(0, 123, 255, 0.3)"]);
  const numberColor = useTransform(scrollYProgress, [0.8, 1], ["#000000", "#007BFF"]);
  const numberScale = useTransform(scrollYProgress, [0.8, 1], [1, 1.05]);
  const nodeBoxShadow = useTransform(scrollYProgress, [0.8, 1], ["0 0 0px rgba(0,123,255,0)", "0 0 8px rgba(0,123,255,0.4)"]);

  const getAssetCollections = (assets) => {
    const collections = [];
    if (!assets) return collections;
    Object.keys(assets).forEach((key) => {
      const config = ASSET_SECTION_CONFIG[key];
      if (config && assets[key] !== undefined) {
        const val = assets[key];
        // Support section grouped into multiple sets (e.g. Cuts & Curves SET 1, SET 2, and DARK THEMED)
        if (val && typeof val === 'object' && !Array.isArray(val) && (val.set1 || val.set2 || val.dark)) {
          const subsections = [];
          if (val.set1) {
            subsections.push({
              title: key === 'reelCovers' ? 'REEL COVERS — SET 1' : 'LIGHT THEMED CAROUSELS — SET 1',
              items: val.set1 || [],
              type: config.type
            });
          }
          if (val.set2) {
            subsections.push({
              title: key === 'reelCovers' ? 'REEL COVERS — SET 2' : 'LIGHT THEMED CAROUSELS — SET 2',
              items: val.set2 || [],
              type: config.type
            });
          }
          if (val.dark) {
            subsections.push({
              title: 'DARK THEMED CAROUSELS',
              items: val.dark || [],
              type: config.type
            });
          }
          collections.push({
            title: config.title,
            type: config.type,
            subsections
          });
        } else {
          collections.push({
            title: config.title,
            items: val || [],
            type: config.type
          });
        }
      }
    });
    return collections;
  };

  const collections = getAssetCollections(project.assets);
  const deliverablesPills = getDeliverablesString(project.assets).split(' · ');

  return (
    <div ref={nodeRef} className="relative group z-10 pl-[46px] sm:pl-[54px] md:pl-[68px] lg:pl-[76px]">
      
      {/* --- TIMELINE NUMBERED CIRCLE (Centered on timeline rail across all viewports) --- */}
      <motion.div 
        className="absolute left-[18px] sm:left-[22px] md:left-[26px] lg:left-[30px] -translate-x-1/2 top-0.5 sm:top-1 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#FFD722] shadow-sm flex items-center justify-center z-10 origin-center select-none"
        style={prefersReducedMotion ? {} : { boxShadow: nodeBoxShadow }}
      >
        {/* Subtle animated ring on active */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2" 
          style={prefersReducedMotion ? { borderColor: 'transparent' } : { borderColor: ringColor }}
        />
        <motion.span 
          className="font-sans text-[13px] sm:text-[14px] md:text-[15px] font-bold tracking-tight"
          style={prefersReducedMotion ? { color: '#000000' } : { color: numberColor, scale: numberScale }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </motion.div>

      {/* --- PROJECT CONTENT --- */}
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Brand Meta */}
        <div>
          {/* Brand title — primary identifier */}
          <h4 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary leading-tight">
            {project.name}
          </h4>
          {/* Metadata — secondary */}
          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 font-heading font-normal text-[13px] sm:text-sm text-text-muted mt-2 md:mt-2.5">
            {project.role && <span>{project.role}</span>}
            {project.role && <span className="opacity-40">&middot;</span>}
            {project.date && <span>{project.date}</span>}
            {project.date && <span className="opacity-40">&middot;</span>}
            <span className="text-text-secondary">{project.category}</span>
          </div>
          {/* Description — before pills */}
          {project.detail && (
            <p className="font-body text-[13px] sm:text-sm md:text-[15px] leading-relaxed text-text-secondary max-w-[680px] lg:max-w-[820px] mt-3.5 md:mt-4">
              {project.detail}
            </p>
          )}
          {/* Deliverable Chips — dynamic counts derived from assets */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-5">
            {deliverablesPills.map((chip, idx) => (
              <span key={idx} className="px-3 py-1 text-xs font-body capitalize text-text-secondary border border-border/80 rounded-full bg-transparent">
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Responsive Carousel & Media Collections Track (All Viewports) */}
        <div className="relative mt-1 md:mt-2">
          <div className="flex flex-col gap-8 md:gap-10">
            {collections.map((collection, cIdx) => (
              <ProjectCollectionSection
                key={cIdx}
                collection={collection}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Track entire timeline for the laser beam
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.5 });
  
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-[30px] md:mb-16">
        <div className="mb-4 md:mb-3 flex">
          <h3 className="
            inline-flex items-center justify-center rounded-full
            bg-[#007BFF] text-white px-3.5 py-1.5 font-sans text-xs font-bold tracking-wider
            md:bg-transparent md:text-[#007BFF] md:dark:text-[#FFD722] md:p-0 md:font-heading font-normal md:text-sm md:tracking-[0.1em] md:rounded-none
          ">
            01 &middot; SELECTED WORK
          </h3>
        </div>
        <p className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-2 md:mb-3">
          Client & Signature Work
        </p>
        <p className="font-body text-sm md:text-base leading-relaxed text-text-secondary max-w-[640px] lg:max-w-[780px]">
          A curated selection of visual work exploring social media design, carousel systems, brand visuals, and digital content. Each project reflects a practical, detail-focused approach to turning ideas into clear, engaging visual communication.
        </p>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative z-0 pb-16 space-y-20 sm:space-y-24 md:space-y-28 lg:space-y-32">
        
        {/* --- CONTINUOUS TIMELINE RAIL & LASER (All Viewports) --- */}
        <div className="absolute left-[18px] sm:left-[22px] md:left-[26px] lg:left-[30px] top-3 bottom-0 w-[1px] bg-border/40 z-0" />
        
        {!prefersReducedMotion && (
          <motion.div 
            className="absolute left-[18px] sm:left-[22px] md:left-[26px] lg:left-[30px] top-3 bottom-0 w-[2px] -ml-[0.5px] bg-[#007BFF] shadow-[0_0_8px_rgba(0,123,255,0.4)] origin-top z-0"
            style={{ scaleY: smoothProgress }}
          />
        )}

        {PROJECTS.map((project, index) => (
          <ProjectNode key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
