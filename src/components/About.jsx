import { useEffect, useRef, useState } from 'react';

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
      className={`w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[96px] py-24 md:py-32 transition-all duration-[800ms] ease-[cubic-bezier(.4,0,.2,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col gap-16 md:gap-20">
        
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
            <div className="font-mono text-[11px] text-text-muted tracking-[0.06em] uppercase flex items-center gap-2">
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
            <div className="font-mono text-[11px] text-text-muted tracking-[0.06em] uppercase flex items-center gap-2">
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
            <div className="font-mono text-[11px] text-text-muted tracking-[0.06em] uppercase flex items-center gap-2">
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
