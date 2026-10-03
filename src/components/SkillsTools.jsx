import canvaIconSrc from '../assets/canva-icon.webp';
import photoshopIconSrc from '../assets/photoshop-icon.webp';
import chatgptIconSrc from '../assets/chatgpt-icon.webp';

/* ── Inline SVG Icons (crisp, accurate, controlled dimensions) ─────────────── */

// Canva
const CanvaIcon = () => (
  <img
    src={canvaIconSrc}
    alt="Canva"
    className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px] object-contain rounded-md"
  />
);

// Instagram / Social Media
const SocialMediaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="none">
    <defs>
      <linearGradient id="igGrad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="25%" stopColor="#F77737" />
        <stop offset="50%" stopColor="#F56040" />
        <stop offset="75%" stopColor="#FD1D1D" />
        <stop offset="100%" stopColor="#C13584" />
      </linearGradient>
    </defs>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="url(#igGrad)" strokeWidth="2" />
    <circle cx="12" cy="12" r="4.5" stroke="url(#igGrad)" strokeWidth="2" />
    <circle cx="17.25" cy="6.75" r="1.25" fill="#FD1D1D" />
  </svg>
);

// Carousel
const CarouselIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5.5" y="3" width="13" height="18" rx="2" fill="#2563EB" fillOpacity="0.08" />
    <path d="M2 7v10a2 2 0 002 2" />
    <path d="M22 7v10a2 2 0 01-2 2" />
  </svg>
);

// Reel / Video
const ReelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="none">
    <rect x="2.5" y="3" width="19" height="18" rx="4.5" stroke="#EF4444" strokeWidth="2" fill="#EF4444" fillOpacity="0.08" />
    <path d="M2.5 8.5h19M2.5 15.5h19" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />
    <polygon points="10,9.5 15.5,12 10,14.5" fill="#EF4444" />
  </svg>
);

// Promotional / Festival
const PromoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#F59E0B" fillOpacity="0.15" />
    <path d="M15.5 8.5a5 5 0 010 7" />
    <path d="M19 6a9 9 0 010 12" />
  </svg>
);

// Visual Content
const VisualContentIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="none">
    <rect x="2.5" y="3" width="19" height="18" rx="4" stroke="#10B981" strokeWidth="2" fill="#10B981" fillOpacity="0.1" />
    <circle cx="8" cy="8.5" r="2" fill="#10B981" />
    <path d="M21 16l-5.5-5.5a1.5 1.5 0 00-2.12 0L4 20" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Photoshop
const PhotoshopIcon = () => (
  <img
    src={photoshopIconSrc}
    alt="Photoshop"
    className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] object-contain rounded"
  />
);

// Typography Aa
const TypographyIcon = () => (
  <span className="font-heading font-semibold text-[21px] sm:text-[23px] text-text-primary leading-none select-none tracking-tight">
    Aa
  </span>
);

// Colour palette
const ColourIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px]" fill="none">
    <circle cx="12" cy="8" r="5" stroke="#2563EB" strokeWidth="1.8" />
    <circle cx="8" cy="15" r="5" stroke="#DC2626" strokeWidth="1.8" />
    <circle cx="16" cy="15" r="5" stroke="#EAB308" strokeWidth="1.8" />
  </svg>
);

// Composition layers
const CompositionIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px]" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 2,7 12,12 22,7" fill="#2563EB" fillOpacity="0.12" />
    <polyline points="2,12 12,17 22,12" />
    <polyline points="2,17 12,22 22,17" />
  </svg>
);

// Visual Hierarchy
const HierarchyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px]" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2.5" fill="#2563EB" />
    <path d="M12 6.5v5M12 11.5l-6 4M12 11.5l6 4" />
    <circle cx="6" cy="18" r="2.5" fill="#2563EB" fillOpacity="0.2" />
    <circle cx="18" cy="18" r="2.5" fill="#2563EB" fillOpacity="0.2" />
  </svg>
);

// Layout grid
const LayoutIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px]" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
  </svg>
);

// Figma
const FigmaIcon = () => (
  <svg viewBox="0 0 38 57" className="w-[20px] h-[28px] sm:w-[22px] sm:h-[30px] lg:w-[24px] lg:h-[32px] object-contain">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
  </svg>
);

