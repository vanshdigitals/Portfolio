import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, ArrowRight, Menu, X, 
  House, User, Briefcase, PenTool, BadgeCheck, Send, 
  MessageCircle 
} from 'lucide-react';
import AnimatedNavIndicator from './AnimatedNavIndicator';


// ── Nav data ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { name: 'Home',       href: '/#hero',       sectionId: 'hero',       icon: House },
  { name: 'About',      href: '/#about',      sectionId: 'about',      icon: User },
  { name: 'Work',       href: '/#work',       sectionId: 'work',       icon: Briefcase },
  { name: 'Skills',     href: '/#skills',     sectionId: 'skills',     icon: PenTool },
  { name: 'Experience', href: '/#experience', sectionId: 'experience', icon: BadgeCheck },
  { name: 'Kind Words', href: '/#testimonials', sectionId: 'testimonials', icon: MessageCircle },
  { name: 'Contact',    href: '/#contact',    sectionId: 'contact',    icon: Send },
];

// Smooth wave crests per word (exact counts specified by design)
const POINT_COUNTS = [4, 4, 4, 4, 7, 7, 6];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDark,         setIsDark]         = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [activeIndex,    setActiveIndex]    = useState(() => {
    let target = location.hash.replace('#', '');
    if (!target) {
      target = location.pathname.startsWith('/work-collections') ? 'work' : 'hero';
    }
    const idx = NAV_LINKS.findIndex(l => l.sectionId === target);
    return idx >= 0 ? idx : 0;
  });
  const [reducedMotion,  setReducedMotion]  = useState(false);
  const [isDesktop,      setIsDesktop]      = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef       = useRef(null);
  const itemRefs     = useRef([]);
  const hamburgerRef = useRef(null);

  // ── Media Queries ────────────────────────────────────────────────────────
  useEffect(() => {
    // Reduced motion
    const rmSq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(rmSq.matches);
    const onRmChange = (e) => setReducedMotion(e.matches);
    rmSq.addEventListener('change', onRmChange);

    // Desktop breakpoint — full nav only when there is room for all items
    const deskMq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(deskMq.matches);
    const onDeskChange = (e) => {
      setIsDesktop(e.matches);
      if (e.matches) setMobileMenuOpen(false); // auto-close on resize up
    };
    deskMq.addEventListener('change', onDeskChange);

    return () => {
      rmSq.removeEventListener('change', onRmChange);
      deskMq.removeEventListener('change', onDeskChange);
    };
  }, []);

  // ── Theme init ────────────────────────────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    // Default to light mode unless 'dark' is explicitly stored
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  // ── Mobile Menu Effects (Scroll lock, Esc) ─────────────────────────────
  // Track whether close was triggered by keyboard so we only restore
  // focus (and its visible ring) after keyboard interactions, not taps.
  const closeByKeyboard = useRef(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Only programmatically focus the hamburger when closed via keyboard
      // (Esc key). Tapping the close button or backdrop must NOT restore
      // focus to the hamburger — that's what causes the persistent blue ring
      // on Android Chrome, because programmatic .focus() triggers :focus
      // (not just :focus-visible) on touch browsers.
      if (closeByKeyboard.current && hamburgerRef.current) {
        setTimeout(() => hamburgerRef.current?.focus(), 50);
      }
      closeByKeyboard.current = false;
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeByKeyboard.current = true; // mark as keyboard-initiated close
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // ── IntersectionObserver scroll-spy ──────────────────────────────────────
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const isWorkRoute = location.pathname.startsWith('/work-collections');

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        let foundId = null;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            foundId = entry.target.id;
          }
        });

        if (foundId) {
          // If on work-collections page, suppress overriding back to Home if we hit top
          if (isWorkRoute && foundId === 'hero') return;

          const idx = NAV_LINKS.findIndex(l => l.sectionId === foundId);
          if (idx >= 0) {
            setActiveIndex(prev => (prev !== idx ? idx : prev));
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    // Initial check and setup observers
    NAV_LINKS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Set default active based on route/hash
  useEffect(() => {
    let target = location.hash.replace('#', '');
    if (!target) {
      target = location.pathname.startsWith('/work-collections') ? 'work' : 'hero';
    }
    const idx = NAV_LINKS.findIndex(l => l.sectionId === target);
    if (idx >= 0) setActiveIndex(idx);
  }, [location.hash, location.pathname]);

  // ── Click handler ─────────────────────────────────────────────────────────
  const handleNavClick = useCallback((e, link, index) => {
    e.preventDefault();
    setActiveIndex(index);
    navigate(link.href, { replace: true });
    
    isClickScrolling.current = true;
    const target = document.getElementById(link.sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Release scroll-spy lock after smooth scroll settles
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, [navigate]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      
      {/* ── TOP BAR BACKGROUND (Base Layer) ─────────────────────────────── */}
      <div 
        className={`
          absolute top-0 left-0 w-full h-16 lg:h-24 bg-bg z-10
          transition-colors duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)]
          ${scrolled ? 'border-b border-hairline' : 'border-b border-transparent'}
        `}
      />

      {/* ── MOBILE MENU OVERLAY & PANEL (Top Layer) ──────────────────── */}
      {/* Scrim */}
      <div 
        className={`
          fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          lg:hidden
        `}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`
          fixed top-0 right-0 z-[70] h-full w-[80vw] max-w-[320px]
          bg-bg border-l border-hairline shadow-2xl
          flex flex-col
          transition-transform duration-[320ms] ease-[cubic-bezier(.65,0,.35,1)]
          motion-reduce:transition-[opacity] motion-reduce:duration-200
          ${mobileMenuOpen 
            ? 'translate-x-0 motion-reduce:opacity-100' 
            : 'translate-x-full motion-reduce:translate-x-0 motion-reduce:opacity-0 pointer-events-none'}
          lg:hidden
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-16 shrink-0 border-b border-hairline">
          <Link
            to="/#hero"
            onClick={(e) => {
              handleNavClick(e, NAV_LINKS[0], 0);
              setMobileMenuOpen(false);
            }}
            className="group inline-flex items-baseline tracking-[-0.02em] font-heading text-[22px] md:text-[26px] font-extrabold leading-none text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md transition-colors duration-[320ms]"
          >
            Vansh Digitals
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="
              relative w-10 h-10 rounded-full border border-hairline
              flex items-center justify-center text-text-primary
              bg-transparent hover:bg-black/5 dark:hover:bg-white/10
              transition-colors duration-[240ms]
              outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <nav className="flex-1 overflow-y-auto py-8 px-5 flex flex-col gap-3">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeIndex === index;
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link, index);
                  setMobileMenuOpen(false);
                }}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl font-heading text-[16px] font-medium
                  transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  ${isActive 
                    ? 'text-primary bg-primary/5' 
                    : 'text-text-primary hover:bg-black/5 dark:hover:bg-white/5'}
                `}
              >
                <div className="flex items-center justify-center w-6 shrink-0">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-primary' : 'text-text-muted'} />
                </div>
                <span>{link.name}</span>
              </a>
            );
          })}

          <div className="my-4 h-px bg-hairline w-full" />

          {/* View Resume Button */}
          <div className="flex justify-center w-full mb-6">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex h-[44px] w-auto items-center justify-center gap-3
                rounded-full bg-[#007BFF] hover:bg-[#006AE0] text-white
                pl-5 pr-1.5 font-heading text-[15px] font-medium
                transition-colors duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
                outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              <span>Resume</span>
              <div className="
                flex items-center justify-center w-[32px] h-[32px] rounded-full
                transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
                group-hover:scale-[1.03]
                bg-white text-[#111214]
              ">
                <ArrowRight 
                  size={16} 
                  strokeWidth={2}
                  className="
                    -rotate-45 group-hover:rotate-0
                    transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
                    motion-reduce:transition-none
                  "
                />
              </div>
            </a>
          </div>
        </nav>
      </div>

      {/* ── TOP BAR CONTENT (Top Layer) ──────────────────────────────────── */}
      <div className="relative z-40 w-full max-w-[1536px] mx-auto px-4 lg:px-5 xl:px-6 2xl:px-8 h-16 lg:h-24 flex items-center justify-between pointer-events-none">
        
        {/* LEFT: Brand */}
        <div className="flex-1 min-w-0 sm:min-w-[180px] pointer-events-auto">
          <a
            href="/#hero"
            aria-label="Vansh Digitals — home"
            onClick={(e) => {
              handleNavClick(e, NAV_LINKS[0], 0);
              setMobileMenuOpen(false);
            }}
            className="group inline-flex items-baseline tracking-[-0.02em] font-heading text-[22px] lg:text-[26px] font-extrabold leading-none text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md transition-colors duration-[320ms]"
          >
            Vansh Digitals
          </a>
        </div>

        {/* CENTER: Navigation */}
        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative hidden lg:flex items-center h-full pointer-events-auto"
        >
          <ul className="flex items-center gap-4 lg:gap-5 xl:gap-8 2xl:gap-10 pb-3 pt-3">
            {NAV_LINKS.map((link, index) => {
              const isActive = activeIndex === index;
              return (
                <li key={link.name} className="relative flex flex-col items-center">
                  <Link
                    to={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => handleNavClick(e, link, index)}
                    className={`
                      relative font-heading text-[16px] font-medium px-2 py-[6px]
                      tracking-normal whitespace-nowrap
                      transition-colors duration-[180ms] ease-[cubic-bezier(.4,0,.2,1)]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                      focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md
                      motion-reduce:transition-none
                      ${isActive 
                        ? (isDark ? 'text-[#FFD722]' : 'text-[#007BFF]') 
                        : (isDark ? 'text-text-muted hover:text-[#FFD722]' : 'text-text-muted hover:text-[#007BFF]')}
                    `}
                  >
                    <span className="relative z-10" ref={el => { itemRefs.current[index] = el; }}>
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {isDesktop && (
            <AnimatedNavIndicator
              navRef={navRef}
              itemRefs={itemRefs}
              activeIndex={activeIndex}
              pointCounts={POINT_COUNTS}
              reducedMotion={reducedMotion}
              isDark={isDark}
            />
          )}
        </nav>

        {/* RIGHT: Utilities */}
        <div className="flex-1 min-w-0 sm:min-w-[180px] flex items-center justify-end gap-3 sm:gap-4 pointer-events-auto">
          
          {/* Theme toggle (Pill track) */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={isDark}
            className={`
              group relative w-[48px] h-[26px] lg:w-[56px] lg:h-[30px] rounded-full p-[2px] lg:p-[3px]
              border transition-colors duration-[260ms]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-primary focus-visible:ring-offset-2
              focus-visible:ring-offset-bg
              ${isDark ? 'border-[#FFD722] bg-[#FFD722] hover:bg-[#EBC51C]' : 'border-hairline bg-black/5 hover:bg-black/10'}
            `}
          >
            <div 
              className={`
                w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] rounded-full
                shadow-[0_1px_3px_rgba(0,0,0,0.1)]
                flex items-center justify-center
                transition-transform duration-[260ms] ease-[cubic-bezier(.65,0,.35,1)]
                motion-reduce:transition-none
                ${isDark ? 'translate-x-[22px] lg:translate-x-[26px] bg-[#111111] border border-[#111111] text-[#FFD722]' : 'translate-x-0 bg-white border border-black/5 text-[#007BFF]'}
              `}
            >
              <div className="relative flex items-center justify-center w-[14px] h-[14px] lg:w-4 lg:h-4">
                <Sun
                  className={`
                    absolute w-full h-full
                    transition-all duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
                    motion-reduce:transition-none
                    ${isDark ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}
                  `}
                  strokeWidth={2}
                />
                <Moon
                  className={`
                    absolute w-full h-full
                    transition-all duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
                    motion-reduce:transition-none
                    ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'}
                  `}
                  strokeWidth={2}
                />
              </div>
            </div>
          </button>

          {/* Resume pill (desktop only) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group hidden lg:flex h-[44px] items-center justify-center gap-3
              rounded-full pl-5 pr-1.5 font-heading text-[15px] font-medium
              transition-colors duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-primary focus-visible:ring-offset-2
              focus-visible:ring-offset-bg
              ${isDark ? 'bg-[#FFD722] hover:bg-[#E6C200] text-[#111214]' : 'bg-[#007BFF] hover:bg-[#006AE0] text-white'}
            `}
          >
            <span>Resume</span>
            <div className="
              flex items-center justify-center w-[32px] h-[32px] rounded-full
              transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
              group-hover:scale-[1.03]
              bg-white dark:bg-[#111214] text-[#111214] dark:text-white
            ">
              <ArrowRight 
                size={16} 
                strokeWidth={2}
                className="
                  -rotate-45 group-hover:rotate-0
                  transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
                  motion-reduce:transition-none
                "
              />
            </div>
          </a>

          {/* Hamburger button (mobile only) */}
          <button
            ref={hamburgerRef}
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            className="
              lg:hidden relative w-9 h-9 rounded-full border border-hairline
              flex items-center justify-center text-text-primary
              bg-transparent hover:bg-black/5 dark:hover:bg-white/10
              transition-colors duration-[240ms]
              outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
            aria-label="Open menu"
          >
            <Menu className="w-[18px] h-[18px]" />
          </button>
        </div>

      </div>
    </header>
  );
}

