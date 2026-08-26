import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Artificial progress over 2.2 seconds for an editorial feel
    const duration = 2200;
    const interval = 20;
    const step = (100 / (duration / interval));
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          // Wait a tiny bit at 100% before triggering exit
          setTimeout(() => setIsExiting(true), 400);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    // Trigger the wordmark reveal slightly after mount
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 100);

    return () => {
      clearInterval(timer);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", 
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Top minimal branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-8 left-0 right-0 flex justify-center"
          >
            <span className="text-white/70 font-sans tracking-[0.2em] text-[10px] sm:text-xs uppercase font-medium">
              Vansh Digitals
            </span>
          </motion.div>

          {/* Central Oversized Typography Reveal */}
          <div className="relative w-full max-w-[1800px] mx-auto px-[20px] flex justify-center overflow-hidden py-10">
            <motion.div
              initial={{ y: "120%" }}
              animate={isRevealed ? { y: "0%" } : { y: "120%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-furgatorio portfolio-wordmark portfolio-gradient leading-[1.1] m-0 select-none whitespace-nowrap">
                PORTFOLIO
              </h1>
            </motion.div>
          </div>

          {/* Progress Indicator (Bottom thin line) */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              className="h-full bg-[#0A84FF]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
