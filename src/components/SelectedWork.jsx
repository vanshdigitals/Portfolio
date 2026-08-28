import { useRef } from 'react';
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

const BRANDS = [
  {
    id: 'ranjeet',
    name: 'Ranjeet Raj Official',
    role: 'Freelance Graphic Designer | Project-Based Work',
    date: 'January 2026 – August 2026',
    category: 'Social / Personal Brand',
    deliverables: ['8 Instagram carousels'],
    detail: 'Created 8 Instagram carousel designs; adapted reference styles into a consistent visual direction; structured content into engaging carousel formats for social media.',
    image: imgRanjeet,
    carousels: RANJEET_CAROUSELS,
  },
  {
    id: 'builders',
    name: 'Builders Playground',
    role: 'Freelance Graphic Designer | Short-Term Project',
    date: 'July 2026',
    category: 'Brand Content',
    deliverables: ['5+ reel covers', '1 event poster', '1 carousel', '5 highlight covers'],
    detail: "Created reel covers, an event poster, a social carousel and highlight covers for the brand's event; followed the existing brand theme while adapting layouts; completed within a 4–5 day engagement.",
    image: imgBuilders,
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

// Reusable component for each project node to track its own scroll progress
function ProjectNode({ brand, index }) {
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

  return (
    <div ref={nodeRef} className="relative group">
      
      {/* --- DESKTOP NODE (Untouched) --- */}
      <div className="hidden md:block absolute -left-[54px] top-2 w-3 h-3 rounded-full bg-border group-hover:bg-[#007BFF] dark:group-hover:bg-[#FFD722] transition-colors duration-300 ring-4 ring-bg" />

      {/* --- MOBILE NODE (Numbered Circle) --- */}
      <motion.div 
        className="md:hidden absolute -left-[40px] top-1 w-8 h-8 rounded-full bg-[#FFD722] shadow-sm flex items-center justify-center z-10 origin-center"
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
        <div className="md:hidden relative -ml-10 -mr-6 mt-2">
          {/* Timeline Mask Layer - softly hides the vertical line behind the track */}
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-bg z-0" />
          <div className="absolute top-0 bottom-0 left-8 w-12 bg-gradient-to-r from-bg to-transparent z-0" />
          
          <div className="relative flex overflow-x-auto snap-x snap-mandatory pb-6 gap-4 pl-10 pr-10 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {brand.carousels ? (
              brand.carousels.map((carousel, idx) => (
                <div key={carousel.id} className="snap-start shrink-0 w-[82vw] max-w-[320px] rounded-2xl overflow-hidden bg-secondary-bg border border-border/40 flex flex-col shadow-sm">
                  <div className="aspect-[4/5] w-full relative bg-secondary-bg">
                    <img 
                      src={carousel.slides[0]} 
                      alt={carousel.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-bg/90 backdrop-blur-md px-2.5 py-1 rounded-full font-heading font-normal text-[10px] font-bold text-text-primary shadow-sm border border-border/50">
                      1/{carousel.slides.length}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-center">
                    <p className="font-heading text-lg font-bold text-text-primary leading-tight mb-1">
                      {carousel.title}
                    </p>
                    <p className="font-heading font-normal text-[11px] text-text-muted">
                      {String(idx + 1).padStart(2, '0')} &middot; Carousel
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="snap-start shrink-0 w-[82vw] max-w-[320px] rounded-2xl overflow-hidden bg-secondary-bg border border-border/40 aspect-[4/5] relative shadow-sm">
                <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" loading="lazy" />
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
      <div className="mb-12 md:mb-16">
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
      {/* Mobile: pl-10 to move it left and align with the heading. Desktop: keeps pl-12 and border-l */}
      <div ref={containerRef} className="relative pl-10 md:pl-12 md:border-l md:border-border/60 pb-16 space-y-24 md:space-y-32">
        
        {/* --- MOBILE TIMELINE RAIL & LASER (Hidden on Desktop) --- */}
        <div className="md:hidden absolute left-[15px] top-4 bottom-0 w-[1px] bg-border/40" />
        
        {!prefersReducedMotion && (
          <motion.div 
            className="md:hidden absolute left-[15px] top-4 bottom-0 w-[2px] -ml-[0.5px] bg-[#007BFF] shadow-[0_0_8px_rgba(0,123,255,0.4)] origin-top z-0"
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
