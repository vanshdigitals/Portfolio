import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import aboutPortraitBw from '../assets/about-portrait-bw.png';
import aboutPortraitColor from '../assets/about-portrait.png';
import signatureWebp from '../assets/signature.webp';
import InteractivePortrait from './about/InteractivePortrait';
import JourneyTimeline from './about/JourneyTimeline';

const ABOUT_BLOCKS = [
  {
    id: 'current',
    paragraphs: [
      "I'm Vansh Gupta, a Graphic Designer & Visual Designer currently pursuing my BCA. I mainly create social media carousels, reel covers, posters and promotional creatives for different projects and clients. Canva has been a big part of my workflow for more than three years, and I'm also developing my skills in Photoshop and Illustrator.",
      "I enjoy working on visuals that have a clear purpose. I like understanding what needs to be communicated first, then figuring out how to make it look right. Over time, working on different projects has helped me become more comfortable with layout, typography, colour, composition and building visuals that stay consistent with a brand."
    ]
  },
  {
    id: 'where-it-started',
    paragraphs: [
      "My interest in design started with something much simpler. I used to enjoy drawing, and around Class 9 I started moving from paper to creating things on a computer. During the lockdown, I spent a lot of time exploring websites, blogs, themes, layouts and different ways of creating things digitally.",
      "I also experimented with content creation and websites, but eventually I realised that I enjoyed making the visual side of things the most. That curiosity slowly turned into regular design practice, small projects and client work, which is what eventually led me to take graphic design more seriously."
    ]
  }
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const easeLevel3 = [0.16, 1, 0.3, 1];

  const fadeUpProps = (delay = 0) => prefersReducedMotion ? {
    initial: false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0 }
  } : {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay, ease: easeLevel3 }
  };

  const fadeInProps = (delay = 0) => prefersReducedMotion ? {
    initial: false,
    animate: { opacity: 1 },
    transition: { duration: 0 }
  } : {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.7, delay, ease: easeLevel3 }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="w-full max-w-[1440px] mx-auto px-6 min-[720px]:px-10 md:px-12 lg:px-[96px] py-0 bg-bg transition-colors duration-300"
    >
      <div className="flex flex-col gap-6 min-[720px]:gap-6 md:gap-7 xl:gap-8 w-full">
        
        {/* 1. Centred Section Introduction */}
        <motion.div 
          {...fadeUpProps(0)}
          className="flex flex-col items-center text-center"
        >
          <span className="font-body text-[11px] md:text-[12px] font-semibold tracking-[0.22em] text-text-muted uppercase mb-1.5 block">
            ABOUT
          </span>
          <h2 className="font-heading text-[32px] sm:text-[38px] min-[720px]:text-[40px] md:text-[44px] lg:text-[clamp(38px,4.3vw,60px)] font-light text-text-primary leading-[1.12] min-[720px]:leading-[1.08] tracking-[-0.03em]">
            Behind the{' '}
            <span className="text-[#007BFF] dark:text-[#3B93FF]">Work</span>
          </h2>
          <p className="font-body text-[15px] sm:text-[16px] min-[720px]:text-[17px] md:text-[18px] lg:font-body-large text-text-secondary mt-1.5">
            The person behind Vansh Digitals.
          </p>
        </motion.div>

        {/* 2 & 3. Asymmetric Composition: Cutout Portrait + Personal Brief */}
        <div className="grid grid-cols-1 min-[720px]:grid-cols-12 gap-8 min-[720px]:gap-6 lg:gap-8 xl:gap-14 items-center">
          
          {/* Left / Top: Cutout B&W Portrait with Organic Colour Reveal Interaction */}
          <motion.div 
            {...fadeInProps(0.1)}
            className="col-span-1 min-[720px]:col-span-5 flex justify-center min-[720px]:justify-end xl:pr-2"
          >
            <InteractivePortrait
              bwSrc={aboutPortraitBw}
              colorSrc={aboutPortraitColor}
              alt="Portrait of Vansh Gupta"
              width="1122"
              height="1402"
              className="w-[280px] sm:w-[320px] min-[720px]:w-[280px] md:w-[310px] lg:w-[420px] xl:w-[455px] aspect-[1122/1402] shrink-0"
            />
          </motion.div>

          {/* Right / Bottom: Personal Brief (Max 62ch measure, two visually separate blocks) */}
          <div className="col-span-1 min-[720px]:col-span-7 flex flex-col justify-center max-w-[62ch] mx-auto min-[720px]:mx-0 w-full">
            <div className="space-y-4 min-[720px]:space-y-4 md:space-y-5 font-body text-[15px] sm:text-[16px] min-[720px]:text-[14.5px] md:text-[15.5px] lg:text-base text-text-secondary leading-[1.65] min-[720px]:leading-[1.58] md:leading-[1.6]">
              {ABOUT_BLOCKS.map((block, blockIdx) => (
                <div key={block.id} className="space-y-3.5">
                  {block.paragraphs.map((paragraph, pIdx) => (
                    <motion.p
                      key={pIdx}
                      {...fadeUpProps(0.15 + (blockIdx * 2 + pIdx) * 0.08)}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              ))}
            </div>

            {/* 4. Signature (Handwritten strokes enlarged ~28% with trimmed whitespace) */}
            <motion.div 
              {...fadeInProps(0.48)}
              className="mt-5 flex items-center justify-start"
            >
              <div 
                role="img"
                aria-label="Vansh Gupta"
                className="w-[136px] h-[41px] bg-text-primary shrink-0 transition-colors duration-300"
                style={{
                  maskImage: `url(${signatureWebp})`,
                  WebkitMaskImage: `url(${signatureWebp})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                  WebkitMaskPosition: 'left center'
                }}
              />
            </motion.div>
          </div>

        </div>

        {/* 5. Scroll-Driven Journey Timeline & Natural CTA */}
        <JourneyTimeline sectionRef={sectionRef} />

      </div>
    </section>
  );
}