// HTML
const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]">
    <path d="M3.2 2l1.6 18L12 22l7.2-2L20.8 2H3.2z" fill="#E44D26" />
    <path d="M12 4v16.2l5.8-1.6 1.3-14.6H12z" fill="#F16529" />
    <path d="M7.8 9.2h4.4V7H5.4l.4 5h6.2v2.2L9 15l-.4-1.6H6.2L6.8 18l5.2 1.4V13H7.4l-.4-3.8h5V7" fill="#EBEBEB" />
    <path d="M12 9.2h4.2l-.4 5.2L12 15.6v2.6l5.2-1.4.8-9H12v2z" fill="#fff" />
  </svg>
);

// CSS
const CssIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]">
    <path d="M3.2 2l1.6 18L12 22l7.2-2L20.8 2H3.2z" fill="#1572B6" />
    <path d="M12 4v16.2l5.8-1.6 1.3-14.6H12z" fill="#33A9DC" />
    <path d="M7 9.2h5V7H5l.4 5h6.6v2.2L9 15l-.4-1.6H6.2L6.8 18l5.2 1.4V13H7.4L7 9.2z" fill="#EBEBEB" />
    <path d="M12 9.2h4.6L16 14.4 12 15.6v2.6l5.2-1.4.8-9H12v2z" fill="#fff" />
  </svg>
);

// JavaScript
const JsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]">
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <path d="M6.4 19.2l1.6-1c.3.6.7 1 1.4 1 .7 0 1.2-.4 1.2-1.2v-6.4h2v6.5c0 2-1.2 3-3 3-1.6 0-2.6-.8-3.2-1.9zm7 0l1.6-1c.4.7 1 1.2 1.8 1.2.8 0 1.2-.4 1.2-.9 0-.7-.5-1-1.4-1.4l-.5-.2c-1.4-.6-2.4-1.4-2.4-3 0-1.5 1.2-2.6 3-2.6 1.2 0 2.2.4 2.8 1.6l-1.5 1c-.3-.6-.7-.8-1.2-.8s-.9.3-.9.8c0 .5.3.8 1.2 1.1l.5.2c1.7.7 2.6 1.5 2.6 3.1 0 1.8-1.4 2.8-3.2 2.8-1.8 0-3-.9-3.6-2z" fill="#000" />
  </svg>
);

// Git & GitHub
const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

// ChatGPT
const ChatGPTIcon = () => (
  <img
    src={chatgptIconSrc}
    alt="ChatGPT"
    className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px] object-contain"
  />
);

// Claude (Asterisk Sunburst)
const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="#D97757">
    <circle cx="12" cy="12" r="2.2" />
    <rect x="10.8" y="2" width="2.4" height="6.5" rx="1.2" />
    <rect x="10.8" y="15.5" width="2.4" height="6.5" rx="1.2" />
    <rect x="2" y="10.8" width="6.5" height="2.4" rx="1.2" />
    <rect x="15.5" y="10.8" width="6.5" height="2.4" rx="1.2" />
    <rect x="4.5" y="4.5" width="6" height="2.4" rx="1.2" transform="rotate(45 7.5 5.7)" />
    <rect x="13.5" y="13.5" width="6" height="2.4" rx="1.2" transform="rotate(45 16.5 14.7)" />
    <rect x="13.5" y="4.5" width="6" height="2.4" rx="1.2" transform="rotate(-45 16.5 5.7)" />
    <rect x="4.5" y="13.5" width="6" height="2.4" rx="1.2" transform="rotate(-45 7.5 14.7)" />
  </svg>
);

// Gemini (4-pointed Astroid Gradient Sparkle)
const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="none">
    <path d="M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z" fill="url(#geminiSparkle)" />
    <defs>
      <linearGradient id="geminiSparkle" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1E88E5" />
        <stop offset="50%" stopColor="#7E57C2" />
        <stop offset="100%" stopColor="#EC407A" />
      </linearGradient>
    </defs>
  </svg>
);

