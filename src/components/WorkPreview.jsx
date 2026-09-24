import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { usePageTransition } from '../context/TransitionContext';
import { PROJECTS } from '../data/projects';
import { ProjectInnerCarousel, ProjectStaticCard } from './SelectedWork';

// ── Helper to order assets for each brand showcase ─────────────────────────────
// Priority: Interactive Carousels lead, followed by Posters, Reel Covers, Offers, and Branding
function getLandingProjectItems(project) {
  const assets = project.assets;
  if (!assets) return [];

  const items = [];

  // 1. Carousels (interactive multi-slide cards lead for high engagement)
  if (assets.carousels) {
    if (Array.isArray(assets.carousels)) {
      items.push(...assets.carousels);
    } else {
      if (assets.carousels.set1) items.push(...assets.carousels.set1);
      if (assets.carousels.set2) items.push(...assets.carousels.set2);
      if (assets.carousels.dark) items.push(...assets.carousels.dark);
    }
  }

  // 2. Posters (4:5)
  if (assets.posters) items.push(...assets.posters);

  // 3. Reel Covers (9:16)
  if (assets.reelCovers) {
    if (Array.isArray(assets.reelCovers)) {
      items.push(...assets.reelCovers);
    } else {
      if (assets.reelCovers.set1) items.push(...assets.reelCovers.set1);
      if (assets.reelCovers.set2) items.push(...assets.reelCovers.set2);
    }
  }

  // 4. Festival / Combo Offers
  if (assets.festivalOffers) items.push(...assets.festivalOffers);

  // 5. Story Covers
  if (assets.storyCovers) items.push(...assets.storyCovers);

  // 6. Highlight Covers (1:1)
  if (assets.highlightCovers) items.push(...assets.highlightCovers);

  // 7. Branding / Logos (1:1)
  if (assets.branding) items.push(...assets.branding);

  // 8. Festival Creatives
  if (assets.festivalCreatives) items.push(...assets.festivalCreatives);

  return items;
}

// ── Single Brand Showcase Block ────────────────────────────────────────────────
// Visual hierarchy: Brand Name -> Hairline Divider -> Horizontal Work Track
function LandingBrandWorkTrack({ project, prefersReducedMotion }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const items = getLandingProjectItems(project);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (!el) return;

    // Recalculate after render layout stabilizes
    const rafId = requestAnimationFrame(checkScroll);
    const timer = setTimeout(checkScroll, 200);

    window.addEventListener('resize', checkScroll);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, items.length]);

  const scrollTrack = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = Math.max(300, trackRef.current.clientWidth * 0.75);
    trackRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <section aria-labelledby={`brand-${project.id}`} className="flex flex-col gap-4 sm:gap-5">
      {/* ── Brand Header: Name on left, scroll buttons on right ──────────────── */}
      <div className="flex items-baseline justify-between gap-4">
        <h3
          id={`brand-${project.id}`}
          className="font-heading text-[22px] sm:text-[26px] md:text-[30px] font-bold text-text-primary tracking-tight"
        >
          {project.name}
        </h3>

        {/* Scroll Controls (Desktop & Tablet) */}
        {items.length > 1 && (
          <div
            className={`items-center gap-1.5 sm:gap-2 ${!canScrollLeft && !canScrollRight ? 'hidden' : 'flex'}`}
            aria-label={`${project.name} gallery navigation`}
          >
            <button
              type="button"
              onClick={() => scrollTrack(-1)}
              disabled={!canScrollLeft}
              className="w-8 h-8 rounded-full border border-border/70 bg-surface flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label={`Previous ${project.name} work`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(1)}
              disabled={!canScrollRight}
              className="w-8 h-8 rounded-full border border-border/70 bg-surface flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label={`Next ${project.name} work`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ── Hairline Divider: "────────" ─────────────────────────────────────── */}
      <div className="w-full h-px bg-border/60" />

      {/* ── Horizontal Track of Actual Design Cards ──────────────────────────── */}
      <div className="relative w-full">
        <div
          ref={trackRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto snap-x snap-mandatory pb-4 pt-1 gap-4 sm:gap-5 md:gap-6 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {items.map((item, idx) => {
            if (item.slides && item.slides.length > 0) {
              return (
                <ProjectInnerCarousel
                  key={item.id || `${project.id}-carousel-${idx}`}
                  carousel={item}
                  index={idx}
                  prefersReducedMotion={prefersReducedMotion}
                />
              );
            } else {
              const ratio = item.aspect?.replace('aspect-[', '')?.replace(']', '') ?? '1/1';
              return (
                <ProjectStaticCard
                  key={item.id || `${project.id}-static-${idx}`}
                  image={item.url}
                  title={item.title || item.label}
                  type={item.label || 'Design Work'}
                  ratio={ratio}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}

// ── Landing Page Selected Work Section ─────────────────────────────────────────
export default function WorkPreview() {
  const { navigateWithTransition } = usePageTransition();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="work" className="pt-14 md:pt-20 pb-20 md:pb-28 border-b border-border bg-bg">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[96px]">

        {/* ── 1. Main Section Heading + CTA Row ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="flex flex-col gap-2.5 max-w-[580px]">
            <span className="font-body text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              SELECTED WORK
            </span>
            <h2 className="font-heading text-[clamp(34px,3.8vw,52px)] font-light md:font-normal leading-[1.15] tracking-[-0.02em] text-text-primary">
              Work That{' '}
              <span className="text-[#007BFF] dark:text-[#3B93FF]">Speaks.</span>
            </h2>
            <p className="font-body text-[15px] md:text-base leading-[1.65] text-text-secondary">
              A curated showcase of recent client work across social media, branding, and digital design.
            </p>
          </div>

          {/* Right: "Explore More Work Collections" button */}
          <div className="shrink-0">
            <Link
              to="/work-collections"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition('/work-collections');
              }}
              className="
                group inline-flex items-center gap-2.5 sm:gap-3
                h-[42px] pl-5 pr-2 rounded-full
                bg-[#007BFF] hover:bg-[#006AE0] text-white
                font-heading text-[13px] sm:text-[14px] font-medium
                transition-colors duration-200 ease-[cubic-bezier(.4,0,.2,1)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                shadow-sm
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

        {/* ── 2. Brand by Brand Showcase ──────────────────────────────────────── */}
        <div className="flex flex-col gap-14 sm:gap-18 md:gap-24">
          {PROJECTS.map((project) => (
            <LandingBrandWorkTrack
              key={project.id}
              project={project}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* ── 3. Bottom Archive Link CTA ───────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center text-center pt-14 md:pt-20 mt-14 md:mt-20 border-t border-border/60">
          <p className="font-heading text-lg sm:text-xl font-medium text-text-primary mb-2">
            Want to see the complete archive?
          </p>
          <p className="font-body text-sm text-text-secondary max-w-[500px] mb-6">
            Explore all design collections, brand packages, carousel sets, and reel covers in full detail.
          </p>
          <Link
            to="/work-collections"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition('/work-collections');
            }}
            className="
              group inline-flex items-center gap-3
              h-[44px] pl-6 pr-2 rounded-full
              bg-[#007BFF] hover:bg-[#006AE0] text-white
              font-heading text-[14px] font-medium
              transition-colors duration-200 ease-[cubic-bezier(.4,0,.2,1)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              shadow-sm
            "
            aria-label="View All Work Collections"
          >
            <span>View All Work Collections</span>
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
    </section>
  );
}
