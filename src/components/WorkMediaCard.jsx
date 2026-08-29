import { useState } from 'react';
import { Smartphone } from 'lucide-react';
import InstagramMockup from './InstagramMockup';

/**
 * Universal Work Media Card shell (mobile media collections + carousels).
 *
 * Separation of concerns:
 *   - This shell owns the surface, spacing, content hierarchy and the bottom control area.
 *   - The MEDIA / IMAGE FRAME is passed as `children` (a single <img> or a sliding
 *     carousel track), so physics/state stay in the caller.
 *   - Carousel-only controls (counter + prev/next) are passed via `controls`.
 *
 * Ratio is data, never a per-project conditional. Frame HEIGHT is fixed so cards in a
 * collection share overall height and align; the frame WIDTH is derived from `ratio`
 * (centered), so artwork keeps its true aspect ratio — never stretched, never cropped
 * (the frame matches the art ratio, so object-cover fills exactly).
 */
export default function WorkMediaCard({
  ratio = '4/5',
  type,
  title,
  description,
  controls,
  mockup = true,
  media = [],
  children,
}) {
  const [mockupOpen, setMockupOpen] = useState(false);
  return (
    <div className="snap-start shrink-0 flex flex-col h-full w-[clamp(240px,80vw,320px)] rounded-2xl overflow-hidden bg-surface border border-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-14px_rgba(0,0,0,0.14)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_12px_32px_-14px_rgba(0,0,0,0.55)]">
      {/* Image frame — fills card width with balanced padding; height derives from ratio */}
      <div className="p-[14px]">
        <div
          className="w-full rounded-xl overflow-hidden border border-border/20 bg-bg relative"
          style={{ aspectRatio: ratio }}
        >
          {children}
        </div>
      </div>

      {/* Content area — absorbs extra space, keeps the control area anchored */}
      <div className="px-[18px] pt-1 flex-1 flex flex-col">
        {type && (
          <p className="font-heading font-normal text-[11px] text-text-muted uppercase tracking-[0.08em] mb-1">
            {type}
          </p>
        )}
        {/* Reserve 2 lines so 1- and 2-line titles keep cards in a collection the same height */}
        <p className="font-heading text-[15px] font-bold text-text-primary leading-snug line-clamp-2 min-h-[2.7em]">
          {title}
        </p>
        {description && (
          <p className="font-body text-[12px] text-text-secondary leading-relaxed mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Control area — anchored to the bottom */}
      <div className="px-[18px] pt-3 pb-[18px] mt-auto flex flex-col gap-3">
        {controls && (
          <div className="flex items-center justify-between border-t border-border/40 pt-3 w-full">
            {controls}
          </div>
        )}
        {mockup && (
          <div className="w-full flex justify-center mt-1">
            <button
              type="button"
              onClick={() => media.length && setMockupOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-bg/50 text-[11px] font-heading font-medium text-text-secondary transition-colors hover:bg-black/5 dark:hover:bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Smartphone size={13} />
              Mobile Mockup View
            </button>
          </div>
        )}
        {mockupOpen && (
          <InstagramMockup
            media={media}
            ratio={ratio}
            title={title}
            type={type}
            onClose={() => setMockupOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
