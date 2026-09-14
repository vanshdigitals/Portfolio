import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { PROJECTS, getDeliverablesString } from '../data/projects';

// ── Individual Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, navigateWithTransition }) {
  return (
    <article
      className={`
        group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border
        transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(.4,0,.2,1)]
        hover:border-border-strong hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)]
        dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
        focus-within:border-border-strong focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.07)]
        ${project.tint} ${project.tintDark}
      `}
    >
      {/* Artwork — dominant top section */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-bg-subtle shrink-0">
        <img
          src={project.featuredImage.url}
          alt={project.featuredImage.alt}
          className="
            block w-full h-full object-cover object-center
            transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)]
            group-hover:scale-[1.03]
            motion-reduce:group-hover:scale-100
          "
          loading="lazy"
        />
      </div>

      {/* Card body */}
      <div className="flex items-start justify-between gap-4 p-5 md:p-6 pb-6 md:pb-8 grow">
        <div className="flex flex-col gap-1.5 min-w-0">
          {/* Index + category on one line */}
          <div className="flex items-center gap-2.5">
            <span className="font-heading font-semibold text-[12px] text-text-muted shrink-0">{project.id}</span>
            <div className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
            <span className="font-heading font-semibold text-[12px] uppercase tracking-[0.08em] text-text-muted">
              {project.category}
            </span>
          </div>
          {/* Client name */}
          <h3 className="font-heading text-[20px] md:text-[22px] font-bold text-text-primary leading-tight tracking-tight mt-1 group-hover:text-[#007BFF] dark:group-hover:text-[#FFD722] transition-colors">
            {project.name}
          </h3>
          {/* Deliverables */}
          <p className="font-body text-[14px] text-text-secondary leading-relaxed mt-1">
            {getDeliverablesString(project.assets)}
          </p>
        </div>

        {/* Arrow — slides on hover */}
        <div className="shrink-0 pt-1 md:pt-2">
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
    <section id="work" className="pt-14 md:pt-20 pb-20 md:pb-28 border-b border-border bg-bg">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[96px]">

        {/* ── 1. Main Section Heading ───────────────────────────────────────── */}
        <div className="flex flex-col gap-2.5 max-w-[580px] mb-8 md:mb-10">
          <span className="font-body text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            FEATURED WORK
          </span>
          <h2 className="font-heading text-[clamp(34px,3.8vw,52px)] font-light md:font-normal leading-[1.15] tracking-[-0.02em] text-text-primary">
            Work That{' '}
            <span className="text-[#007BFF] dark:text-[#3B93FF]">Speaks.</span>
          </h2>
          <p className="font-body text-[15px] md:text-base leading-[1.65] text-text-secondary">
            A selection of my recent work across branding, digital, and social design.
          </p>
        </div>

        {/* ── 2. Category Label + CTA Row ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8 w-full">
          {/* Left: Category Label */}
          <div className="flex items-center">
            <span className="font-heading text-[16px] md:text-[18px] font-medium text-text-primary tracking-[-0.01em]">
              Social Media Designs
            </span>
          </div>

          {/* Right: Compact Pill CTA (Resume / Explore My Work button family) */}
          <div className="shrink-0 flex sm:justify-end">
            <Link
              to="/work-collections"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition('/work-collections');
              }}
              className="
                group inline-flex items-center gap-2.5 sm:gap-3
                h-[40px] pl-4.5 pr-1.5 rounded-full
                bg-[#007BFF] hover:bg-[#006AE0] text-white
                font-heading text-[13px] sm:text-[14px] font-medium
                transition-colors duration-200 ease-[cubic-bezier(.4,0,.2,1)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
              aria-label="Explore More Work Collections"
            >
              <span>Explore More Work Collections</span>
              <div className="
                flex items-center justify-center w-[28px] h-[28px] rounded-full
                bg-white text-[#111214] shrink-0
              ">
                <ArrowRight
                  size={14}
                  strokeWidth={2.2}
                  className="transition-transform duration-200 ease-[cubic-bezier(.4,0,.2,1)] group-hover:translate-x-[2px]"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* ── 3. Cards grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-stretch">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} navigateWithTransition={navigateWithTransition} />
          ))}
        </div>

      </div>
    </section>
  );
}
