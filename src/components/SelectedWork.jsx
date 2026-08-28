import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import imgRanjeet from '../assets/card-ranjeet.jpg';
import imgBuilders from '../assets/card-builders.jpg';
import imgKeshvi from '../assets/card-keshvi.jpg';

const RANJEET_CAROUSELS = [
  {
    id: "RR-01",
    title: "Pro Designer Vocabulary",
    slides: [
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/01.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/02.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/03.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/04.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/05.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/06.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/07.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/08.webp"
    ]
  },
  {
    id: "RR-02",
    title: "Attractive Brand Colors",
    slides: [
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/01.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/02.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/03.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/04.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/05.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/06.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/07.webp"
    ]
  },
  {
    id: "RR-03",
    title: "The Batching System",
    slides: [
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/01.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/02.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/03.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/04.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/05.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/06.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/07.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/08.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/09.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/10.webp"
    ]
  },
  {
    id: "RR-04",
    title: "Top Canva Background Keywords",
    slides: [
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/01.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/02.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/03.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/04.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/05.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/06.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/07.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/08.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/09.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/10.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/11.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/12.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/13.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/14.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/15.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/16.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/17.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/18.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/19.webp"
    ]
  },
  {
    id: "RR-05",
    title: "Flat to 3D Logos AI Trick",
    slides: [
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-05-Flat-to-3D-Logos-AI-Trick-Carousel/01.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-05-Flat-to-3D-Logos-AI-Trick-Carousel/02.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-05-Flat-to-3D-Logos-AI-Trick-Carousel/03.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-05-Flat-to-3D-Logos-AI-Trick-Carousel/04.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-05-Flat-to-3D-Logos-AI-Trick-Carousel/05.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-05-Flat-to-3D-Logos-AI-Trick-Carousel/06.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-05-Flat-to-3D-Logos-AI-Trick-Carousel/07.webp"
    ]
  },
  {
    id: "RR-06",
    title: "ChatGPT Image 2.0 Prompts",
    slides: [
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-06-ChatGPT-Image-2.0-Prompts-Carousel/01.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-06-ChatGPT-Image-2.0-Prompts-Carousel/02.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-06-ChatGPT-Image-2.0-Prompts-Carousel/03.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-06-ChatGPT-Image-2.0-Prompts-Carousel/04.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-06-ChatGPT-Image-2.0-Prompts-Carousel/05.webp"
    ]
  },
  {
    id: "RR-07",
    title: "The Carousel Anatomy Guide",
    slides: [
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/01.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/02.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/03.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/04.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/05.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/06.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/07.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/08.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/09.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/10.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-07-The-Carousel-Anatomy-Guide/11.webp"
    ]
  }
];

const BUILDERS_PLAYGROUND_DATA = {
  "Event-Carousel": [
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/1.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/2.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/3.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/4.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/5.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/6.webp"
  ],
  "Highlight-Covers": [
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/bts-v2.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/about-us.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/event-v2.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/community-v2.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/football-baithek.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/upcoming-events.webp"
  ],
  "Reel-Covers": [
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-1st-reel-cover-launching-v2.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-2nd-reel-cover-join-cummunity.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-3rd-reel-cover-join-cummunity-about-bp.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-4th-reel-cover-foot-ball-event-01.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-5th-reel-cover-foot-ball-event-02.webp",
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-6th-reel-cover-foot-ball-event-03.webp"
  ]
};

