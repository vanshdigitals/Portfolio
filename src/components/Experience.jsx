import { useState } from 'react';
import { GraduationCap, Briefcase, Award, MonitorPlay, PenTool, LayoutTemplate } from 'lucide-react';

const EDUCATION_DATA = [
  {
    id: 'edu-1',
    year: '2023–Present',
    role: 'BCA (Computer Applications)',
    org: 'Pursuing, Uttar Pradesh',
    desc: 'Technical foundation alongside self-driven design practice.'
  },
  {
    id: 'edu-2',
    year: '2023',
    role: 'Senior Secondary (12th)',
    org: 'Completed',
    desc: 'Foundational studies completed with a growing interest in visual arts.'
  },
  {
    id: 'edu-3',
    year: 'Class 9 onward',
    role: 'Started designing independently',
    org: 'First designs for personal projects & friends',
    desc: 'Self-taught exploration into software tools and early creative concepts.'
  }
];

const EXPERIENCE_DATA = [
  {
    id: 'exp-1',
    year: '2024–Present',
    role: 'Freelance Graphic Designer',
    org: 'Project-based · 5+ brands',
    desc: 'Carousels, reel covers, posters & brand content.'
  },
  {
    id: 'exp-2',
    year: '2024',
    role: 'Design Partner — Cuts & Curves',
    org: 'Project-based',
    desc: '50+ carousels, 70+ reel covers, 10+ posters.'
  },
  {
    id: 'exp-3',
    year: '2023',
    role: 'Freelance work begins',
    org: 'Self-initiated',
    desc: 'Ranjeet Raj Official, Waterplane, Builders Playground, Keshvi Beauty Lounge & more.'
  }
];