// AI Workflows (Pink/Red Sparkles)
const AIWorkflowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="none">
    <path d="M10 2C10 5.866 6.866 9 3 9C6.866 9 10 12.134 10 16C10 12.134 13.134 9 17 9C13.134 9 10 5.866 10 2Z" fill="#EC4899" />
    <path d="M18 13C18 15.209 16.209 17 14 17C16.209 17 18 18.791 18 21C18 18.791 19.791 17 22 17C19.791 17 18 15.209 18 13Z" fill="#F43F5E" />
  </svg>
);

// Website Testing (Monitor)
const WebTestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2.5" fill="#2563EB" fillOpacity="0.08" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);


/* ── Skill Tile ─────────────────────────────────────────────────────────────── */
function SkillTile({ icon, name, sub }) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-lg border border-border/60 dark:border-border bg-surface/80 dark:bg-surface/50 hover:border-border-strong transition-colors select-none">
      {/* Icon container: 38px mobile -> 42px tablet -> 46px desktop with comfortable breathing room */}
      <div className="shrink-0 flex items-center justify-center w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] lg:w-[46px] lg:h-[46px] rounded-lg bg-bg-subtle dark:bg-bg-subtle/60 p-1 sm:p-1.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-heading text-[12.5px] sm:text-[13px] font-semibold text-text-primary leading-tight">
          {name}
        </p>
        {sub && (
          <p className="font-body text-[10.5px] sm:text-[11px] text-text-muted leading-tight mt-0.5">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Developing List Item ───────────────────────────────────────────────────── */
function DevListItem({ icon, name, badge }) {
  return (
    <div className="flex items-center gap-3.5 py-2.5 sm:py-3 border-b border-border/40 dark:border-border/50 last:border-b-0 select-none">
      {/* Developing list icon container: 28px - 32px consistent alignment */}
      <div className="shrink-0 flex items-center justify-center w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] text-text-secondary">
        {icon}
      </div>
      <span className="font-heading text-[13px] sm:text-[13.5px] font-semibold text-text-primary leading-tight flex-1">
        {name}
      </span>
      {badge && (
        <span className="font-body text-[10px] sm:text-[10.5px] font-medium text-text-muted border border-border/70 dark:border-border rounded px-1.5 py-0.5 leading-none select-none">
          {badge}
        </span>
      )}
    </div>
  );
}


/* ── Quadrant Header (Number + Divider + Heading) ───────────────────────────── */
function QuadrantHeader({ num, label, heading }) {
  return (
    <div className="flex items-start gap-3.5 sm:gap-4 mb-5 sm:mb-6">
      {/* Large editorial number */}
      <span className="font-heading font-semibold text-[38px] sm:text-[44px] lg:text-[50px] leading-none text-[#007BFF]/25 dark:text-[#3B93FF]/20 select-none tracking-tight shrink-0">
        {num}
      </span>
      {/* Thin vertical divider */}
      <div className="w-px self-stretch bg-border/80 dark:bg-border shrink-0 mt-1 mb-0.5" />
      {/* Label + heading */}
      <div className="min-w-0 pt-0.5">
        <span className="font-heading text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted block leading-tight">
          {label}
        </span>
        <h4 className="font-heading text-[17px] sm:text-[19px] lg:text-[21px] font-bold text-text-primary leading-snug mt-0.5">
          {heading}
        </h4>
      </div>
    </div>
  );
}


/* ── Main Component ─────────────────────────────────────────────────────────── */
export default function SkillsTools() {
  return (
    <section id="skills" className="w-full bg-bg py-16 md:py-24 border-b border-border">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[96px]">

        {/* ── Section Header ── */}
        <div className="mb-12 md:mb-16 text-center">
          <span className="font-body text-[11px] md:text-[12px] font-semibold tracking-[0.2em] text-text-muted uppercase mb-3 block">
            SKILLS & TOOLS
          </span>
          <h2 className="font-heading text-[clamp(34px,4vw,54px)] font-light md:font-normal text-text-primary leading-[1.15] tracking-[-0.02em] max-w-3xl mx-auto">
            What I{' '}
            <span className="text-[#007BFF] dark:text-[#3B93FF]">Work</span> With
          </h2>
          <p className="font-body text-[15px] md:text-base leading-[1.65] text-text-secondary max-w-xl mx-auto mt-3">
            Primary / Developing / Basic / Supporting tiers. NO percentage bars.
          </p>
        </div>

        {/* ── 2×2 Editorial Grid ── */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-2 relative">

          {/* ── Vertical center divider (desktop only) ── */}
          <div className="hidden min-[900px]:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border/70 dark:bg-border/50" />

          {/* ── Horizontal center divider (desktop only) ── */}
          <div className="hidden min-[900px]:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border/70 dark:bg-border/50" />


          {/* ── 01: PRIMARY ── */}
          <div className="min-[900px]:pr-8 lg:pr-12 min-[900px]:pb-8 lg:pb-12 pb-8">
            <QuadrantHeader num="01" label="PRIMARY" heading="Core Design Capabilities" />
            <div className="grid grid-cols-2 min-[480px]:grid-cols-3 gap-2.5 sm:gap-3">
              <SkillTile icon={<CanvaIcon />} name="Canva" sub="3+ Years" />
              <SkillTile icon={<SocialMediaIcon />} name="Social Media Design" />
              <SkillTile icon={<CarouselIcon />} name="Instagram Carousel Design" />
              <SkillTile icon={<ReelIcon />} name="Reel Cover Design" />
              <SkillTile icon={<PromoIcon />} name="Promotional & Festival Creatives" />
              <SkillTile icon={<VisualContentIcon />} name="Visual Content Design" />
            </div>
          </div>

          {/* ── Mobile separator ── */}
          <div className="min-[900px]:hidden h-px bg-border/60 dark:bg-border/50 mb-8" />

          {/* ── 02: DEVELOPING ── */}
          <div className="min-[900px]:pl-8 lg:pl-12 min-[900px]:pb-8 lg:pb-12 pb-8">
            <QuadrantHeader num="02" label="DEVELOPING" heading="Expanding My Skills" />
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-6 sm:gap-x-8">
              {/* Left list */}
              <div>
                <DevListItem icon={<PhotoshopIcon />} name="Adobe Photoshop" badge="Basic" />
                <DevListItem icon={<TypographyIcon />} name="Typography" />
                <DevListItem icon={<ColourIcon />} name="Colour" />
              </div>
              {/* Right list */}
              <div>
                <DevListItem icon={<CompositionIcon />} name="Composition" />
                <DevListItem icon={<HierarchyIcon />} name="Visual Hierarchy" />
                <DevListItem icon={<LayoutIcon />} name="Layout & Spacing" />
              </div>
            </div>
          </div>

          {/* ── Mobile separator ── */}
          <div className="min-[900px]:hidden h-px bg-border/60 dark:bg-border/50 mb-8" />

          {/* ── 03: BASIC ── */}
          <div className="min-[900px]:pr-8 lg:pr-12 min-[900px]:pt-8 lg:pt-12 pb-8 min-[900px]:pb-0">
            <QuadrantHeader num="03" label="BASIC" heading="Foundational & Tech Skills" />
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <SkillTile icon={<FigmaIcon />} name="Figma" sub="Basic knowledge" />
              <SkillTile icon={<HtmlIcon />} name="HTML" sub="Basic knowledge" />
              <SkillTile icon={<CssIcon />} name="CSS" sub="Basic knowledge" />
              <SkillTile icon={<JsIcon />} name="JavaScript" sub="Basic familiarity" />
              <SkillTile icon={<GitIcon />} name="Git & GitHub" sub="Basic familiarity" />
            </div>
          </div>

          {/* ── Mobile separator ── */}
          <div className="min-[900px]:hidden h-px bg-border/60 dark:bg-border/50 mb-8" />

          {/* ── 04: SUPPORTING ── */}
          <div className="min-[900px]:pl-8 lg:pl-12 min-[900px]:pt-8 lg:pt-12">
            <QuadrantHeader num="04" label="SUPPORTING" heading="AI & Other Tools" />
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <SkillTile icon={<ChatGPTIcon />} name="ChatGPT" />
              <SkillTile icon={<ClaudeIcon />} name="Claude" />
              <SkillTile icon={<GeminiIcon />} name="Gemini" />
              <SkillTile icon={<AIWorkflowIcon />} name="AI-Assisted Design Workflows" />
              <SkillTile icon={<WebTestIcon />} name="Website Testing & Visual Review" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
