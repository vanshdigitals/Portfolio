import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkPreview from './components/WorkPreview';
import About from './components/About';
import { PlaceholderSection } from './components/SectionPlaceholders';
import WorkCollections from './pages/WorkCollections';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
  return (
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
  );
}

export default App;
