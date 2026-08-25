import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

// ── Brand card assets
import imgCutsCurves  from '../assets/card_cuts_curves.jpg';
import imgWaterplane  from '../assets/card_waterplane.jpg';
import imgKeshvi      from '../assets/card_keshvi.jpg';
import imgBuilders    from '../assets/card_builders.jpg';
import imgRanjeet     from '../assets/card_ranjeet.jpg';
import ArchiveCategories from '../components/ArchiveCategories';

// ── Decorative assets
import yellowBadge        from '../assets/Yellow Badge.png';
import blueYellowStars    from '../assets/Blue Yellow Stars.png';
import curveArrow         from '../assets/Stylish Curve Black Arrow.png';
import yellowBrush        from '../assets/Yellow Brush Highlight.png';
import multiDots          from '../assets/Multi Dots Rectangle.png';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const BRANDS = [
  {
    index: '01',
    name: 'Cuts & Curves',
    category: 'Fitness / Social',
    deliverables: ['7 carousels', '60+ reel covers', '8+ posters'],
    heroImg: imgCutsCurves,
    heroAlt: 'Cuts & Curves — brand design work',
    // Placeholder tile labels for remaining deliverable slots
    placeholders: [
      { label: 'Reel Cover', aspect: 'aspect-[9/16]' },
      { label: 'Reel Cover', aspect: 'aspect-[9/16]' },
      { label: 'Carousel', aspect: 'aspect-[4/5]' },
      { label: 'Poster', aspect: 'aspect-[4/5]' },
    ],
    accent: 'text-[#E85D3A]',
    tintLight: 'bg-[#FBF4F1]',
    tintDark: 'dark:bg-[#1E1714]',
  },
  {
    index: '02',
    name: 'Waterplane',
    category: 'Brand / Social',
    deliverables: ['8+ carousels', 'reel covers'],
    heroImg: imgWaterplane,
    heroAlt: 'Waterplane — brand and social media design',
    placeholders: [
      { label: 'Carousel', aspect: 'aspect-[4/5]' },
      { label: 'Reel Cover', aspect: 'aspect-[9/16]' },
      { label: 'Carousel', aspect: 'aspect-[4/5]' },
    ],
    accent: 'text-[#0EA5E9]',
    tintLight: 'bg-[#EDF4FB]',
    tintDark: 'dark:bg-[#0F1820]',
  },
  {
    index: '03',
    name: 'Keshvi Beauty Lounge',
    category: 'Beauty / Branding',
    deliverables: ['Logo + palette', 'carousels', 'festival creatives'],
    heroImg: imgKeshvi,
    heroAlt: 'Keshvi Beauty Lounge — branding and social design',
    placeholders: [
      { label: 'Carousel', aspect: 'aspect-[4/5]' },
      { label: 'Festival Creative', aspect: 'aspect-[4/5]' },
      { label: 'Carousel', aspect: 'aspect-[4/5]' },
    ],
    accent: 'text-[#C48A72]',
    tintLight: 'bg-[#FAF3F0]',
    tintDark: 'dark:bg-[#1C1512]',
  },
  {
    index: '04',
    name: 'Builders Playground',
    category: 'Brand Content',
    deliverables: ['5+ reel covers', '1 poster', '1 carousel', '5 highlight covers'],
    heroImg: imgBuilders,
    heroAlt: 'Builders Playground — brand content design',
    placeholders: [
      { label: 'Reel Cover', aspect: 'aspect-[9/16]' },
      { label: 'Highlight Cover', aspect: 'aspect-[1/1]' },
      { label: 'Highlight Cover', aspect: 'aspect-[1/1]' },
    ],
    accent: 'text-[#D4A100]',
    tintLight: 'bg-[#F8F4E8]',
    tintDark: 'dark:bg-[#1A1910]',
  },
  {
    index: '05',
    name: 'Ranjeet Raj Official',
    category: 'Social / Personal Brand',
    deliverables: ['8 Instagram carousels'],
    heroImg: imgRanjeet,
    heroAlt: 'Ranjeet Raj Official — social media and personal brand design',
    placeholders: [
      { label: 'Carousel', aspect: 'aspect-[4/5]' },
      { label: 'Carousel', aspect: 'aspect-[4/5]' },
      { label: 'Carousel', aspect: 'aspect-[4/5]' },
    ],
    accent: 'text-[#7C3AED]',
    tintLight: 'bg-[#F4F0FA]',
    tintDark: 'dark:bg-[#160E1E]',
  },
];

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
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted select-none">
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
      aria-labelledby={`brand-${brand.index}`}
      className="relative py-14 md:py-20 border-t border-border"
    >
      {/* Sparkle accent (between some blocks) */}
      {showStars && (
        <img
          src={blueYellowStars}
          alt=""
          aria-hidden="true"
          className="absolute -top-5 right-8 w-10 h-10 md:w-14 md:h-14 object-contain opacity-70 select-none pointer-events-none dark:opacity-50"
        />
      )}

      {/* Block header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-12 mb-10 md:mb-14">
        {/* Left */}
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] text-text-muted shrink-0">{brand.index}</span>
            <h2
              id={`brand-${brand.index}`}
              className="font-heading text-[26px] md:text-[32px] font-bold tracking-[-0.02em] text-text-primary leading-tight"
            >
              {brand.name}
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted ml-[26px]">
            {brand.category}
          </span>
        </div>

        {/* Right: deliverable chips */}
        <div className="flex flex-wrap gap-2 md:justify-end shrink-0 ml-[26px] md:ml-0">
          {brand.deliverables.map((d) => (
            <span
              key={d}
              className="
                font-mono text-[11px] tracking-[0.04em] text-text-secondary
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
            ${brand.tintLight} ${brand.tintDark}
            transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(.4,0,.2,1)]
            hover:border-border-strong hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
            dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.28)]
          `}
        >
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={brand.heroImg}
              alt={brand.heroAlt}
              className="
                w-full h-full object-cover
                transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]
                group-hover:scale-[1.02]
                motion-reduce:group-hover:scale-100
              "
              loading="lazy"
            />
          </div>
          {/* Small label bar */}
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
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

        {/* Placeholder tiles */}
        {brand.placeholders.map((p, i) => (
          <PlaceholderTile
            key={i}
            label={p.label}
            aspect={p.aspect}
            tintLight={brand.tintLight}
            tintDark={brand.tintDark}
          />
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
        <div className="relative mb-24 md:mb-32 mt-8 md:mt-12 max-w-[800px] mx-auto text-center">

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

          {/* RIGHT FRAMING: Dots + Badge + Small Star */}
          <img
            src={multiDots}
            alt=""
            aria-hidden="true"
            className="
              hidden md:block absolute -right-4 top-8 w-24
              opacity-25 dark:opacity-15
              select-none pointer-events-none
            "
          />
          <img
            src={yellowBadge}
            alt=""
            aria-hidden="true"
            className="
              hidden md:block absolute -right-28 top-[-10px] w-[180px]
              motion-safe:[animation:badge-spin_20s_linear_infinite]
              select-none pointer-events-none
            "
          />

          {/* Pill Eyebrow */}
          <div className="flex items-center justify-center mb-6 mt-4 md:mt-0">
            <span className="
              font-body font-bold text-[15px] md:text-[22px] uppercase tracking-wider
              px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border-[2.5px] bg-transparent
              text-[#007BFF] border-[#007BFF]
              dark:text-[#FFD722] dark:border-[#FFD722]
              inline-block w-fit max-w-[80vw] overflow-hidden whitespace-nowrap text-ellipsis
            ">
              Work / Visual Archive
            </span>
          </div>

          {/* Oversized Heading */}
          <h1 className="relative font-heading text-[96px] md:text-[160px] font-bold leading-[0.8] tracking-[-0.03em] text-text-primary mb-6">
            Work <br />
            <span className="relative inline-block text-[#007BFF] dark:text-[#FFD722] z-10 animate-sheen mt-[-19px] md:mt-[-43px] pr-2 md:pr-4">
              Collections
              {/* Yellow brush highlight — tight to the word */}
              <img
                src={yellowBrush}
                alt=""
                aria-hidden="true"
                className="
                  absolute -bottom-1 left-[-2%] w-[104%] h-[12px] object-fill
                  opacity-90 dark:opacity-70
                  select-none pointer-events-none -z-10
                "
              />
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="font-body text-[18px] md:text-[22px] leading-[1.6] text-text-secondary max-w-[640px] mx-auto">
            A curated archive of graphic design work created across
            real projects, visual explorations and ongoing practice.
          </p>
          
        </div>

        {/* ── Category Selector + Content ─────────────────────────────────── */}
        <ArchiveCategories />

      </div>
    </main>
  );
}
