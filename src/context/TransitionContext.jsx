import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionContext = createContext(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstMount = useRef(true);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // step: 
  // 0 = overlay appearing (or already appeared for initial load)
  // 1 = circle expanding
  // 2 = overlay fading out
  const [step, setStep] = useState(2); 
  const [isActive, setIsActive] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  
  // Handle initial preloader
  useEffect(() => {
    if (isFirstMount.current && location.pathname === '/') {
      isFirstMount.current = false;
      setIsActive(true);
      setIsInitialLoad(true);
      setStep(0);
      
      if (prefersReducedMotion) {
        const t1 = setTimeout(() => {
          setStep(2);
          setTimeout(() => {
            setIsActive(false);
            setIsInitialLoad(false);
          }, 300);
        }, 200);
        return () => clearTimeout(t1);
      }

      const t1 = setTimeout(() => setStep(1), 250); 
      const t2 = setTimeout(() => setStep(2), 1050); 
      const t3 = setTimeout(() => {
        setIsActive(false);
        setIsInitialLoad(false);
      }, 1300); 
      
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
    isFirstMount.current = false;
  }, [location.pathname, prefersReducedMotion]);

  const navigateWithTransition = useCallback((to) => {
    if (isActive) return;

    // Handle same-page hash links natively without transition
    const toStr = typeof to === 'string' ? to : to.pathname + (to.hash || '');
    const toPathname = typeof to === 'string' ? to.split('#')[0] || '/' : to.pathname;
    
    // If it's a hash link for the current page, or navigating to the exact same pathname
    if (toPathname === location.pathname) {
      navigate(to);
      return;
    }

    setIsActive(true);
    setIsInitialLoad(false);
    setStep(0);

    if (prefersReducedMotion) {
      setTimeout(() => {
        navigate(to);
        setTimeout(() => {
          setStep(2);
          setTimeout(() => setIsActive(false), 300);
        }, 50);
      }, 250);
      return;
    }

    // Phase 1: Fade in Blue overlay (takes ~250ms)
    // Phase 2: Expand circle (takes ~800ms)
    setTimeout(() => {
      setStep(1);
    }, 250);

    // After circle fully expanded (250 + 800 = 1050ms), do the route change
    setTimeout(() => {
      navigate(to);
      
      // Let React render destination, then fade out
      setTimeout(() => {
        setStep(2);
        
        // Cleanup after fade out (250ms)
        setTimeout(() => {
          setIsActive(false);
        }, 300);
      }, 50); 
    }, 1050);

  }, [isActive, location.pathname, navigate, prefersReducedMotion]);

  // Lock scroll while transitioning
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning: isActive }}>
      {children}
      
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: isInitialLoad ? 1 : 0 }}
            animate={{ opacity: step >= 2 ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'linear' }}
            className="fixed inset-0 z-[9999] bg-[var(--primary)] w-full h-[100dvh] flex items-center justify-center overflow-hidden pointer-events-none"
          >
            {!prefersReducedMotion && (
              <motion.div 
                className="absolute z-10 bg-bg rounded-full pointer-events-none"
                initial={{ scale: 0 }}
                animate={{ scale: step >= 1 ? 1 : 0 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                style={{ 
                  width: '150vmax', height: '150vmax',
                  top: '50%', left: '50%', 
                  x: '-50%', y: '-50%' 
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
