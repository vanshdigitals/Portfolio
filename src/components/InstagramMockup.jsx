import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Heart, MessageCircle, Send, Bookmark, Home, Search, PlusSquare, User, X } from 'lucide-react';

/**
 * Universal Instagram-style Mobile Mockup — an additional presentation layer.
 * Opens over the card (card is never replaced/hidden). Data-driven, no project conditionals.
 *
 * Props:
 *  - media: string[]  (1 item = single post, N items = carousel — count/counter derive from length)
 *  - ratio: e.g. "4/5" | "1/1" | "3/4" | "9/16" (media frame adapts; artwork keeps true ratio)
 *  - title, type: caption text (real card data)
 *  - onClose
 */
export default function InstagramMockup({ media = [], ratio = '4/5', title = '', type = '', onClose }) {
  const slides = media.length ? media : [''];
  const total = slides.length;
  const isCarousel = total > 1;

  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const reduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const touchStart = useRef({ x: 0, y: 0 });
  const interactTimer = useRef(null);
  const closeBtnRef = useRef(null);
  const SWIPE_THRESHOLD = 50;

  // ── Open lifecycle: focus, ESC, scroll lock (restored on close, no jump) ──
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (interactTimer.current) clearTimeout(interactTimer.current);
    };
  }, [onClose]);

  const markInteract = useCallback(() => {
    setIsInteracting(true);
    if (interactTimer.current) clearTimeout(interactTimer.current);
    interactTimer.current = setTimeout(() => setIsInteracting(false), 5000);
  }, []);

  const goTo = useCallback((idx) => {
    if (isTransitioning || idx < 0 || idx >= total) return;
    markInteract();
    setActive(idx);
    if (reduced) return;
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 320);
  }, [isTransitioning, total, markInteract, reduced]);

  // ── Controlled 1:1 swipe — one gesture = one slide (matches card physics) ──
  const onTouchStart = (e) => {
    markInteract();
    if (isTransitioning) return;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchMove = (e) => {
    if (isTransitioning || !isCarousel) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    if (!isDragging && Math.abs(dx) <= Math.abs(dy)) return;
    if (!isDragging) setIsDragging(true);
    setDragOffset(dx);
  };
  const onTouchEnd = () => {
    if (isTransitioning) return;
    const dx = dragOffset;
    setIsDragging(false);
    setDragOffset(0);
    if (dx <= -SWIPE_THRESHOLD) goTo(active + 1);
    else if (dx >= SWIPE_THRESHOLD) goTo(active + -1);
  };

  // ── Autoplay: hold → move → hold, stop at last (no loop) ──
  useEffect(() => {
    if (reduced || !isCarousel || isInteracting) return;
    if (active >= total - 1) return; // stop at last, no loop
    const t = setTimeout(() => setActive((a) => Math.min(a + 1, total - 1)), 3000);
    return () => clearTimeout(t);
  }, [active, isCarousel, isInteracting, reduced, total]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — Instagram mockup preview`}
    >
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Close mockup"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X size={20} />
      </button>

      {/* PHONE — proportionally stable; only the media area adapts to ratio */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[min(86vw,340px)] max-h-[92vh] flex flex-col overflow-hidden rounded-[2.4rem] border-[6px] border-[#0d0d0f] bg-surface shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* dynamic island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#0d0d0f] z-20" aria-hidden="true" />

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="h-7" aria-hidden="true" />

          {/* IG post header */}
          <div className="flex items-center gap-2.5 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-border to-border-strong shrink-0" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="font-body text-[13px] font-semibold text-text-primary leading-none truncate">vanshdigitals</p>
              {type && <p className="font-body text-[11px] text-text-muted leading-none mt-1 truncate">{type}</p>}
            </div>
            <div className="flex gap-[3px]" aria-hidden="true">
              <span className="w-1 h-1 rounded-full bg-text-muted" />
              <span className="w-1 h-1 rounded-full bg-text-muted" />
              <span className="w-1 h-1 rounded-full bg-text-muted" />
            </div>
          </div>

          {/* MEDIA — dynamic ratio, artwork never stretched/cropped (frame matches art) */}
          <div className="relative w-full bg-bg overflow-hidden" style={{ aspectRatio: ratio }}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <div
              className={`flex w-full h-full touch-pan-y ${!reduced && !isDragging ? 'transition-transform duration-[320ms] ease-[cubic-bezier(.22,1,.36,1)]' : ''}`}
              style={{ transform: `translateX(calc(${active * -100}% + ${dragOffset}px))` }}
            >
              {slides.map((src, i) => (
                <div key={i} className="w-full h-full shrink-0 relative">
                  <img src={src} alt={`${title} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable="false" />
                </div>
              ))}
            </div>
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/55 text-white text-[11px] font-body font-medium">
              {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </div>

          {/* carousel dots */}
          {isCarousel && (
            <div className="flex items-center justify-center gap-1.5 py-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === active ? 'w-1.5 bg-primary' : 'w-1.5 bg-border-strong'}`}
                />
              ))}
            </div>
          )}

          {/* action row */}
          <div className="flex items-center justify-between px-3 pt-1.5 pb-1 text-text-primary">
            <div className="flex items-center gap-4">
              <Heart size={22} strokeWidth={1.8} />
              <MessageCircle size={22} strokeWidth={1.8} />
              <Send size={22} strokeWidth={1.8} />
            </div>
            <Bookmark size={22} strokeWidth={1.8} />
          </div>

          {/* caption (real card data) */}
          <div className="px-3 pb-4">
            <p className="font-body text-[13px] leading-relaxed text-text-primary">
              <span className="font-semibold">vanshdigitals</span>{' '}
              {title}
            </p>
          </div>
        </div>

        {/* IG bottom nav */}
        <div className="flex items-center justify-around px-3 py-2.5 border-t border-border bg-surface text-text-primary" aria-hidden="true">
          <Home size={20} strokeWidth={1.8} />
          <Search size={20} strokeWidth={1.8} />
          <PlusSquare size={20} strokeWidth={1.8} />
          <Heart size={20} strokeWidth={1.8} />
          <User size={20} strokeWidth={1.8} />
        </div>
      </div>
    </div>,
    document.body
  );
}
