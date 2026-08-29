import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [step, setStep] = useState(0);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (prefersReducedMotion) {
      // Short fade out for reduced motion
      const t = setTimeout(() => {
        setStep(2);
        setTimeout(onComplete, 300);
      }, 200);
      return () => clearTimeout(t);
    }

    // Timeline:
    // 0ms - 250ms: Blue screen established (step 0)
    // 250ms: Circle starts expanding (step 1)
    // 1050ms: Circle finishes expanding (800ms duration). Preloader fades out to reveal the website (step 2)
    // 1300ms: Fade out complete, unmount (onComplete)
    
    const t1 = setTimeout(() => setStep(1), 250); 
    const t2 = setTimeout(() => setStep(2), 1050); 
    const t3 = setTimeout(() => onComplete(), 1300); 

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [prefersReducedMotion, onComplete]);

  // If reduced motion, just show blue then fade out
  if (prefersReducedMotion) {
    return (
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: step >= 2 ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] bg-[var(--primary)] pointer-events-none"
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: step >= 2 ? 0 : 1 }}
      transition={{ duration: 0.25, ease: 'linear' }}
      className="fixed inset-0 z-[9999] bg-[var(--primary)] w-full h-[100dvh] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Expanding solid circle (matches theme background: white in light mode) */}
      <motion.div 
        className="absolute z-10 bg-bg rounded-full pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: step >= 1 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        style={{ 
          width: '150vmax', height: '150vmax', // 150vmax guarantees complete viewport coverage (corner to corner) on any screen size
          top: '50%', left: '50%', 
          x: '-50%', y: '-50%' 
        }}
      />
    </motion.div>
  );
}
