import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import ArchiveCategories from '../components/ArchiveCategories';
import { PROJECTS, getDeliverablesString, getFlattenedAssets } from '../data/projects';

// ── Decorative assets
import yellowBadge        from '../assets/yellow-badge.webp';
import blueYellowStars    from '../assets/blue-yellow-stars.webp';
import curveArrow         from '../assets/arrow-stylish-curve-black.webp';
import yellowBrush        from '../assets/yellow-brush-highlight.webp';

// ─────────────────────────────────────────────────────────────────────────────
// Placeholder artwork tile
// ─────────────────────────────────────────────────────────────────────────────
function PlaceholderTile({ label, aspect, tintLight, tintDark }) {
  return (
    <div
      aria-label={`${label} — placeholder, artwork coming soon`}
      className={`
        ${aspect} w-full rounded-[2px] border border-border
        ${tintLight} ${tintDark}
        flex flex-col items-center justify-center gap-2
        transition-colors duration-300
      `}
    >
      <span className="font-heading font-normal text-[10px] uppercase tracking-[0.12em] text-text-muted select-none">
        {label}
      </span>
      <div className="w-6 h-px bg-border" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Individual Brand Block
// ─────────────────────────────────────────────────────────────────────────────
function BrandBlock({ brand, showCurveArrow, showStars }) {
  return (
    <section
      aria-labelledby={`brand-${brand.id}`}
      className="relative py-14 md:py-20 border-t border-border"
    >
      {/* Sparkle accent (between some blocks) */}
      {showStars && (
        <img
          src={blueYellowStars}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="128"
          height="137"
          className="absolute -top-5 right-8 w-10 h-10 md:w-14 md:h-14 object-contain opacity-70 select-none pointer-events-none dark:opacity-50"
        />
      )}

      {/* Block header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-12 mb-10 md:mb-14">
        {/* Left */}
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-baseline gap-3">
            <span className="font-heading font-normal text-[11px] text-text-muted shrink-0">{brand.id}</span>
            <h2
              id={`brand-${brand.id}`}
              className="font-heading text-[26px] md:text-[32px] font-bold tracking-[-0.02em] text-text-primary leading-tight"
            >
              {brand.name}
            </h2>
          </div>
          <span className="font-heading font-normal text-[11px] uppercase tracking-[0.1em] text-text-muted ml-[26px]">
            {brand.category}
          </span>
        </div>

        {/* Right: deliverable chips */}
        <div className="flex flex-wrap gap-2 md:justify-end shrink-0 ml-[26px] md:ml-0">
          {getDeliverablesString(brand.assets).split(' · ').map((d) => (
            <span
              key={d}
              className="
                font-heading font-normal text-[11px] tracking-[0.04em] text-text-secondary
                border border-border px-3 py-1.5 rounded-full
                bg-bg-subtle dark:bg-surface
                whitespace-nowrap
              "
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Curve arrow pointing into first brand grid */}
      {showCurveArrow && (
        <img
          src={curveArrow}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="512"
          height="205"
          className="
            hidden lg:block absolute left-[calc(50%-40px)] top-[68px] w-16 opacity-30
            dark:opacity-60 dark:invert
            select-none pointer-events-none
            rotate-[-20deg]
          "
        />
      )}

      {/* Artwork grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {/* Hero card — spans 2 cols */}
        <article
          className={`
            group relative col-span-2 overflow-hidden border border-border rounded-[2px]
            ${brand.tintLightWC} ${brand.tintDarkWC}
            transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(.4,0,.2,1)]
            hover:border-border-strong hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
            dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.28)]
          `}
        >
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={brand.featuredImage.url}
              alt={brand.featuredImage.alt}
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
          {/* Small label bar */}
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="font-heading font-normal text-[10px] uppercase tracking-[0.1em] text-text-muted">
              {brand.category}
            </span>
            <ArrowUpRight
              size={14}
              className="
                text-text-muted
                transition-[transform,color] duration-200
                group-hover:text-text-primary group-hover:translate-x-[2px] group-hover:-translate-y-[2px]
                motion-reduce:transition-none
              "
              aria-hidden="true"
            />
          </div>
        </article>

        {/* Assets & Placeholder tiles */}
        {getFlattenedAssets(brand.assets).map((asset) => (
          asset.url ? (
            <div key={asset.id} className={`${asset.aspect} w-full rounded-[2px] border border-border overflow-hidden bg-bg-subtle`}>
              <img src={asset.url} alt={asset.label} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ) : (
            <PlaceholderTile
              key={asset.id}
              label={asset.label}
              aspect={asset.aspect}
              tintLight={brand.tintLightWC}
              tintDark={brand.tintDarkWC}
            />
          )
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function WorkCollections() {
  return (
    <main className="min-h-screen bg-bg pt-24 pb-32 overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 xl:px-16">

        {/* ── Intro block (Hero Energy) ───────────────────────────────────── */}
        <div className="relative mb-[20px] md:mb-32 mt-0 md:mt-12 max-w-[800px] mx-auto text-center">

          {/* LEFT FRAMING: Huge Arrow */}
          <img
            src={curveArrow}
            alt=""
            aria-hidden="true"
            className="
              hidden xl:block absolute right-full mr-[26px] top-1/2 -translate-y-1/2 w-64 mt-[120px]
              opacity-60 dark:opacity-80 dark:invert
              select-none pointer-events-none
              scale-x-[-1] -rotate-45
            "
          />

          {/* RIGHT FRAMING: Badge + Small Star */}
          <img
            src={yellowBadge}
            alt=""
            aria-hidden="true"
            width="360"
            height="360"
            className="
              hidden md:block absolute -right-28 top-[-10px] w-[180px]
              motion-safe:[animation:badge-spin_20s_linear_infinite]
              select-none pointer-events-none
            "
          />

          {/* Pill Eyebrow */}
          <div className="flex items-center justify-center mb-5 md:mb-6 mt-0">
            <span className="
              font-heading font-semibold md:font-body md:font-bold text-[11.5px] sm:text-[12px] md:text-[22px] uppercase tracking-wider
              px-3.5 py-[3px] md:px-5 md:py-2.5 rounded-full border-[1.5px] md:border-[2.5px] bg-transparent
              text-[#007BFF] border-[#007BFF]
              dark:text-[#FFD722] dark:border-[#FFD722]
              inline-block w-fit max-w-[80vw] overflow-hidden whitespace-nowrap text-ellipsis
            ">
              Work / Visual Archive
            </span>
          </div>

          {/* Oversized Heading */}
          <h1 className="relative font-heading text-[clamp(64px,19vw,96px)] md:text-[160px] font-bold leading-[0.8] tracking-[-0.04em] text-text-primary mb-4 md:mb-6">
            Work <br />
            <span className="relative inline-block text-[#007BFF] dark:text-[#FFD722] z-10 animate-sheen mt-[-19px] md:mt-[-43px] pr-2 md:pr-4">
              Collections
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="font-body text-[14px] sm:text-[15px] md:text-[22px] leading-[1.6] text-text-secondary max-w-[720px] mx-auto px-2 md:px-0">
            A curated archive of graphic design work created across real projects, visual explorations and ongoing practice. The collection brings together social media designs, carousel systems, brand visuals, and digital content designed to turn ideas into clear, engaging visual communication.
          </p>
          
          {/* Mobile-only "Select My Type of Work" Pill */}
          <div className="flex md:hidden items-center justify-center mt-[40px] md:mt-0">
            <span className="
              font-heading font-semibold text-[clamp(15px,4.8vw,21px)] uppercase tracking-wider
              w-auto px-6 h-[44px] flex items-center justify-center
              rounded-full border-[1.5px] bg-transparent
              text-[#007BFF] border-[#007BFF]
              dark:text-[#FFD722] dark:border-[#FFD722]
              max-w-[90vw] whitespace-nowrap
            ">
              SELECT MY TYPE OF WORK
            </span>
          </div>
          
        </div>

        {/* ── Category Selector + Content ─────────────────────────────────── */}
        <ArchiveCategories />

      </div>
    </main>
  );
}
