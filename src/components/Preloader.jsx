import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const str1 = "VANSH DIGITALS".split("");
const str2 = "PORTFOLIO".split("");
const maxLength = Math.max(str1.length, str2.length);

function FlipChar({ char1, char2, isFlipped, isCentered, index }) {
  const isDisappearing = !char2;
  
  return (
    <motion.div 
      layout
      animate={{ 
        rotateX: isFlipped ? -180 : 0,
        opacity: (isFlipped && isDisappearing) ? 0 : 1,
      }}
      transition={{ 
        rotateX: { duration: 0.9, delay: index * 0.06, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.9, delay: index * 0.06, ease: [0.65, 0, 0.35, 1] },
        layout: { duration: 0.8, ease: [0.65, 0, 0.35, 1] }
      }}
      className="relative flex items-center justify-center"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* INVISIBLE RELATIVE SPACER TO DICTATE EXACT WIDTH */}
      {/* Before isCentered, this strictly holds the char1 footprint. After isCentered, it holds char2 footprint (which may be empty). */}
      <motion.span 
        layout
        className={isCentered ? "font-furgatorio" : "font-sans font-medium tracking-[0.1em] uppercase"}
        style={{ visibility: 'hidden', pointerEvents: 'none' }}
      >
        {isCentered ? (char2 === " " ? "\u00A0" : char2) : (char1 === " " ? "\u00A0" : char1)}
      </motion.span>

      {/* FRONT: VANSH DIGITALS (sans-serif) */}
      <motion.span 
        initial={{ rotateX: 0 }}
        className="font-sans font-medium tracking-[0.1em] uppercase absolute inset-0 flex items-center justify-center"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {char1 === " " ? "\u00A0" : char1}
      </motion.span>

      {/* BACK: PORTFOLIO (furgatorio) */}
      <motion.span 
        initial={{ rotateX: -180 }}
        className="font-furgatorio absolute inset-0 flex items-center justify-center"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {char2 === " " ? "\u00A0" : char2}
      </motion.span>
    </motion.div>
  );
}

export default function Preloader({ onComplete }) {
  const [step, setStep] = useState(0);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStep(1), 400); // Start wave (flips in place)
    const t2 = setTimeout(() => setStep(2), 2200); // Re-center layout shift (after wave completes)
    const t3 = setTimeout(() => setStep(3), 3200); // Start circle expansion (after layout settles and holds)
    const t4 = setTimeout(() => {
      onComplete();
    }, 4100); // Unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--primary)] w-[100vw] h-[100dvh] flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* Expanding white circular wipe */}
      <motion.div 
        className="absolute z-10 bg-white rounded-full pointer-events-none"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={
          step >= 3 
            ? { width: '250vmax', height: '250vmax' } 
            : { width: 0, height: 0 }
        }
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ 
          top: '50%', left: '50%', 
          x: '-50%', y: '-50%' 
        }}
      />

      {/* Typography container */}
      <div className="relative z-20 flex items-center justify-center w-full px-[30px] perspective-[1200px]">
        <motion.div 
          layout
          transition={{ layout: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
          className="flex items-center justify-center text-white leading-none m-0 select-none whitespace-nowrap text-[clamp(20px,8.5vw,150px)]"
        >
          {Array.from({ length: maxLength }).map((_, i) => {
             const char1 = str1[i] || "";
             const char2 = str2[i] || "";
             return <FlipChar key={i} char1={char1} char2={char2} isFlipped={step >= 1} isCentered={step >= 2} index={i} />;
          })}
        </motion.div>
      </div>

    </div>
  );
}
