import { Fragment } from 'react';

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

export default function MarqueeStrip() {
  return (
    <section className="w-full py-16 md:py-24 overflow-hidden flex flex-col items-center gap-[15px]">
      <div className="relative w-[120vw] max-w-none -rotate-1 flex flex-col items-center gap-[15px] pointer-events-none">
        
        {/* FIRST ROW */}
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
          
        {/* SECOND ROW */}
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