const BRANDS = [
  {
    id: 'ranjeet',
    name: 'Ranjeet Raj Official',
    role: 'Freelance Graphic Designer | Project-Based Work',
    date: 'January 2026 – August 2026',
    category: 'Social / Personal Brand',
    deliverables: [`${RANJEET_CAROUSELS.length} Instagram Carousels`],
    detail: 'Designed carousel posts for Ranjeet Raj Official based on the content and reference posts provided by the client. I understood the style and theme of the references and created the carousels accordingly, using their red, black, and white colour palette with bold typography and a consistent visual style.',
    image: imgRanjeet,
    carousels: RANJEET_CAROUSELS,
  },
  {
    id: 'builders',
    name: 'Builders Playground',
    role: 'Freelance Graphic Designer | Short-Term Project',
    date: 'July 2026',
    category: 'Brand Content',
    deliverables: [
      `${BUILDERS_PLAYGROUND_DATA['Reel-Covers'].length} Reel Covers`,
      `${BUILDERS_PLAYGROUND_DATA['Highlight-Covers'].length} Highlight Covers`,
      `1 Carousel`
    ],
    detail: "Created reel covers, an event poster, a social carousel and highlight covers for the brand's event; followed the existing brand theme while adapting layouts; completed within a 4–5 day engagement.",
    image: imgBuilders,
    reelCovers: BUILDERS_PLAYGROUND_DATA['Reel-Covers'],
    highlightCovers: BUILDERS_PLAYGROUND_DATA['Highlight-Covers'],
    carousels: [
      {
        id: "BP-01",
        title: "Event Carousel",
        slides: BUILDERS_PLAYGROUND_DATA['Event-Carousel']
      }
    ]
  },
  {
    id: 'keshvi',
    name: 'Keshvi Beauty Lounge',
    role: 'Freelance Graphic Designer | As-Needed Project Work',
    date: 'February 2026',
    category: 'Beauty / Branding',
    deliverables: ['3 social posts', '1 educational carousel', '2 makeup carousels', '5+ festival creatives', 'logo + palette + typography'],
    detail: "Created social media carousel posts (educational + makeup portfolio) and festival/combo-offer creatives; contributed to the brand's visual setup by creating the logo and defining colour palette and typography direction.",
    image: imgKeshvi,
  }
];

