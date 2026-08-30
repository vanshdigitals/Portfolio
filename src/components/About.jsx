import { useEffect, useRef, useState } from 'react';
import aboutStand from '../assets/about-stand.webp';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[96px] pt-0 pb-24 md:py-32 transition-all duration-[800ms] ease-[cubic-bezier(.4,0,.2,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* MOBILE LAYOUT */}
      <div className="flex md:hidden flex-col gap-8 w-full">
        {/* Heading */}
        <div className="flex flex-col gap-3 items-center text-center">
          <h2 className="font-heading text-4xl font-normal text-[#007BFF] dark:text-[#FFD722]">
            About Me
          </h2>
          <p className="font-heading text-[20px] font-medium leading-tight text-text-primary">
            The person behind the work.
          </p>
        </div>

        {/* Portrait */}
        <div className="w-full relative py-2 flex flex-col items-center">
          <img 
            src={aboutStand} 
            alt="Vansh standing by desk" 
            width="900"
            height="1165"
            loading="lazy"
            className="w-full h-auto object-contain relative z-10 drop-shadow-[0_10px_12px_rgba(0,0,0,0.14)]"
          />
          {/* Table-base shadow (left-center) */}
          <div 
            aria-hidden="true"
            className="absolute bottom-[6%] left-[26%] -translate-x-1/2 w-[25%] h-[18px] rounded-[50%] blur-[7px] pointer-events-none z-0 shadow-table"
          />
          {/* Shoes shadow (right side) */}
          <div 
            aria-hidden="true"
            className="absolute bottom-[1%] left-[78%] -translate-x-1/2 w-[32%] h-[24px] rounded-[50%] blur-[7px] pointer-events-none z-0 shadow-shoes"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-6 font-body text-[16px] leading-[1.65] text-text-muted pt-2">
          <p>
            I'm Vansh, a graphic designer focused on creating visual content for social media and digital platforms. My work revolves around turning ideas and information into clear, engaging visuals, from social media posts and carousels to reel covers, promotional creatives and brand-led content.
          </p>
          <p>
            Canva has been the tool I have worked with most extensively for over 3 years, and it remains the foundation of my design workflow. I am also developing my skills in Photoshop and Illustrator while exploring how AI can support different parts of the creative process.
          </p>
          <p>
            Alongside design, I explore web development, AI tools and small technical projects. These interests help me understand not only how visuals look, but also how they work within digital experiences.
          </p>
          <p>
            I am currently building my skills and portfolio toward professional graphic design opportunities, with a particular interest in social media design, visual communication and brand-focused digital content.
          </p>
        </div>
      </div>

      {/* DESKTOP / TABLET LAYOUT */}
      <div className="hidden md:flex flex-col gap-16 md:gap-20">
        
        {/* Narrative Block */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-heading text-[32px] md:text-[40px] font-[800] leading-tight tracking-tight text-text-primary uppercase">
              The person behind the work.
            </h2>
            <p className="font-body text-[18px] md:text-[20px] font-medium text-text-secondary mt-1">
              I turn ideas into visuals.
            </p>
          </div>
          
          <p className="font-body text-[16px] md:text-[18px] leading-[1.65] text-text-muted max-w-[720px]">
            I'm Vansh — a graphic designer based in Raebareli, Uttar Pradesh. I design 
            social media content, carousels, reel covers and brand visuals for real 
            clients, built mostly in Canva with Photoshop and Illustrator in active 
            progress. I'm currently a BCA student, and alongside design work I explore 
            AI-assisted workflows and small technical projects — but design is the 
            direction I'm building toward professionally.
          </p>
        </div>

        {/* Metadata Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 border-t border-border pt-12">
          
          {/* Block 1 */}
          <div className="flex flex-col gap-3">
            <div className="font-heading font-normal text-[11px] text-text-muted tracking-[0.06em] uppercase flex items-center gap-2">
              <span className="text-[#007BFF] dark:text-[#FFD722]">01</span> — DESIGN
            </div>
            <ul className="font-body text-[15px] leading-relaxed text-text-primary space-y-1">
              <li>Graphic Design</li>
              <li>Visual Communication</li>
              <li>Social Content</li>
            </ul>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col gap-3">
            <div className="font-heading font-normal text-[11px] text-text-muted tracking-[0.06em] uppercase flex items-center gap-2">
              <span className="text-[#007BFF] dark:text-[#FFD722]">02</span> — CURRENTLY
            </div>
            <ul className="font-body text-[15px] leading-relaxed text-text-primary space-y-1">
              <li>BCA Student</li>
              <li>Creative + AI-assisted</li>
              <li>projects</li>
            </ul>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col gap-3">
            <div className="font-heading font-normal text-[11px] text-text-muted tracking-[0.06em] uppercase flex items-center gap-2">
              <span className="text-[#007BFF] dark:text-[#FFD722]">03</span> — BASED IN
            </div>
            <ul className="font-body text-[15px] leading-relaxed text-text-primary space-y-1">
              <li>Raebareli, Uttar Pradesh</li>
              <li>India</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
