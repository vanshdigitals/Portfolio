import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

import imgCutsCurves  from '../assets/card-cuts-curves.webp';
import imgWaterplane  from '../assets/card-waterplane.webp';
import imgKeshvi      from '../assets/card-keshvi.webp';
import imgBuilders    from '../assets/card-builders.webp';
import imgRanjeet     from '../assets/card-ranjeet.webp';

// ── Client data ────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: '01',
    name: 'Cuts & Curves',
    category: 'Fitness / Social',
    deliverables: '7 carousels · 60+ reel covers · 8+ posters',
    img: imgCutsCurves,
    // Warm-neutral tint: a very subtle warm sand overlay used only in light mode surface accent
    tint: 'bg-[#F5F0EA]',
    tintDark: 'dark:bg-[#1C1A17]',
  },
  {
    num: '02',
    name: 'Waterplane',
    category: 'Brand / Social',
    deliverables: '8+ carousels · reel covers',
    img: imgWaterplane,
    tint: 'bg-[#EDF3FB]',
    tintDark: 'dark:bg-[#131820]',
  },
  {
    num: '03',
    name: 'Keshvi Beauty Lounge',
    category: 'Beauty / Branding',
    deliverables: 'Logo + palette · carousels · festival creatives',
    img: imgKeshvi,
    tint: 'bg-[#FAF2F0]',
    tintDark: 'dark:bg-[#1C1614]',
  },
  {
    num: '04',
    name: 'Builders Playground',
    category: 'Brand Content',
    deliverables: '5+ reel covers · 1 poster · 1 carousel · 5 highlight covers',
    img: imgBuilders,
    tint: 'bg-[#F5F3EC]',
    tintDark: 'dark:bg-[#1A1A14]',
  },
  {
    num: '05',
    name: 'Ranjeet Raj Official',
    category: 'Social / Personal Brand',
    deliverables: '8 Instagram carousels',
    img: imgRanjeet,
    tint: 'bg-[#F3EEF9]',
    tintDark: 'dark:bg-[#17121E]',
  },
];

// ── Individual Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, navigateWithTransition }) {
  const isWide = index === 0; // first card spans 2 columns on md+

  return (
    <article
      className={`
        group relative flex flex-col overflow-hidden border border-border
        transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(.4,0,.2,1)]
        hover:border-border-strong hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)]
        dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
        focus-within:border-border-strong focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.07)]
        ${project.tint} ${project.tintDark}
        ${isWide ? 'sm:col-span-2 md:col-span-2' : ''}
      `}
    >
      {/* Artwork — dominant top section */}
      <div className={`relative overflow-hidden w-full ${isWide ? 'aspect-[16/7]' : 'aspect-[4/3]'}`}>
        <img
          src={project.img}
          alt={`${project.name} design work`}
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]
            group-hover:scale-[1.02]
            motion-reduce:group-hover:scale-100
          "
          width="1200"
          height="896"
          loading="lazy"
        />
      </div>

      {/* Card body */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex flex-col gap-1.5 min-w-0">
          {/* Index + category on one line */}
          <div className="flex items-center gap-2">
            <span className="font-heading font-normal text-[11px] text-text-muted shrink-0">{project.num}</span>
            <span className="font-heading font-normal text-[11px] uppercase tracking-[0.06em] text-text-muted truncate">
              {project.category}
            </span>
          </div>
          {/* Client name */}
          <h3 className="font-heading text-[17px] font-semibold text-text-primary leading-tight tracking-[-0.01em]">
            {project.name}
          </h3>
          {/* Deliverables */}
          <p className="font-heading font-normal text-[11px] text-text-muted leading-relaxed mt-0.5">
            {project.deliverables}
          </p>
        </div>

        {/* Arrow — slides on hover */}
        <div className="shrink-0 pt-0.5">
          <ArrowUpRight
            size={18}
            className="
              text-text-muted
              transition-[transform,color] duration-200 ease-[cubic-bezier(.4,0,.2,1)]
              group-hover:text-text-primary group-hover:translate-x-[2px] group-hover:-translate-y-[2px]
              motion-reduce:transition-none
            "
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Invisible anchor covers the whole card for keyboard + screen-reader access */}
      <Link
        to="/work-collections"
        onClick={(e) => { e.preventDefault(); navigateWithTransition('/work-collections'); }}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        aria-label={`View ${project.name} — ${project.category}`}
        tabIndex={0}
      />
    </article>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────────
export default function WorkPreview() {
  const { navigateWithTransition } = usePageTransition();

  return (
    <section id="work" className="py-20 md:py-28 border-b border-border bg-bg">
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 xl:px-16">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 mb-14 md:mb-18">

          {/* Left: eyebrow + heading + sub */}
          <div className="flex flex-col gap-3 max-w-[580px]">
            <p className="font-heading font-normal text-[11px] uppercase tracking-[0.14em] text-text-muted">
              Featured Work
            </p>
            <h2 className="font-heading text-[34px] md:text-[42px] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
              Designs that{' '}
              <span className="text-[#007BFF] dark:text-[#FFD722]">make impact.</span>
            </h2>
            <p className="font-body text-[15px] md:text-base leading-[1.65] text-text-secondary">
              A selection of my recent work across branding, digital, and social design.
            </p>
          </div>

          {/* Right: CTA */}
          <div className="shrink-0">
            <Link
              to="/work-collections"
              onClick={(e) => { e.preventDefault(); navigateWithTransition('/work-collections'); }}
              className="
                group inline-flex items-center gap-2
                font-heading text-[14px] font-medium text-text-primary
                border-b border-border pb-0.5
                transition-[border-color,color] duration-200 ease-[cubic-bezier(.4,0,.2,1)]
                hover:border-text-primary hover:text-[#007BFF] dark:hover:text-[#FFD722]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm
              "
            >
              Explore More Work Collections
              <ArrowRight
                size={15}
                className="
                  transition-transform duration-200 ease-[cubic-bezier(.4,0,.2,1)]
                  group-hover:translate-x-[3px]
                  motion-reduce:transition-none
                "
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* ── Cards grid ─────────────────────────────────────────────────── */}
        {/*
          Layout:
          - Card 01 (wide): spans 2 of 2 cols on sm, 2 of 3 on md
          - Cards 02–05: 1-col mobile, 2-col sm, fills into grid on md
          
          We use a 2-column grid on mobile/sm and 3-column on md+.
          Card 01 is col-span-2 on sm+ and col-span-2 on md (out of 3), 
          while 02-03 each take 1 col. 04-05 each take 1 col on last row.
          Total: 1 wide + 4 normal = fills naturally.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} navigateWithTransition={navigateWithTransition} />
          ))}
        </div>

      </div>
    </section>
  );
}
