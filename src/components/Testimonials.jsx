import { Quote } from 'lucide-react';

const TESTIMONIALS_DATA = [
  { id: 1, textLines: 3, nameWidth: 'w-24', roleWidth: 'w-32' },
  { id: 2, textLines: 4, nameWidth: 'w-32', roleWidth: 'w-24' },
  { id: 3, textLines: 3, nameWidth: 'w-28', roleWidth: 'w-36' },
  { id: 4, textLines: 2, nameWidth: 'w-20', roleWidth: 'w-28' },
  { id: 5, textLines: 4, nameWidth: 'w-36', roleWidth: 'w-20' },
  { id: 6, textLines: 3, nameWidth: 'w-24', roleWidth: 'w-40' },
  { id: 7, textLines: 2, nameWidth: 'w-32', roleWidth: 'w-32' },
  { id: 8, textLines: 3, nameWidth: 'w-28', roleWidth: 'w-24' },
];

function SkeletonCard({ data }) {
  return (
    <div className="vintage-notch shrink-0 w-[300px] md:w-[340px] p-[24px] md:p-[26px] rounded-[18px] bg-[#007BFF] dark:bg-[#FFD722] shadow-[-8px_8px_22px_rgba(0,0,0,0.14)] flex flex-col justify-between h-[220px]">
      <div>
        <Quote className="text-white/40 dark:text-[#111214]/30 w-6 h-6 mb-4" fill="currentColor" />
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: data.textLines }).map((_, i) => (
            <div 
              key={i} 
              className={`h-2.5 rounded-full bg-white/30 dark:bg-[#111214]/20 ${
                i === data.textLines - 1 ? 'w-[75%]' : 'w-full'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full bg-white/30 dark:bg-[#111214]/20 shrink-0" />
        <div className="flex flex-col gap-2">
          <div className={`h-2.5 rounded-full bg-white/40 dark:bg-[#111214]/30 ${data.nameWidth}`} />
          <div className={`h-2 rounded-full bg-white/20 dark:bg-[#111214]/15 ${data.roleWidth}`} />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1Data = TESTIMONIALS_DATA.slice(0, 4);
  const row2Data = TESTIMONIALS_DATA.slice(4, 8);

  return (
    <section id="testimonials" className="w-full bg-bg pt-20 pb-12 overflow-hidden relative">
      
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[96px] relative z-10 mb-16 text-center">
        {/* Decorative Quote Background */}
        <div 
          aria-hidden="true" 
          className="absolute left-1/2 -translate-x-1/2 top-[-20%] text-[240px] leading-none font-heading font-extrabold text-[#007BFF]/10 dark:text-[#FFD722]/10 select-none pointer-events-none"
        >
          &ldquo;
        </div>

        <span className="font-body text-sm font-bold tracking-[0.2em] text-text-muted uppercase mb-4 block relative z-10">
          What Clients Say
        </span>
        <h2 className="font-heading text-[clamp(32px,4vw,56px)] font-extrabold text-[#111214] dark:text-white leading-[1.1] relative z-10 max-w-3xl mx-auto">
          Kind words from people I've{' '}
          <span className="text-[#007BFF] dark:text-[#FFD722] relative inline-block whitespace-nowrap">
            worked with.
            {/* Brush underline (Reused style from Hero) */}
            <span className="absolute -bottom-2 left-0 w-full h-[12px] bg-[url('/assets/yellow-brush-highlight.webp')] bg-no-repeat bg-center bg-contain -z-10 opacity-60 dark:opacity-100 hidden dark:block" aria-hidden="true"></span>
          </span>
        </h2>
      </div>

      <div className="w-full flex flex-col gap-6 relative">
        {/* Left/Right Fade Gradients for smooth marquee entry/exit */}
        <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-bg to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-bg to-transparent z-20 pointer-events-none" />

        {/* ROW 1: Moves Left */}
        <div className="group flex overflow-hidden w-full">
          {/* We duplicate the track exactly twice to create a seamless 50% loop.
              The animation duration defines the speed. */}
          <div 
            className="flex w-max gap-6 px-3 motion-reduce:transform-none animate-[marquee-left_42s_linear_infinite] group-hover:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {[...row1Data, ...row1Data].map((item, i) => (
              <SkeletonCard key={`${item.id}-${i}`} data={item} />
            ))}
          </div>
        </div>

        {/* ROW 2: Moves Right */}
        <div className="group flex overflow-hidden w-full">
          <div 
            className="flex w-max gap-6 px-3 motion-reduce:transform-none animate-[marquee-right_46s_linear_infinite] group-hover:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {[...row2Data, ...row2Data].map((item, i) => (
              <SkeletonCard key={`${item.id}-${i}`} data={item} />
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
}
