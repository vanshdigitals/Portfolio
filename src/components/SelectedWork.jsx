import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RANJEET_CAROUSELS = [
  {
    slides: [
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/01.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/02.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/03.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/04.webp",
      "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/05.webp",
    ]
  }
];

const BUILDERS_PLAYGROUND_DATA = {
  "Event-Carousel": [
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/1.webp"
  ],
  "Highlight-Covers": [
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/01-about-us.webp"
  ],
  "Reel-Covers": [
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-1st-reel-cover-launching-v2.webp"
  ]
};

const KESHVI_DATA = {
  logo: [
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Keshvi-Beauty-Lounge-Logo/1.webp"
  ],
  posters: [
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/KBL-Signature-Packages-Collection-Posters/15.webp"
  ],
  carousel1: [
    "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-1-TextureVsCakey-Bridal-Authority/1.webp"
  ]
};

const BRANDS = [
  {
    id: 'ranjeet',
    title: 'Ranjeet Raj Official',
    label: 'Brand Content',
    meta: '8 Carousels · view all →',
    workCollectionsRoute: '/work-collections',
    totalCount: 8,
    media: {
      style: 'cycle',
      items: RANJEET_CAROUSELS[0].slides.slice(0, 5)
    }
  },
  {
    id: 'builders',
    title: 'Builders Playground',
    label: 'Brand Content',
    meta: '1 Reel · 6 Highlights · 1 Carousel · view all →',
    workCollectionsRoute: '/work-collections',
    totalCount: 13,
    media: {
      style: 'collage',
      items: [
        BUILDERS_PLAYGROUND_DATA['Event-Carousel'][0],
        BUILDERS_PLAYGROUND_DATA['Highlight-Covers'][0],
        BUILDERS_PLAYGROUND_DATA['Reel-Covers'][0]
      ]
    }
  },
  {
    id: 'keshvi',
    title: 'Keshvi Beauty Lounge',
    label: 'Beauty / Personal Brand',
    meta: '2 Logos · 5 Posters · 3 Carousels · 1 Reel · view all →',
    workCollectionsRoute: '/work-collections',
    totalCount: 11,
    media: {
      style: 'collage',
      items: [
        KESHVI_DATA.posters[0],
        KESHVI_DATA.carousel1[0],
        KESHVI_DATA.logo[0]
      ]
    }
  }
];

function FeaturedWorkCard({ brand }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);
  
  const { label, title, meta, workCollectionsRoute, totalCount, media } = brand;
  const isCycle = media.style === 'cycle';
  
  useEffect(() => {
    if (!isCycle || prefersReducedMotion) return;
    
    const canHover = window.matchMedia('(hover: hover)').matches;
    
    if (!canHover) {
      const observer = new IntersectionObserver((entries) => {
        setIsInView(entries[0].isIntersecting);
      }, { threshold: 0.6 });
      
      if (cardRef.current) {
        observer.observe(cardRef.current);
      }
      return () => observer.disconnect();
    }
  }, [isCycle, prefersReducedMotion]);

  useEffect(() => {
    if (!isCycle || prefersReducedMotion) return;
    
    const canHover = window.matchMedia('(hover: hover)').matches;
    const shouldCycle = canHover ? isHovered : isInView;
    
    let timer;
    if (shouldCycle) {
      timer = setInterval(() => {
        setActiveSlide(prev => (prev + 1) % media.items.length);
      }, 1000);
    } else {
      if (canHover) {
        setActiveSlide(0);
      }
    }
    
    return () => clearInterval(timer);
  }, [isHovered, isInView, isCycle, prefersReducedMotion, media.items.length]);

  const overlayCount = totalCount - 3;

  return (
    <Link 
      to={workCollectionsRoute}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View ${title} in Work Collections`}
      className="group block relative w-full rounded-[20px] bg-secondary-bg border border-border/40 hover:border-[#007BFF] dark:hover:border-[#FFD722] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col"
    >
      {/* MEDIA AREA */}
      <div className="relative w-full aspect-[4/5] bg-black overflow-hidden shrink-0">
        {/* Badge */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-heading font-bold uppercase tracking-widest rounded-full border border-white/10" aria-hidden="true">
          {isCycle ? `${totalCount} carousels` : `${totalCount} designs`}
        </div>
        
        {isCycle ? (
          <>
            <div 
              className="flex w-full h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {media.items.map((src, i) => (
                <img 
                  key={i}
                  src={src} 
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover shrink-0 min-w-full"
                />
              ))}
            </div>
            {/* Dots */}
            {!prefersReducedMotion && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20" aria-hidden="true">
                {media.items.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === i ? 'w-4 bg-[#007BFF] dark:bg-[#FFD722]' : 'w-1.5 bg-white/40'}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-[3px] bg-black">
            <div className="col-span-1 row-span-2 relative">
              <img src={media.items[0]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="col-span-1 row-span-1 relative">
              <img src={media.items[1]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="col-span-1 row-span-1 relative">
              <img src={media.items[2]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              {overlayCount > 0 && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center" aria-hidden="true">
                  <span className="text-white font-body font-bold text-lg md:text-xl">+{overlayCount} more</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* FOOTER */}
      <div className="p-5 flex justify-between items-start gap-4 grow bg-bg border-t border-border/40 transition-colors duration-300">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-[#007BFF] dark:text-[#FFD722]">
            {label}
          </span>
          <h4 className="font-body font-bold text-lg md:text-xl text-text-primary leading-tight">
            {title}
          </h4>
          <span className="text-xs md:text-sm text-text-muted mt-1 font-body">
            {meta}
          </span>
        </div>
        <div className="shrink-0 w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-text-primary group-hover:bg-[#007BFF] group-hover:border-[#007BFF] dark:group-hover:bg-[#FFD722] dark:group-hover:border-[#FFD722] group-hover:text-white dark:group-hover:text-black transition-all duration-300">
          <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

export default function SelectedWork() {
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

      {/* Grid of Featured Work Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-0">
        {BRANDS.map((brand) => (
          <FeaturedWorkCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
}
