import { ArrowRight } from 'lucide-react';
import imgRanjeet from '../assets/card_ranjeet.jpg';
import imgBuilders from '../assets/card_builders.jpg';
import imgKeshvi from '../assets/card_keshvi.jpg';

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

export default function SelectedWork() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-16">
        <h3 className="font-mono text-sm tracking-[0.1em] text-[#007BFF] dark:text-[#FFD722] mb-3">
          01 &middot; SELECTED WORK
        </h3>
        <p className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
          Client & signature work
        </p>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 md:pl-12 border-l border-border/60 pb-16 space-y-24 md:space-y-32">
        {BRANDS.map((brand) => (
          <div key={brand.id} className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[30px] md:-left-[54px] top-2 w-3 h-3 rounded-full bg-border group-hover:bg-[#007BFF] dark:group-hover:bg-[#FFD722] transition-colors duration-300 ring-4 ring-bg" />

            <div className="flex flex-col gap-6">
              {/* Brand Meta */}
              <div>
                <h4 className="font-heading text-2xl md:text-4xl font-bold text-text-primary mb-2">
                  {brand.name}
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 font-mono text-xs md:text-sm text-text-muted mb-6">
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

              {/* Asymmetric Images Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                {/* Large main image */}
                <div className="md:col-span-8 rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-[480px] bg-secondary-bg border border-border/40 relative group/img cursor-crosshair">
                  <img 
                    src={brand.image} 
                    alt={`${brand.name} featured work`} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Smaller placeholder tiles */}
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 grid-rows-2 gap-4 md:gap-6">
                  <div 
                    className="rounded-2xl bg-secondary-bg border border-dashed border-border flex items-center justify-center p-6 text-center text-text-muted font-mono text-[10px] uppercase tracking-widest relative"
                    aria-label="Format placeholder: Social post"
                  >
                    Social Post Format
                  </div>
                  <div 
                    className="rounded-2xl bg-secondary-bg border border-dashed border-border flex items-center justify-center p-6 text-center text-text-muted font-mono text-[10px] uppercase tracking-widest relative"
                    aria-label="Format placeholder: Detail shot"
                  >
                    Detail Shot
                  </div>
                </div>
              </div>

              {/* Detail sentence */}
              <p className="font-body text-[15px] leading-relaxed text-text-secondary max-w-[800px] mt-4">
                {brand.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