// Inner Carousel Component (Phase 3 & 4)
function MobileInnerCarousel({ carousel, index, onSequenceComplete, prefersReducedMotion }) {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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
    }, 450); // match transition duration roughly
  }, [isTransitioning, carousel.slides.length, handleInteraction]);

  // Touch Handlers for 1:1 Swipe
  const handleTouchStart = (e) => {
    handleInteraction();
    if (isTransitioning) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e) => {
    if (isTransitioning) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartRef.current.x - touchEndX;
    const deltaY = Math.abs(touchStartRef.current.y - touchEndY);
    const timeElapsed = Date.now() - touchStartRef.current.time;

    // Must be a primarily horizontal swipe of at least 40px within 600ms
    if (Math.abs(deltaX) > 40 && deltaY < 50 && timeElapsed < 600) {
      if (deltaX > 0) {
        goToSlide(activeSlide + 1); // Swipe left -> Next slide
      } else {
        goToSlide(activeSlide - 1); // Swipe right -> Prev slide
      }
    }
  };

  // Autoplay Effect
  useEffect(() => {
    if (prefersReducedMotion || !isVisible || isInteracting) return;

    const timer = setTimeout(() => {
      if (activeSlide < carousel.slides.length - 1) {
        setActiveSlide(activeSlide + 1);
      } else {
        if (onSequenceComplete) onSequenceComplete();
      }
    }, 3000); // Hold for 3 seconds

    return () => clearTimeout(timer);
  }, [activeSlide, isVisible, isInteracting, prefersReducedMotion, carousel.slides.length, onSequenceComplete]);

  return (
    <div ref={containerRef} className="snap-start shrink-0 relative flex flex-col group/card h-full" onTouchStart={handleInteraction}>
      {/* Card (FRONT) */}
      <div className="relative w-[65vw] max-w-[260px] h-full rounded-2xl overflow-hidden bg-secondary-bg border border-border/40 flex flex-col shadow-sm z-10">
        
        {/* Swipable Artwork Area (Padded Frame) */}
        <div 
          className="w-full pt-[14px] px-[14px] pb-[8px] bg-secondary-bg relative touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`${carousel.id === 'RR-07' ? 'aspect-[3/4]' : 'aspect-[4/5]'} w-full rounded-xl overflow-hidden relative shadow-sm border border-border/20 bg-bg`}>
            <div 
              className={`flex w-full h-full ${!prefersReducedMotion ? 'transition-transform duration-[400ms] ease-[cubic-bezier(.34,1.4,.5,1)]' : ''}`}
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {carousel.slides.map((slide, i) => (
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
        </div>

        {/* Text and Controls */}
        <div className="px-4 pb-4 flex-1 flex flex-col justify-center">
          <div className="mb-4 flex flex-col items-start">
            <p className="font-heading text-lg font-bold text-text-primary leading-tight mb-1">
              {carousel.title}
            </p>
            <p className="font-heading font-normal text-[11px] text-text-muted mb-3">
              {String(index + 1).padStart(2, '0')} &middot; Carousel
            </p>
            
            <div className="w-full flex justify-center mb-1">
              <button 
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-bg/50 text-[11px] font-heading font-medium text-text-secondary transition-colors"
              >
                <Smartphone size={12} />
                Mobile Mockup View
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-border/40 pt-3 mt-auto w-full">
            <div className="font-heading font-medium text-[11px] text-text-muted tracking-widest pl-1">
              {String(activeSlide + 1).padStart(2, '0')} / {String(carousel.slides.length).padStart(2, '0')}
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
                disabled={activeSlide === carousel.slides.length - 1 || isTransitioning}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-bg border border-border/60 text-text-primary disabled:opacity-30 transition-opacity"
                aria-label="Next slide"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

// Reusable component for each project node to track its own scroll progress
function ProjectNode({ brand, index }) {
  const nodeRef = useRef(null);
  const outerTrackRef = useRef(null);
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

  return (
    <div ref={nodeRef} className="relative group z-10 pl-[44px] md:pl-0">
      
      {/* --- DESKTOP NODE (Untouched) --- */}
      <div className="hidden md:block absolute -left-[54px] top-2 w-3 h-3 rounded-full bg-border group-hover:bg-[#007BFF] dark:group-hover:bg-[#FFD722] transition-colors duration-300 ring-4 ring-bg" />

      {/* --- MOBILE NODE (Numbered Circle) --- */}
      <motion.div 
        className="md:hidden absolute left-[20px] -translate-x-1/2 top-1 w-8 h-8 rounded-full bg-[#FFD722] shadow-sm flex items-center justify-center z-10 origin-center"
        style={prefersReducedMotion ? {} : { boxShadow: useTransform(scrollYProgress, [0.8, 1], ["0 0 0px rgba(0,123,255,0)", "0 0 8px rgba(0,123,255,0.4)"]) }}
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
          <h4 className="font-heading text-2xl md:text-4xl font-bold text-text-primary mb-2">
            {brand.name}
          </h4>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 font-heading font-normal text-xs md:text-sm text-text-muted mb-6">
            <span>{brand.role}</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>{brand.date}</span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="text-text-secondary">{brand.category}</span>
          </div>
          
          {/* Deliverable Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {brand.deliverables.map((chip, idx) => (
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
              src={brand.image} 
              alt={`${brand.name} featured work`} 
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
        <div className="md:hidden relative mt-2">
          {/* Edge Fade Masks (Fix 2) */}
          <div className="absolute left-0 top-0 bottom-0 w-[32px] z-[2] pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)' }} aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-[32px] z-[2] pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg) 0%, transparent 100%)' }} aria-hidden="true" />
          
          <div ref={outerTrackRef} className="relative flex overflow-x-auto snap-x snap-mandatory pb-6 gap-4 pr-6 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {brand.id === 'builders' ? (
              <>
                {brand.reelCovers.map((img, idx) => (
                  <StaticMobileCard 
                    key={`reel-${idx}`} 
                    image={img} 
                    title={`Reel Cover ${String(idx + 1).padStart(2, '0')}`} 
                    type="Reel Cover" 
                    aspectRatio="aspect-[9/16]" 
                  />
                ))}
                {brand.highlightCovers.map((img, idx) => (
                  <StaticMobileCard 
                    key={`highlight-${idx}`} 
                    image={img} 
                    title={`Highlight Cover ${String(idx + 1).padStart(2, '0')}`} 
                    type="Highlight Cover" 
                    aspectRatio="aspect-square" 
                  />
                ))}
                {brand.carousels.map((carousel, idx) => {
                  const domIndex = brand.reelCovers.length + brand.highlightCovers.length + idx;
                  return (
                    <MobileInnerCarousel 
                      key={carousel.id} 
                      carousel={carousel} 
                      index={idx} 
                      prefersReducedMotion={prefersReducedMotion}
                      onSequenceComplete={() => {
                        if (!outerTrackRef.current) return;
                        const track = outerTrackRef.current;
                        const children = track.children;
                        if (domIndex + 1 < children.length) {
                          children[domIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                      }}
                    />
                  );
                })}
              </>
            ) : brand.carousels ? (
              brand.carousels.map((carousel, idx) => (
                <MobileInnerCarousel 
                  key={carousel.id} 
                  carousel={carousel} 
                  index={idx} 
                  prefersReducedMotion={prefersReducedMotion}
                  onSequenceComplete={() => {
                    if (!outerTrackRef.current) return;
                    const track = outerTrackRef.current;
                    const children = track.children;
                    if (idx + 1 < children.length) {
                      children[idx + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                  }}
                />
              ))
            ) : (
              <div className="snap-start shrink-0 relative flex flex-col group/card h-full">
                {/* Card (FRONT) */}
                <div className="relative w-[65vw] max-w-[260px] h-full rounded-2xl overflow-hidden bg-secondary-bg border border-border/40 flex flex-col shadow-sm z-10">
                  <div className="w-full pt-[14px] px-[14px] pb-[8px] bg-secondary-bg relative touch-pan-y">
                    <div className="aspect-[3/4] w-full rounded-xl overflow-hidden relative shadow-sm border border-border/20 bg-bg">
                      <img 
                        src={brand.image} 
                        alt={`${brand.name} mobile view`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex-1 flex flex-col justify-center">
                    <div className="mb-4 flex flex-col items-start">
                      <p className="font-heading text-lg font-bold text-text-primary leading-tight mb-1">
                        {brand.name}
                      </p>
                      <p className="font-heading font-normal text-[11px] text-text-muted mb-3">
                        {brand.category}
                      </p>
                      <div className="w-full flex justify-center mb-1">
                        <button 
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-bg/50 text-[11px] font-heading font-medium text-text-secondary transition-colors"
                        >
                          <Smartphone size={12} />
                          Mobile Mockup View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detail sentence */}
        <p className="font-body text-[15px] leading-relaxed text-text-secondary max-w-[800px] mt-4">
          {brand.detail}
        </p>
      </div>
    </div>
  );
}

function StaticMobileCard({ image, title, type, aspectRatio }) {
  return (
    <div className="snap-start shrink-0 relative flex flex-col group/card h-full">
      <div className="relative w-[65vw] max-w-[260px] h-full rounded-2xl overflow-hidden bg-secondary-bg border border-border/40 flex flex-col shadow-sm z-10">
        <div className="w-full pt-[14px] px-[14px] pb-[8px] bg-secondary-bg relative">
          <div className={`${aspectRatio} w-full rounded-xl overflow-hidden relative shadow-sm border border-border/20 bg-bg`}>
            <div className="w-full h-full relative">
              <img 
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 flex-1 flex flex-col justify-center">
          <div className="mb-4 flex flex-col items-start">
            <p className="font-heading text-lg font-bold text-text-primary leading-tight mb-1 line-clamp-2">
              {title}
            </p>
            <p className="font-heading font-normal text-[11px] text-text-muted mb-3">
              {type}
            </p>
            
            <div className="w-full flex justify-center mb-1">
              <button 
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-bg/50 text-[11px] font-heading font-medium text-text-secondary transition-colors"
              >
                <Smartphone size={12} />
                Mobile Mockup View
              </button>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-3 mt-auto w-full" />
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

        {BRANDS.map((brand, index) => (
          <ProjectNode key={brand.id} brand={brand} index={index} />
        ))}
      </div>
    </div>
  );
}
