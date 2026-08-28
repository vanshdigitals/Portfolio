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
  const [animatingTab, setAnimatingTab] = useState(null);

  // Sync with URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const tabIndex = TABS.findIndex(t => t.id === hash);
    if (tabIndex !== -1) setActiveTab(tabIndex);
  }, []);

  const handleTabClick = (index, id) => {
    setActiveTab(index);
    setAnimatingTab(id);
    setTimeout(() => setAnimatingTab(null), 300);
    // Update hash without scrolling
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="w-full flex flex-col pt-0 md:pt-16">
      
      {/* ── DESKTOP CATEGORY SELECTOR ────────────────────────────────────── */}
      <div 
        className="hidden md:grid grid-cols-3 gap-6 mb-32"
        role="tablist"
        aria-label="Work Categories"
      >
        {TABS.map((tab, idx) => {
          const isActive = activeTab === idx;
          const isSelected = idx === 0;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => handleTabClick(idx, tab.id)}
              className={`
                group relative text-left w-full rounded-[20px]
                flex flex-col
                transition-all duration-300 ease-[cubic-bezier(.65,0,.35,1)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                overflow-hidden
                col-span-1 min-h-[260px] p-8
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
              <div className="relative flex justify-between items-start w-full z-10 mb-8">
                <span className={`
                  font-heading font-normal text-sm font-medium transition-colors duration-300
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
                <h2 className="font-heading font-[800] leading-tight text-text-primary text-3xl">
                  {tab.titleLine1}<br />
                  {tab.titleLine2}
                </h2>
                {/* Accent Underline */}
                <div className={`
                  mt-4 h-[3px] rounded-full transition-colors duration-300 w-12
                  ${isActive ? 'bg-[#007BFF] dark:bg-[#FFD722]' : 'bg-border'}
                `} />
              </div>

              {/* Bottom: Description & Arrow */}
              <div className="relative flex-grow flex flex-col justify-between z-10 mt-auto">
                <p className="font-body text-text-secondary leading-relaxed max-w-[90%] text-sm mb-8">
                  {tab.desc}
                </p>
                <div className={`
                  rounded-full border flex items-center justify-center
                  transition-all duration-300 w-11 h-11
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

      {/* ── MOBILE CATEGORY SELECTOR ─────────────────────────────────────── */}
      <div 
        className="grid md:hidden grid-cols-2 gap-[12px] mb-[25px]"
        role="tablist"
        aria-label="Work Categories (Mobile)"
      >
        {TABS.map((tab, idx) => {
          const isActive = activeTab === idx;
          const isSelected = idx === 0;
          
          let bgClass = '';
          if (idx === 0) bgClass = 'bg-[#C6E2FF] dark:bg-[#1A365D] border-[#C6E2FF] dark:border-[#1A365D] text-text-primary';
          if (idx === 1) bgClass = 'bg-[#FFF4B3] dark:bg-[#332A00] border-[#FFF4B3] dark:border-[#332A00] text-text-primary';
          if (idx === 2) bgClass = 'bg-[#E5E5E5] dark:bg-[#202226] border-[#E5E5E5] dark:border-[#202226] text-text-primary';

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`mobile-tab-${tab.id}`}
              onClick={() => handleTabClick(idx, tab.id)}
              className={`
                group text-left w-full rounded-[18px] p-[14px] flex flex-col h-full
                transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${isSelected ? 'col-span-2' : 'col-span-1'}
                ${bgClass}
                border
                ${isActive ? 'shadow-sm ring-1 ring-black/5 dark:ring-white/5' : 'hover:-translate-y-0.5'}
              `}
            >
              <h2 className={`font-heading font-medium leading-[1.1] mb-[6px] ${isSelected ? 'text-[30px]' : 'text-[24px]'}`}>
                {isSelected ? (
                  <>{tab.titleLine1} {tab.titleLine2}</>
                ) : (
                  <>{tab.titleLine1}<br />{tab.titleLine2}</>
                )}
              </h2>
              
              <div className="flex justify-between gap-[12px] w-full flex-1">
                <p className="font-body text-[13px] leading-[1.5] text-text-secondary self-start pr-[8px]">
                  {tab.desc}
                </p>
                <div 
                  className={`
                    w-[42px] h-[42px] shrink-0 self-end mt-auto rounded-full bg-white dark:bg-[#111214] flex items-center justify-center
                    shadow-[0_1px_4px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_4px_rgba(255,255,255,0.04)]
                    transition-all duration-300
                  `}
                >
                    <ArrowRight 
                      size={18} 
                      className={`
                        text-text-primary 
                        transition-transform duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)]
                        motion-reduce:transition-none
                        ${animatingTab === tab.id ? 'rotate-0' : '-rotate-45 group-hover:rotate-0'}
                      `}
                      aria-hidden="true"
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
