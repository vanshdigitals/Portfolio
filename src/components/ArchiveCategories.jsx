import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, GitBranch, TrendingUp } from 'lucide-react';
import SelectedWork from './SelectedWork';
import SampleWork from './SampleWork';
import PracticeWork from './PracticeWork';

const TABS = [
  {
    id: 'selected',
    num: '01',
    titleLine1: 'Selected',
    titleLine2: 'Work',
    desc: 'Client projects that best represent my current practice.',
    Icon: Sparkles,
  },
  {
    id: 'sample',
    num: '02',
    titleLine1: 'Sample',
    titleLine2: 'Work',
    desc: 'Explorations created across different visual directions.',
    Icon: GitBranch,
  },
  {
    id: 'practice',
    num: '03',
    titleLine1: 'Practice',
    titleLine2: 'Work',
    desc: 'Self-initiated work made while developing my skills.',
    Icon: TrendingUp,
  },
];

export default function ArchiveCategories() {
  const [activeTab, setActiveTab] = useState(0);

  // Sync with URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const tabIndex = TABS.findIndex(t => t.id === hash);
    if (tabIndex !== -1) setActiveTab(tabIndex);
  }, []);

  const handleTabClick = (index, id) => {
    setActiveTab(index);
    // Update hash without scrolling
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="w-full flex flex-col pt-12 md:pt-16">
      
      {/* ── CATEGORY SELECTOR ────────────────────────────────────────────── */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 md:mb-32"
        role="tablist"
        aria-label="Work Categories"
      >
        {TABS.map((tab, idx) => {
          const isActive = activeTab === idx;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => handleTabClick(idx, tab.id)}
              className={`
                group relative text-left w-full rounded-[20px] p-6 md:p-8
                flex flex-col min-h-[260px]
                transition-all duration-300 ease-[cubic-bezier(.65,0,.35,1)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                overflow-hidden
                ${isActive 
                  ? 'border border-[#007BFF] dark:border-[#FFD722] shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(255,255,255,0.02)]' 
                  : 'border border-border/40 hover:border-border hover:-translate-y-1'
                }
              `}
            >
              {/* Background Wash (Yellow/Brand tint) */}
              <div 
                className={`
                  absolute inset-0 pointer-events-none transition-opacity duration-300
                  ${isActive 
                    ? 'bg-[#007BFF]/[0.04] dark:bg-[#FFD722]/[0.08]' 
                    : 'bg-[#FFD722]/[0.03] dark:bg-[#FFD722]/[0.02] group-hover:bg-[#FFD722]/[0.05]'
                  }
                `}
              />

              {/* Top Row: Index + Icon */}
              <div className="relative flex justify-between items-start w-full mb-8 z-10">
                <span className={`
                  font-mono text-sm font-medium transition-colors duration-300
                  ${isActive ? 'text-[#007BFF] dark:text-[#FFD722]' : 'text-text-muted'}
                `}>
                  {tab.num}
                </span>
                <tab.Icon 
                  strokeWidth={1.5} 
                  size={24} 
                  className={`
                    transition-colors duration-300
                    ${isActive ? 'text-[#007BFF] dark:text-[#FFD722]' : 'text-border'}
                  `}
                />
              </div>

              {/* Middle: Title & Accent */}
              <div className="relative z-10 mb-6">
                <h2 className="font-heading text-2xl md:text-3xl font-[800] leading-tight text-text-primary">
                  {tab.titleLine1}<br />
                  {tab.titleLine2}
                </h2>
                {/* Accent Underline */}
                <div className={`
                  mt-4 h-[3px] w-12 rounded-full transition-colors duration-300
                  ${isActive ? 'bg-[#007BFF] dark:bg-[#FFD722]' : 'bg-border'}
                `} />
              </div>

              {/* Bottom: Description & Arrow */}
              <div className="relative flex-grow flex flex-col justify-between z-10 mt-auto">
                <p className="font-body text-sm text-text-secondary leading-relaxed max-w-[90%] mb-8">
                  {tab.desc}
                </p>
                <div className={`
                  w-11 h-11 rounded-full border flex items-center justify-center
                  transition-all duration-300
                  ${isActive 
                    ? 'border-[#007BFF] text-[#007BFF] dark:border-[#FFD722] dark:text-[#FFD722]' 
                    : 'border-border text-text-muted'
                  }
                `}>
                  <ArrowRight 
                    size={18} 
                    className={`transition-transform duration-300 ${!isActive && 'group-hover:translate-x-0.5'}`} 
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── CATEGORY CONTENT (Swipe Wrapper) ──────────────────────────────── */}
      <div className="w-full overflow-hidden relative">
        <div 
          className="flex w-full transition-transform duration-[400ms] ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeTab * 100}%)` }}
        >
          
          <div 
            className="w-full shrink-0 px-1"
            role="tabpanel"
            id={`panel-${TABS[0].id}`}
            aria-labelledby={`tab-${TABS[0].id}`}
            aria-hidden={activeTab !== 0}
          >
            <SelectedWork />
          </div>
          
          <div 
            className="w-full shrink-0 px-1"
            role="tabpanel"
            id={`panel-${TABS[1].id}`}
            aria-labelledby={`tab-${TABS[1].id}`}
            aria-hidden={activeTab !== 1}
          >
            <SampleWork />
          </div>
          
          <div 
            className="w-full shrink-0 px-1"
            role="tabpanel"
            id={`panel-${TABS[2].id}`}
            aria-labelledby={`tab-${TABS[2].id}`}
            aria-hidden={activeTab !== 2}
          >
            <PracticeWork />
          </div>

        </div>
      </div>
      
    </div>
  );
}
