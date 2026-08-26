import portrait from '../assets/New Profile Icon DP.png';
import chatgptIcon from '../assets/Chatgpt.png';
import canvaIcon from '../assets/Canva.png';
import photoshopIcon from '../assets/Photoshop.png';
import illustratorIcon from '../assets/Ilustrator.png';

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative w-full mt-16 md:mt-24 pt-[10px] pb-0 flex flex-col items-center justify-start bg-[var(--bg)] text-[var(--text-primary)] border-b border-border transition-colors duration-[320ms] overflow-x-clip"
      style={{ scrollMarginTop: 'var(--header-h, 64px)' }}
    >
      {/* 
        COMPOSITION GROUP 
        Uses CSS Grid to stack the elements naturally without absolute positioning.
        The Hero height automatically expands to fit the tallest element.
      */}
      <div className="relative w-full max-w-[1800px] mx-auto px-[20px] grid grid-cols-1 items-start text-center isolate">
        
        {/* PORTFOLIO (Layer 10) 
            Sits BEHIND the portrait as requested.
        */}
        <div className="col-start-1 row-start-1 z-10 w-full justify-self-center self-start">
          <h1 
            className="font-furgatorio portfolio-wordmark leading-[1.1] m-0 select-none whitespace-nowrap animate-portfolio-init motion-safe:animate-portfolio-flicker"
          >
            PORTFOLIO
          </h1>
        </div>

        {/* ORBIT GUIDE & ICONS 
            This single wrapper acts as both the circle border and the positioning parent for the icons.
            We use z-auto (instead of z-[15]) so it doesn't create a stacking context. 
            This allows the circle border to naturally render BEHIND the z-20 portrait, 
            while the icons (z-[25]) can break out and render IN FRONT of the portrait.
        */}
        <div className="col-start-1 row-start-1 z-auto w-[95%] sm:w-[80%] md:w-[65%] lg:w-[55%] max-w-[650px] justify-self-center self-start pt-[30vw] sm:pt-[25vw] md:pt-[22vw] lg:pt-[18vw] xl:pt-[260px] pointer-events-none">
          <div className="relative w-full flex justify-center mt-[-5%] sm:mt-[-2%]">
            
            {/* ONE dedicated wrapper div that is BOTH the circle's visual border AND the icons' positioning parent. */}
            <div className="relative w-full aspect-square rounded-full border-2 border-dashed border-[#007BFF] dark:border-[#FFD722] bg-transparent">
              
              <img src={chatgptIcon} alt="ChatGPT" className="absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-[clamp(44px,6vw,72px)] h-[clamp(44px,6vw,72px)] object-contain drop-shadow-md pointer-events-auto z-[25]" />
              
              <img src={canvaIcon} alt="Canva" className="absolute top-[15%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-[clamp(44px,6vw,72px)] h-[clamp(44px,6vw,72px)] object-contain drop-shadow-md pointer-events-auto z-[25]" />
              
              <img src={photoshopIcon} alt="Photoshop" className="absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-[clamp(44px,6vw,72px)] h-[clamp(44px,6vw,72px)] object-contain drop-shadow-md pointer-events-auto z-[25]" />
              
              <img src={illustratorIcon} alt="Illustrator" className="absolute top-[85%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-[clamp(44px,6vw,72px)] h-[clamp(44px,6vw,72px)] object-contain drop-shadow-md pointer-events-auto z-[25]" />

            </div>
          </div>
        </div>

        {/* PORTRAIT (Layer 20) 
            Sits IN FRONT of the typography. 
            Responsive top padding pushes it down so the head aligns with the lower letters.
        */}
        <div className="col-start-1 row-start-1 z-20 w-[95%] sm:w-[80%] md:w-[65%] lg:w-[55%] max-w-[650px] justify-self-center self-start pt-[30vw] sm:pt-[25vw] md:pt-[22vw] lg:pt-[18vw] xl:pt-[260px]">
          <div className="relative w-full h-auto">
            <img 
              src={portrait} 
              alt="Vansh Gupta"
              className="w-full h-auto object-contain object-bottom"
            />
          </div>
        </div>



        {/* Layer 30: Tape Overlay — sits above Portrait (z-20), independent DOM element, not a pseudo-element */}
        <div className="absolute inset-x-0 bottom-[3%] z-30 pointer-events-none">
          <div
            className="
              absolute left-1/2 -translate-x-1/2
              w-[120vw] max-w-none
              rotate-3
              bg-[#FFD722]
              flex items-center
              h-[clamp(44px,8.5vw,90px)]
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
