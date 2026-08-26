import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const str1 = "VANSH DIGITALS".split("");
const str2 = "PORTFOLIO".split("");
const offset = (str1.length - str2.length) / 2; // Mathematically aligns the center wave

// Sharp, mechanical cubic bezier for a physical dice flip
const flipEase = [0.6, 0.05, 0.01, 0.9];
const flipDuration = 0.7;
const flipDelay = 0.08;

function OldChar({ char, index, isFlipped }) {
  return (
    <motion.span
      className="inline-block"
      style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
      initial={{ rotateX: 0 }}
      animate={{ 
        rotateX: isFlipped ? 90 : 0 
      }}
      transition={{ 
        duration: flipDuration, 
        delay: index * flipDelay, 
        ease: flipEase
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
      initial={{ rotateX: -90 }}
      animate={{ 
        rotateX: isFlipped ? 0 : -90 
      }}
      transition={{ 
        duration: flipDuration, 
        delay: (index + offset) * flipDelay, 
        ease: flipEase
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

    const t1 = setTimeout(() => setStep(1), 100); // Start wave immediately
    const t2 = setTimeout(() => setStep(2), 1800); // Completely remove VANSH DIGITALS from DOM
    const t3 = setTimeout(() => setStep(3), 2000); // Start circle expansion
    const t4 = setTimeout(() => setStep(4), 2800); // Fade out preloader seamlessly
    const t5 = setTimeout(() => {
      onComplete();
    }, 3200); // Unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: step >= 4 ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      className="fixed inset-0 z-[9999] bg-[var(--primary)] w-[100vw] h-[100dvh] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      
      {/* Expanding white circular wipe (hardware accelerated) */}
      <motion.div 
        className="absolute z-10 bg-white rounded-full pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: step >= 3 ? 1 : 0 }}
        transition={{ duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
        style={{ 
          width: '250vmax', height: '250vmax',
          top: '50%', left: '50%', 
          x: '-50%', y: '-50%' 
        }}
      />

      {/* ONE CENTERED TYPOGRAPHY STAGE */}
      <div className="relative z-20 w-full px-[30px] flex justify-center">
        <div className="w-max perspective-[1200px] grid place-items-center">
          
          {/* OLD: VANSH DIGITALS */}
          {step < 2 && (
            <div 
              className="flex items-center justify-center text-white font-furgatorio tracking-wide leading-none m-0 select-none whitespace-nowrap text-[clamp(26px,11vw,140px)] md:text-[clamp(50px,13vw,220px)] xl:text-[clamp(80px,14vw,340px)]"
              style={{ gridArea: '1/1' }}
            >
              {str1.map((char, i) => (
                <OldChar key={`old-${i}`} char={char} index={i} isFlipped={step >= 1} />
              ))}
            </div>
          )}

          {/* NEW: PORTFOLIO (Centered from frame 1) */}
          <div 
            className="flex items-center justify-center text-white font-furgatorio tracking-wide leading-none m-0 select-none whitespace-nowrap text-[clamp(26px,11vw,140px)] md:text-[clamp(50px,13vw,220px)] xl:text-[clamp(80px,14vw,340px)]"
            style={{ gridArea: '1/1' }}
          >
            {str2.map((char, i) => (
              <NewChar key={`new-${i}`} char={char} index={i} isFlipped={step >= 1} />
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
