import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

    const t1 = setTimeout(() => setStep(1), 450); // Flip to PORTFOLIO
    const t2 = setTimeout(() => setStep(2), 1000); // End flip
    const t3 = setTimeout(() => setStep(3), 1250); // Start circle expansion
    const t4 = setTimeout(() => {
      onComplete();
    }, 1900); // Unmount

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
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{ 
          top: '50%', left: '50%', 
          x: '-50%', y: '-50%' 
        }}
      />

      {/* Typography container */}
      <div className="relative z-20 flex items-center justify-center w-full px-[30px] perspective-[1200px]">
        <motion.div
          className="relative flex items-center justify-center w-full"
          initial={{ rotateX: 0 }}
          animate={
            step >= 1 
              ? { rotateX: -180, scale: [1, 0.95, 1] } 
              : { rotateX: 0, scale: 1 }
          }
          transition={{ 
            duration: 0.55, 
            ease: [0.65, 0, 0.35, 1],
            scale: { duration: 0.55, ease: "easeInOut" }
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front: VANSH DIGITALS */}
          <div 
            className="absolute flex items-center justify-center w-full"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h2 className="text-white font-sans font-medium uppercase tracking-[0.2em] text-[clamp(14px,3.5vw,20px)] text-center m-0">
              Vansh Digitals
            </h2>
          </div>

          {/* Back: PORTFOLIO */}
          <div 
            className="flex items-center justify-center w-full"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)'
            }}
          >
            <h1 className="text-white font-furgatorio leading-none m-0 select-none whitespace-nowrap text-[clamp(40px,24vw,250px)] text-center max-w-full">
              PORTFOLIO
            </h1>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