const CERTS_DATA = [
  {
    id: 'cert-1',
    title: 'Canva Design',
    sub: 'Self-paced · 3+ yrs',
    icon: LayoutTemplate
  },
  {
    id: 'cert-2',
    title: 'Design Fundamentals',
    sub: 'Courses + practice',
    icon: PenTool
  },
  {
    id: 'cert-3',
    title: 'Photoshop & Illustrator',
    sub: 'In progress',
    icon: MonitorPlay
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState('exp');

  return (
    <section id="experience" className="w-full bg-bg py-16 md:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[96px]">
        
        {/* Section Heading */}
        <div className="mb-12 md:mb-16 text-center">
          <span className="font-body text-sm font-bold tracking-[0.2em] text-text-muted uppercase mb-4 block">
            EXPERIENCE
          </span>
          <h2 className="font-heading text-[clamp(32px,4vw,56px)] font-extrabold text-[#111214] dark:text-white leading-[1.1] max-w-3xl mx-auto mb-6">
            Learning &{' '}
            <span className="text-[#007BFF] dark:text-[#FFD722] relative inline-block whitespace-nowrap">
              building.
              {/* Brush underline */}
              <span className="absolute -bottom-2 left-0 w-full h-[12px] bg-[url('/assets/yellow-brush-highlight.webp')] bg-no-repeat bg-center bg-contain -z-10 opacity-60 dark:opacity-100 hidden dark:block" aria-hidden="true"></span>
            </span>
          </h2>
          <p className="font-body text-[16px] text-text-muted max-w-2xl mx-auto">
            Education, hands-on design work, and the courses shaping my craft.
          </p>
        </div>

        {/* Mobile/Tablet Tabs (<900px) */}
        <div 
          className="flex min-[900px]:hidden justify-center items-center gap-3 mb-10" 
          role="tablist"
          aria-label="Experience and Education"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'exp'}
            aria-controls="timeline-exp"
            id="tab-exp"
            onClick={() => setActiveTab('exp')}
            className={`px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#007BFF] dark:focus-visible:ring-[#FFD722] dark:focus-visible:ring-offset-bg ${
              activeTab === 'exp' 
                ? 'bg-[#007BFF] text-white dark:bg-[#FFD722] dark:text-[#111214] border-transparent' 
                : 'bg-transparent border border-[#E6E6E3] dark:border-border text-text-muted hover:text-[#111214] dark:hover:text-white'
            }`}
          >
            Experience
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'edu'}
            aria-controls="timeline-edu"
            id="tab-edu"
            onClick={() => setActiveTab('edu')}
            className={`px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#007BFF] dark:focus-visible:ring-[#FFD722] dark:focus-visible:ring-offset-bg ${
              activeTab === 'edu' 
                ? 'bg-[#007BFF] text-white dark:bg-[#FFD722] dark:text-[#111214] border-transparent' 
                : 'bg-transparent border border-[#E6E6E3] dark:border-border text-text-muted hover:text-[#111214] dark:hover:text-white'
            }`}
          >
            Education
          </button>
        </div>

        {/* Timelines Container */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-12 min-[900px]:gap-16">
          
          {/* LEFT: Education */}
          <div 
            id="timeline-edu"
            role="tabpanel"
            aria-labelledby="tab-edu"
            className={`${activeTab === 'edu' ? 'block' : 'hidden'} min-[900px]:block`}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#007BFF]/10 dark:bg-[#FFD722]/10 text-[#007BFF] dark:text-[#FFD722] flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-[22px] font-bold text-[#111214] dark:text-white uppercase tracking-wider">Education</h3>
            </div>
            
            {/* Rail */}
            <div className="relative pl-6 md:pl-8 border-l-2 border-[#E6E6E3] dark:border-border space-y-10">
              {EDUCATION_DATA.map((item) => (
                <div key={item.id} className="relative">
                  {/* Node Dot */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-[14px] h-[14px] rounded-full bg-[#007BFF] dark:bg-[#FFD722] border-[3px] border-bg" aria-hidden="true"></div>
                  
                  <span className="inline-block px-3 py-1 mb-3 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#007BFF]/10 dark:bg-[#FFD722]/10 text-[#007BFF] dark:text-[#FFD722]">
                    {item.year}
                  </span>
                  <h4 className="font-heading text-[20px] font-bold text-[#111214] dark:text-white mb-1 leading-tight">
                    {item.role}
                  </h4>
                  <div className="font-body text-[14px] font-medium text-[#111214]/70 dark:text-white/70 mb-2">
                    {item.org}
                  </div>
                  <p className="font-body text-[15px] text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Experience */}
          <div 
            id="timeline-exp"
            role="tabpanel"
            aria-labelledby="tab-exp"
            className={`${activeTab === 'exp' ? 'block' : 'hidden'} min-[900px]:block`}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#007BFF]/10 dark:bg-[#FFD722]/10 text-[#007BFF] dark:text-[#FFD722] flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-[22px] font-bold text-[#111214] dark:text-white uppercase tracking-wider">Experience</h3>
            </div>
            
            {/* Rail */}
            <div className="relative pl-6 md:pl-8 border-l-2 border-[#E6E6E3] dark:border-border space-y-10">
              {EXPERIENCE_DATA.map((item) => (
                <div key={item.id} className="relative">
                  {/* Node Dot */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-[14px] h-[14px] rounded-full bg-[#007BFF] dark:bg-[#FFD722] border-[3px] border-bg" aria-hidden="true"></div>
                  
                  <span className="inline-block px-3 py-1 mb-3 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#007BFF]/10 dark:bg-[#FFD722]/10 text-[#007BFF] dark:text-[#FFD722]">
                    {item.year}
                  </span>
                  <h4 className="font-heading text-[20px] font-bold text-[#111214] dark:text-white mb-1 leading-tight">
                    {item.role}
                  </h4>
                  <div className="font-body text-[14px] font-medium text-[#111214]/70 dark:text-white/70 mb-2">
                    {item.org}
                  </div>
                  <p className="font-body text-[15px] text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Certifications & Courses Row */}
        <div className="mt-20 md:mt-28">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#007BFF]/10 dark:bg-[#FFD722]/10 text-[#007BFF] dark:text-[#FFD722] flex items-center justify-center mb-5 shrink-0">
              <Award className="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 className="font-heading text-[clamp(24px,3vw,32px)] font-bold text-[#111214] dark:text-white">
              Certifications & Courses
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {CERTS_DATA.map((cert) => (
              <div 
                key={cert.id}
                className="group flex items-start gap-4 bg-[#FAFAF7] dark:bg-[#1C1C1F] border border-[#E6E6E3] dark:border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:hover:shadow-none hover:-translate-y-1 hover:border-[#007BFF] dark:hover:border-[#FFD722] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="w-12 h-12 rounded-xl bg-[#007BFF]/10 dark:bg-[#FFD722]/10 text-[#007BFF] dark:text-[#FFD722] flex items-center justify-center shrink-0">
                  <cert.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-heading text-[18px] font-bold text-[#111214] dark:text-white mb-1.5 leading-tight group-hover:text-[#007BFF] dark:group-hover:text-[#FFD722] transition-colors">
                    {cert.title}
                  </h4>
                  <p className="font-body text-[14px] text-text-muted">
                    {cert.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
