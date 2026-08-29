import { useState, useEffect } from 'react';

export default function MobileOnlyGate({ children }) {
  // Use state to track window width.
  // We initialize to a safe mobile width during SSR or initial parse
  // to avoid flashing the dev screen on mobile.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return true; 
  });

  const [timeLeft, setTimeLeft] = useState({
    days: '00', hours: '00', minutes: '00', seconds: '00'
  });

  useEffect(() => {
    // We only need the resize listener if we're not in DEV,
    // but adding it anyway is fine.
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    // Call once on mount to ensure correct state after hydration
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Only run the timer if we are actually rendering the gate
    if (import.meta.env.DEV || isMobile) return;

    let targetDate = localStorage.getItem('portfolioDevGateTarget');
    if (!targetDate) {
      // Set 7 days from now
      targetDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem('portfolioDevGateTarget', targetDate.toString());
    } else {
      targetDate = parseInt(targetDate, 10);
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0')
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // If in local development, ALWAYS show the portfolio
  if (import.meta.env.DEV) {
    return <>{children}</>;
  }

  // If in production and on a mobile width, show the portfolio
  if (isMobile) {
    return <>{children}</>;
  }

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span 
        className="text-[clamp(40px,5vw,64px)] font-medium leading-none tabular-nums tracking-tight" 
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {value}
      </span>
      <span 
        className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-3 opacity-60" 
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );

  // Otherwise (production + tablet/desktop), show the development gate
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text-primary)] p-6 transition-colors duration-[320ms]">
      <div className="flex flex-col items-center text-center max-w-2xl w-full">
        
        {/* COUNTDOWN */}
        <div className="flex justify-center gap-8 sm:gap-12 md:gap-16 mb-8 sm:mb-10">
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* HEADING */}
        <h1 
          className="font-bold text-[#007BFF] tracking-tight mb-6 sm:mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)", lineHeight: 1.2 }}
        >
          SITE UNDER DEVELOPMENT
        </h1>

        {/* BODY */}
        <div 
          className="space-y-2 sm:space-y-3 opacity-80"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.6 }}
        >
          <p>
            This portfolio is currently optimized for mobile viewing.
          </p>
          <p>
            Please open this website on a mobile device to explore the experience.
          </p>
        </div>
        
      </div>
    </div>
  );
}
