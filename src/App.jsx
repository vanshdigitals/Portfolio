import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkPreview from './components/WorkPreview';
import About from './components/About';
import { PlaceholderSection } from './components/SectionPlaceholders';
import WorkCollections from './pages/WorkCollections';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { TransitionProvider } from './context/TransitionContext';
import MobileOnlyGate from './components/MobileOnlyGate';

// ── Landing page (all sections stacked) ────────────────────────────────────────
function LandingPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <WorkPreview />
        <PlaceholderSection 
          id="skills" 
          num="03" 
          title="Skills & Tools" 
          desc="Primary / Developing / Basic / Supporting tiers. NO percentage bars." 
        />
        <PlaceholderSection 
          id="experience" 
          num="04" 
          title="Experience" 
          desc="Honest freelance/project-based experience list." 
        />
        <PlaceholderSection 
          id="testimonials" 
          num="05" 
          title="Kind Words" 
          desc="Client testimonials and references." 
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// ── App with routing ────────────────────────────────────────────────────────────
function App() {
  const location = useLocation();

  // Casual Content Protection: Only active in production (Vercel) and not on localhost
  // "Production-only casual-copy deterrence. Cannot stop screenshots or DevTools. Real protection = watermarks + low-res public previews."
  useEffect(() => {
    const isProd = import.meta.env.PROD;
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (!isProd || isLocalhost) {
      return; // Do nothing in local development
    }

    // Add .protected class to body for scoped CSS rules
    document.body.classList.add('protected');

    const handleContextMenu = (e) => {
      // Allow right-click on inputs and textareas (e.g., for pasting into the contact form)
      const tagName = e.target.tagName.toUpperCase();
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.body.classList.remove('protected');
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // On route/hash change: scroll to the hash target section if one is present
  // (e.g. navigating from /work-collections to /#about), otherwise scroll to top.
  // The fixed-header offset is handled by the existing `scroll-padding-top` in
  // index.css, which scrollIntoView honours — no hardcoded offset needed.
  useEffect(() => {
    if (location.hash) {
      // The target section is already mounted here (effects run after commit),
      // including after a cross-route change from /work-collections.
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname, location.hash]);

  return (
    <MobileOnlyGate>
      <TransitionProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        <Route
          path="/work-collections"
          element={
            <div className="min-h-screen bg-bg flex flex-col">
              <Header />
              <div className="flex-grow">
                <WorkCollections />
              </div>
              <Footer />
            </div>
          }
        />
        </Routes>
      </TransitionProvider>
    </MobileOnlyGate>
  );
}

export default App;
