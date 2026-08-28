export default function WorkGalleryIntro() {
  return (
    <section id="work" className="py-24 md:py-32 border-b border-border bg-bg">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        
        {/* Intro Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start mb-24 md:mb-32">
          
          <div className="md:col-span-12 lg:col-span-8 animate-slide-up">
            <p className="font-heading font-normal text-[11.5px] uppercase tracking-[0.1em] text-text-secondary mb-6 md:mb-8">
              Selected Work / Visual Archive
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.02em] text-text-primary mb-8 md:mb-10 max-w-[720px]">
              A collection of work, built through practice and real projects.
            </h2>
            <p className="font-body text-base md:text-[17px] leading-[1.6] text-text-secondary max-w-[640px]">
              A curated collection of social media designs, carousels, posters, reel covers and brand content created across freelance, project-based and personal work.
            </p>
          </div>
          
          <div className="md:col-span-12 lg:col-span-4 lg:text-right pt-2 lg:pt-0 animate-slide-up animation-delay-100 flex flex-col lg:items-end">
            <p className="font-heading font-normal text-[11px] md:text-[12px] tracking-[0.04em] text-text-muted">
              Social Media · Brand Content · Digital Design
            </p>
            {/* Minimal visual indicator */}
            <div className="w-6 h-[2px] bg-primary mt-6 hidden lg:block opacity-80"></div>
          </div>
          
        </div>

        {/* Index of Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-divider pt-12 md:pt-16 animate-slide-up animation-delay-200">
          
          {/* Category 01 */}
          <div className="group cursor-default">
            <div className="font-heading font-normal text-primary text-[12px] mb-4">01</div>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-200">
              SELECTED WORK
            </h3>
            <p className="font-body text-sm text-text-secondary leading-[1.6]">
              Client projects and the work that best represents my current design practice.
            </p>
            <div className="w-0 h-[2px] bg-primary mt-6 transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
          </div>
          
          {/* Category 02 */}
          <div className="group cursor-default">
            <div className="font-heading font-normal text-primary text-[12px] mb-4">02</div>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-200">
              SAMPLE WORK
            </h3>
            <p className="font-body text-sm text-text-secondary leading-[1.6]">
              Explorations and design pieces created for different visual directions and briefs.
            </p>
            <div className="w-0 h-[2px] bg-primary mt-6 transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
          </div>
          
          {/* Category 03 */}
          <div className="group cursor-default">
            <div className="font-heading font-normal text-primary text-[12px] mb-4">03</div>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-200">
              PRACTICE WORK
            </h3>
            <p className="font-body text-sm text-text-secondary leading-[1.6]">
              Experiments, studies and self-initiated work created while developing my design skills.
            </p>
            <div className="w-0 h-[2px] bg-primary mt-6 transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
          </div>

        </div>

      </div>
    </section>
  );
}
