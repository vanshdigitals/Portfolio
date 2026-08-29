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

  // If in local development, ALWAYS show the portfolio
  if (import.meta.env.DEV) {
    return <>{children}</>;
  }

  // If in production and on a mobile width, show the portfolio
  if (isMobile) {
    return <>{children}</>;
  }

  // Otherwise (production + tablet/desktop), show the development gate
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text-primary)] p-6 transition-colors duration-[320ms]">
      <div className="max-w-md text-center space-y-6">
        <h1 className="font-heading font-bold text-3xl tracking-tight text-[#007BFF]">
          SITE UNDER DEVELOPMENT
        </h1>
        <div className="space-y-4 text-sm opacity-80 leading-relaxed font-sans">
          <p>
            This portfolio is currently optimized for mobile viewing.
          </p>
          <p>
            Please open this website on a mobile device to explore the portfolio experience.
          </p>
        </div>
      </div>
    </div>
  );
}
