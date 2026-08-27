import { useRef, useEffect, useCallback } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import arrowImage from '../assets/arrow-small-black.png';
import creditLight from '../assets/blue-credit-light-mode.png';
import creditDark from '../assets/yellow-credit-dark-mode.png';
// ── Inline SVGs for Brand Icons (Simple Icons)
const IconIg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
  </svg>
);
const IconIn = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const IconBe = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/>
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);
const IconYt = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const textWrapperRef = useRef(null);
  const baseTextRef = useRef(null);
  const hitCanvasRef = useRef(null);
  
  // The user requested to keep the canvas-to-HTML mapping logic intact
  // (the hitCanvasRef generation below) for future architectural use, 
  // but explicitly remove all mouse-tracking effects.
  useEffect(() => {
    let timeout;
    const recompute = async () => {
      // Ensure custom fonts are loaded so canvas text matches DOM visually perfectly
      await document.fonts.ready;
      
      if (!baseTextRef.current || !textWrapperRef.current) return;
      
      const el = baseTextRef.current;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const canvas = document.createElement('canvas');
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      // Scale context to match CSS pixels
      ctx.scale(dpr, dpr);
      
      const style = window.getComputedStyle(el);
      
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.letterSpacing = style.letterSpacing;
      ctx.fillStyle = 'black';
      
      // Exact Baseline Extraction
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.width = '1px';
      span.style.height = '1px';
      span.style.verticalAlign = 'baseline';
      el.appendChild(span);
      
      const spanRect = span.getBoundingClientRect();
      const textRect = el.getBoundingClientRect();
      const baselineY = spanRect.bottom - textRect.top;
      
      el.removeChild(span);

      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('VANSH', 0, baselineY);
      
      hitCanvasRef.current = { canvas, ctx, dpr };
    };
    
    const observer = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(recompute, 150);
    });
    
    if (textWrapperRef.current) observer.observe(textWrapperRef.current);
    recompute();
    
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <footer className="w-full bg-bg rounded-t-[2.5rem] overflow-hidden flex flex-col">
      
      {/* ── BLOCK 1: FOOTER CONTENT ─────────────────────────────────────── */}
      <div className="relative z-20 w-full pt-16 pb-0 flex flex-col">
        {/* ROW 1: 4-COLUMN GRID */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[96px] pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 items-start">
          
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col items-start lg:col-span-1 min-w-max">
            <h3 className="w-max font-heading text-[50px] font-[800] animate-vansh-shine leading-[0.95] tracking-tight pr-2 pb-2 mb-1 mt-0">
              Vansh<br/>Digitals
            </h3>
            <p className="font-body text-sm text-text-muted leading-[1.4] mb-6 max-w-[240px]">
              Crafting visual experiences that connect and communicate.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {[IconIg, IconIn, IconBe, IconX, IconYt].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-[#087EFF] dark:text-text-primary hover:text-[#087EFF] dark:hover:text-brand-yellow hover:border-brand-blue dark:hover:border-brand-yellow transition-colors group">
                  <span className="transition-colors group-hover:text-[#087EFF] dark:group-hover:text-brand-yellow">
                    <Icon />
                  </span>
                </a>
              ))}
            </div>
            <div className="relative mt-5 mb-1 w-full max-w-[240px] md:max-w-[260px] aspect-auto">
              <img 
                src={creditLight} 
                alt="Designed with hard work & dedication" 
                className="w-full h-auto object-contain transition-opacity duration-500 ease-in-out opacity-100 dark:opacity-0"
              />
              <img 
                src={creditDark} 
                alt="Designed with hard work & dedication" 
                className="absolute inset-0 w-full h-auto object-contain transition-opacity duration-500 ease-in-out opacity-0 dark:opacity-100"
              />
            </div>
            <p className="mt-4 font-body text-[11px] text-text-muted leading-tight">
              &copy; {currentYear} Vansh Digitals. All rights reserved.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col items-start">
            <h4 className="font-body text-[15px] uppercase tracking-[0.08em] font-bold text-[#2563EB] dark:text-[#FFD21F] mb-4 leading-none">
              NAVIGATION
            </h4>
            <nav className="flex flex-col gap-3">
              {['Home', 'About', 'Work', 'Skills', 'Experience', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="font-body text-sm text-text-muted hover:text-brand-blue dark:hover:text-brand-yellow transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Work */}
          <div className="flex flex-col items-start">
            <h4 className="font-body text-[15px] uppercase tracking-[0.08em] font-bold text-[#2563EB] dark:text-[#FFD21F] mb-4 leading-none">
              WORK
            </h4>
            <nav className="flex flex-col gap-3">
              {['Selected Work', 'Sample Work', 'Practice Work'].map((item) => (
                <a key={item} href="/work-collections" className="font-body text-sm text-text-muted hover:text-brand-blue dark:hover:text-brand-yellow transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Let's Connect */}
          <div className="flex flex-col items-start">
            <div className="flex flex-col gap-[22px] w-full">
              <a 
                href="#contact" 
                className="group inline-flex h-[44px] items-center justify-center gap-3 self-start rounded-full pl-5 pr-1.5 font-heading text-[15px] font-medium transition-colors duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:bg-[#FFD722] dark:hover:bg-[#E6C200] dark:text-[#111214] bg-[#007BFF] hover:bg-[#006AE0] text-white"
              >
                <span>Let's Talk</span>
                <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-[1.03] bg-white dark:bg-[#111214] flex-shrink-0">
                  <img 
                    src={arrowImage} 
                    alt="" 
                    className="w-[16px] h-[16px] -rotate-45 group-hover:rotate-0 transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none dark:invert" 
                  />
                </div>
              </a>
              
              <div className="flex flex-col gap-3">
                <a href="mailto:vanshdigitalsiscreative@gmail.com" className="group flex items-center gap-1.5 font-body text-[14px] text-text-muted hover:text-brand-blue dark:hover:text-brand-yellow transition-colors">
                  <Mail size={14} className="text-text-primary group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                  <span className="truncate">vanshdigitalsiscreative@gmail.com</span>
                </a>
                <a href="tel:+916393608801" className="group flex items-center gap-1.5 font-body text-[14px] text-text-muted hover:text-brand-blue dark:hover:text-brand-yellow transition-colors">
                  <Phone size={14} className="text-text-primary group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                  <span>+91 63936 08801</span>
                </a>
                <div className="flex items-center gap-1.5 font-body text-[14px] text-text-muted">
                  <MapPin size={14} className="text-text-primary flex-shrink-0" />
                  <span>Raebareli, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>

      {/* ── BLOCK 2: DEDICATED WATERMARK AREA ──────────────────────────── */}
      {/* Sibling block with a constrained height to organically crop the empty top space of the giant font box, completely preserving the original watermark styles and rendering inside. */}
      <div 
        className="relative w-full flex justify-center items-end z-10" 
        style={{ height: 'clamp(150px, 25vw, 600px)' }}
      >
        <div 
          className="relative w-full select-none flex justify-center items-end px-[10px] translate-y-[115px]"
          aria-hidden="true"
        >
        <div 
          ref={textWrapperRef}
          className="relative inline-block translate-y-[20%]"
        >
          {/* Base Layer */}
          <div 
            ref={baseTextRef}
            className="font-heading font-[800] tracking-tighter whitespace-nowrap text-[#111214]/[0.04] dark:text-white/[0.05]"
            style={{ fontSize: 'clamp(200px, 34vw, 850px)' }}
          >
            VANSH
          </div>

          {/* Light Mode Fluid Ink Layer (Blue) */}
          <div 
            className="absolute inset-0 font-heading font-[800] tracking-tighter whitespace-nowrap text-transparent bg-clip-text pointer-events-none dark:hidden animate-ink-fluid"
            style={{ 
              fontSize: 'clamp(200px, 34vw, 850px)',
              backgroundSize: '250% 250%, 300% 300%, 200% 200%, 350% 350%',
              backgroundImage: `
                radial-gradient(ellipse at center, rgba(37, 99, 235, 0.85) 0%, transparent 45%),
                radial-gradient(ellipse at center, rgba(59, 130, 246, 0.75) 0%, transparent 50%),
                radial-gradient(ellipse at center, rgba(96, 165, 250, 0.65) 0%, transparent 55%),
                radial-gradient(ellipse at center, rgba(37, 99, 235, 0.5) 0%, transparent 60%)
              `
            }}
          >
            VANSH
          </div>

          {/* Dark Mode Fluid Ink Layer (Yellow) */}
          <div 
            className="absolute inset-0 font-heading font-[800] tracking-tighter whitespace-nowrap text-transparent bg-clip-text pointer-events-none hidden dark:block animate-ink-fluid"
            style={{ 
              fontSize: 'clamp(200px, 34vw, 850px)',
              backgroundSize: '250% 250%, 300% 300%, 200% 200%, 350% 350%',
              backgroundImage: `
                radial-gradient(ellipse at center, rgba(255, 210, 31, 0.85) 0%, transparent 45%),
                radial-gradient(ellipse at center, rgba(255, 220, 60, 0.75) 0%, transparent 50%),
                radial-gradient(ellipse at center, rgba(255, 230, 90, 0.65) 0%, transparent 55%),
                radial-gradient(ellipse at center, rgba(255, 210, 31, 0.5) 0%, transparent 60%)
              `
            }}
          >
            VANSH
          </div>
        </div>
      </div>
      </div>
      
    </footer>
  );
}
