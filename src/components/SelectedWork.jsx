import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import WorkMediaCard from './WorkMediaCard';
import { PROJECTS, getDeliverablesString } from '../data/projects';

// Inner Carousel Component
function MobileInnerCarousel({ carousel, index, onSequenceComplete, prefersReducedMotion }) {
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
    <div ref={containerRef} className="snap-start shrink-0 relative flex flex-col group/card h-full" onTouchStart={handleInteraction}>
      <WorkMediaCard
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
                onClick={() => goToSlide(activeSlide - 1)}
                disabled={activeSlide === 0 || isTransitioning}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-bg border border-border/60 text-text-primary disabled:opacity-30 transition-opacity"
                aria-label="Previous slide"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => goToSlide(activeSlide + 1)}
                disabled={activeSlide === (carousel.slides?.length || 1) - 1 || isTransitioning}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-bg border border-border/60 text-text-primary disabled:opacity-30 transition-opacity"
                aria-label="Next slide"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </>
        }
      >
        {/* Swipable media track (physics unchanged) */}
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

function StaticMobileCard({ image, title, type, ratio }) {
  return (
    <WorkMediaCard ratio={ratio} type={type} title={title} media={[image]}>
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </WorkMediaCard>
  );
}

// Reusable component for each project node to track its own scroll progress
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
  // Called unconditionally (Rules of Hooks); applied only when motion is allowed (below).
  const nodeBoxShadow = useTransform(scrollYProgress, [0.8, 1], ["0 0 0px rgba(0,123,255,0)", "0 0 8px rgba(0,123,255,0.4)"]);

  const getAssetCollections = (assets) => {
    const collections = [];
    if (assets.branding) collections.push({ title: 'Branding', items: assets.branding, type: 'Static' });
    if (assets.posters) collections.push({ title: 'Posters', items: assets.posters, type: 'Static' });
    if (assets.festivalCreatives) collections.push({ title: 'Festival Creatives', items: assets.festivalCreatives, type: 'Static' });
    if (assets.reelCovers) collections.push({ title: 'Reel Covers', items: assets.reelCovers, type: 'Static' });
    if (assets.highlightCovers) collections.push({ title: 'Highlight Covers', items: assets.highlightCovers, type: 'Static' });
    if (assets.carousels) collections.push({ title: 'Carousels', items: assets.carousels, type: 'Carousel' });
    return collections;
  };

  const collections = getAssetCollections(project.assets);
  const deliverablesPills = getDeliverablesString(project.assets).split(' · ');

  return (
    <div ref={nodeRef} className="relative group z-10 pl-[44px] md:pl-0">
      
      {/* --- DESKTOP NODE (Untouched) --- */}
      <div className="hidden md:block absolute -left-[54px] top-2 w-3 h-3 rounded-full bg-border group-hover:bg-[#007BFF] dark:group-hover:bg-[#FFD722] transition-colors duration-300 ring-4 ring-bg" />

      {/* --- MOBILE NODE (Numbered Circle) --- */}
      <motion.div 
        className="md:hidden absolute left-[20px] -translate-x-1/2 top-1 w-8 h-8 rounded-full bg-[#FFD722] shadow-sm flex items-center justify-center z-10 origin-center"
        style={prefersReducedMotion ? {} : { boxShadow: nodeBoxShadow }}
      >
        {/* Subtle animated ring on active */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2" 
          style={prefersReducedMotion ? { borderColor: 'transparent' } : { borderColor: ringColor }}
        />
        <motion.span 
          className="font-sans text-[14px] font-bold tracking-tight"
          style={prefersReducedMotion ? { color: '#000000' } : { color: numberColor, scale: numberScale }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </motion.div>

      {/* --- PROJECT CONTENT --- */}
      <div className="flex flex-col gap-6">
        {/* Brand Meta */}
        <div>
          {/* Brand title — primary identifier */}
          <h4 className="font-heading text-2xl md:text-4xl font-bold text-text-primary leading-tight">
            {project.name}
          </h4>
          {/* Metadata — secondary */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-0.5 font-heading font-normal text-[13px] md:text-sm text-text-muted mt-2.5">
            {project.role && <span>{project.role}</span>}
            {project.role && <span className="hidden sm:inline">&middot;</span>}
            {project.date && <span>{project.date}</span>}
            {project.date && <span className="hidden sm:inline">&middot;</span>}
            <span className="text-text-secondary">{project.category}</span>
          </div>
          {/* Description — before pills */}
          {project.detail && (
            <p className="font-body text-[13px] md:text-sm leading-relaxed text-text-secondary max-w-[640px] mt-4">
              {project.detail}
            </p>
          )}
          {/* Deliverable Chips — dynamic counts, wrap naturally */}
          <div className="flex flex-wrap gap-2 mt-5">
            {deliverablesPills.map((chip, idx) => (
              <span key={idx} className="px-3 py-1 text-xs font-body text-text-secondary border border-border/80 rounded-full bg-transparent">
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Asymmetric Images Layout (DESKTOP ONLY) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="md:col-span-8 rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-[480px] bg-secondary-bg border border-border/40 relative group/img cursor-crosshair">
            <img 
              src={project.featuredImage.url} 
              alt={project.featuredImage.alt} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
              loading="lazy"
            />
          </div>
          
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 grid-rows-2 gap-4 md:gap-6">
            <div 
              className="rounded-2xl bg-secondary-bg border border-dashed border-border flex items-center justify-center p-6 text-center text-text-muted font-heading font-normal text-[10px] uppercase tracking-widest relative"
              aria-label="Format placeholder: Social post"
            >
              Social Post Format
            </div>
            <div 
              className="rounded-2xl bg-secondary-bg border border-dashed border-border flex items-center justify-center p-6 text-center text-text-muted font-heading font-normal text-[10px] uppercase tracking-widest relative"
              aria-label="Format placeholder: Detail shot"
            >
              Detail Shot
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track (MOBILE ONLY) */}
        <div className="md:hidden relative mt-2 pb-4">
          <div className="flex flex-col gap-10">
            {collections.map((collection, cIdx) => (
              <div key={cIdx} className="flex flex-col gap-3">
                <p className="font-heading text-[11px] font-bold text-text-primary uppercase tracking-[0.2em] pl-1 opacity-80">{collection.title}</p>
                <div className="relative -mx-5 px-5">
                  <div className="absolute left-0 top-0 bottom-0 w-[40px] z-[2] pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)' }} aria-hidden="true" />
                  <div className="absolute right-0 top-0 bottom-0 w-[40px] z-[2] pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg) 0%, transparent 100%)' }} aria-hidden="true" />
                  <div className="relative flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 pr-10 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {collection.items.map((item, idx) => {
                      if (collection.type === 'Carousel') {
                        return (
                          <MobileInnerCarousel 
                            key={item.id || idx} 
                            carousel={item} 
                            index={idx} 
                            prefersReducedMotion={prefersReducedMotion}
                          />
                        );
                      } else {
                        const ratio = item.aspect?.replace('aspect-[', '')?.replace(']', '') ?? '1/1';
                        return (
                          <StaticMobileCard 
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
        <p className="font-body text-sm md:text-base leading-relaxed text-text-secondary max-w-[640px]">
          A curated selection of visual work exploring social media design, carousel systems, brand visuals, and digital content. Each project reflects a practical, detail-focused approach to turning ideas into clear, engaging visual communication.
        </p>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative z-0 md:pl-12 md:border-l md:border-border/60 pb-16 space-y-24 md:space-y-32">
        
        {/* --- MOBILE TIMELINE RAIL & LASER (Hidden on Desktop) --- */}
        <div className="md:hidden absolute left-[20px] top-4 bottom-0 w-[1px] bg-border/40 z-0" />
        
        {!prefersReducedMotion && (
          <motion.div 
            className="md:hidden absolute left-[20px] top-4 bottom-0 w-[2px] -ml-[0.5px] bg-[#007BFF] shadow-[0_0_8px_rgba(0,123,255,0.4)] origin-top z-0"
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
