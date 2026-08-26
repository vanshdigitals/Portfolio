import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const str1 = "VANSH DIGITALS".split("");
const str2 = "PORTFOLIO".split("");
const offset = (str1.length - str2.length) / 2; // Mathematically aligns the center wave

function OldChar({ char, index, isFlipped }) {
  return (
    <motion.span
      className="inline-block"
      style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
      initial={{ rotateX: 0 }}
      animate={{ 
        rotateX: isFlipped ? -180 : 0 
      }}
      transition={{ 
        duration: 0.9, 
        delay: index * 0.06, 
        ease: [0.65, 0, 0.35, 1] 
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

function NewChar({ char, index, isFlipped }) {
  return (
    <motion.span
      className="inline-block"
      style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
      initial={{ rotateX: 180 }}
      animate={{ 
        rotateX: isFlipped ? 0 : 180 
      }}
      transition={{ 
        duration: 0.9, 
        delay: (index + offset) * 0.06, 
        ease: [0.65, 0, 0.35, 1] 
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
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

    const t1 = setTimeout(() => setStep(1), 400); // Start wave
    const t2 = setTimeout(() => setStep(2), 2200); // Completely remove VANSH DIGITALS from DOM
    const t3 = setTimeout(() => setStep(3), 2600); // Start circle expansion
    const t4 = setTimeout(() => {
      onComplete();
    }, 3400); // Unmount

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

      {/* ONE CENTERED TYPOGRAPHY STAGE */}
      <div className="relative z-20 w-full px-[30px] perspective-[1200px] grid place-items-center">
        
        {/* OLD: VANSH DIGITALS */}
        {step < 2 && (
          <div 
            className="flex items-center justify-center text-white font-furgatorio tracking-tight leading-none m-0 select-none whitespace-nowrap text-[clamp(16px,6.5vw,130px)]"
            style={{ gridArea: '1/1' }}
          >
            {str1.map((char, i) => (
              <OldChar key={`old-${i}`} char={char} index={i} isFlipped={step >= 1} />
            ))}
          </div>
        )}

        {/* NEW: PORTFOLIO (Centered from frame 1) */}
        <div 
          className="flex items-center justify-center text-white font-furgatorio tracking-tight leading-none m-0 select-none whitespace-nowrap text-[clamp(16px,6.5vw,130px)]"
          style={{ gridArea: '1/1' }}
        >
          {str2.map((char, i) => (
            <NewChar key={`new-${i}`} char={char} index={i} isFlipped={step >= 1} />
          ))}
        </div>

      </div>
    </div>
  );
}
