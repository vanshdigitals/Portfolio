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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} navigateWithTransition={navigateWithTransition} />
          ))}
        </div>

      </div>
    </section>
  );
}
