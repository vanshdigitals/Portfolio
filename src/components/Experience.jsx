import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';

const EXPERIENCE_DATA = [
  {
    id: 'exp-1',
    year: '2026–Present',
    role: 'Freelance Graphic Designer',
    supporting: 'Project-Based Freelance Work',
    bullets: [
      'Design social media content for small brands, an agency and a startup: Instagram carousels, posts, reel covers, promotional and festival creatives, posters and brand visuals.',
      'Canva-based visual design is my strongest area, with Photoshop and Illustrator still developing.',
      'Work is taken project by project, not as full-time employment.',
      'This is the direction I am building on now: consistent, practical social media design for real brands.'
    ]
  },
  {
    id: 'exp-2',
    year: '2025–2026',
    role: 'Project-Based Freelance Design Work',
    supporting: 'Separate client engagements, each taken as its own project.',
    projects: [
      {
        name: 'Cuts & Curves',
        date: '2026',
        summary: '77 documented social media assets:',
        breakdown: [
          '34 carousel posts',
          '34 reel covers',
          '7 promotional/festival posts',
          '2 story covers'
        ]
      },
      {
        name: 'Ranjeet Raj Official',
        date: '2026',
        desc: [
          '4 Instagram carousel designs.',
          'Adapted provided/reference carousel styles and structured provided content into consistent carousel layouts.'
        ]
      },
      {
        name: 'Builders Playground',
        date: 'July 2026 · Short-term project',
        desc: [
          '5+ reel covers, 1 event poster, 1 social media carousel and 5 highlight covers.'
        ]
      },
      {
        name: 'Keshvi Beauty Lounge',
        date: 'February 2026',
        desc: [
          '3 social media carousel posts and 5+ festival/offer creatives, plus a logo, colour palette and typography direction.'
        ]
      },
      {
        name: 'Waterplane Agency',
        date: 'Approx. late 2025 to early 2026',
        desc: [
          '8+ social media designs, including 6 carousel posts, based on provided reference designs and project requirements.'
        ]
      },
      {
        name: 'Reach Route',
        date: 'May 2026 · Sample Design Project',
        desc: [
          'A sample Instagram carousel in an orange visual theme, based on the provided brief and reference direction.',
          'Sample work only, not a continuing engagement.'
        ]
      }
    ]
  },
  {
    id: 'exp-3',
    year: '2025',
    role: 'Graphic Design Internships',
    supporting: 'Four separate internships completed in 2025, focused on graphic and social media design.',
    internships: [
      {
        org: 'EduVibe',
        role: 'Graphic Design Intern'
      },
      {
        org: 'HumaniTech',
        role: 'Graphic Design Intern'
      },
      {
        org: 'The Teenspreneur',
        role: 'Graphic Design Intern'
      },
      {
        org: 'Juvenile Foundation',
        role: 'Graphic Designer / Social Media Designer',
        detail: 'Educational and awareness-based Instagram carousel designs.'
      }
    ]
  }
];

const EDUCATION_DATA = [
  {
    id: 'edu-1',
    year: '2025–Present',
    role: 'Bachelor of Computer Applications (BCA)',
    org: 'Manipal University Jaipur',
    location: 'Jaipur, Rajasthan',
    desc: 'Currently pursuing, with a Cyber Security specialization/coursework alongside core design work.'
  },
  {
    id: 'edu-2',
    year: '2023',
    role: 'Senior Secondary (Class 12), Humanities (Arts)',
    org: 'Kendriya Vidyalaya',
    location: 'Raebareli, Uttar Pradesh',
    desc: 'Completed in 2023.'
  },
  {
    id: 'edu-3',
    year: '2021',
    role: 'Secondary (Class 10)',
    org: 'Kendriya Vidyalaya',
    location: 'Raebareli, Uttar Pradesh',
    desc: 'Completed in 2021.'
  }
];

function TimelineColumn({ title, icon: Icon, items }) {
  const containerRef = useRef(null);
  const dotRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  const [trackMetrics, setTrackMetrics] = useState({ top: 12, height: 0, ready: false });

  // Measure exact vertical centers of first and last milestone dots
  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const firstDot = dotRefs.current[0];
      const lastDot = dotRefs.current[items.length - 1];
      if (firstDot && lastDot) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const firstRect = firstDot.getBoundingClientRect();
        const lastRect = lastDot.getBoundingClientRect();

        const top = firstRect.top + firstRect.height / 2 - containerRect.top;
        const bottom = lastRect.top + lastRect.height / 2 - containerRect.top;
        const height = Math.max(0, bottom - top);

        setTrackMetrics({ top, height, ready: true });
      }
    };

    measure();
    const rafId = requestAnimationFrame(measure);

    window.addEventListener('resize', measure);
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, [items]);

  // Track scroll progress for this specific timeline column
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 55%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 25,
    restDelta: 0.001,
  });

  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1], { clamp: true });
  const activeScale = prefersReducedMotion ? scrollYProgress : progressScale;

  return (
    <div className="flex flex-col">
      {/* Column Header */}
      <div className="flex items-center gap-3.5 mb-8">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#007BFF]/10 text-[#007BFF] dark:bg-[#3B93FF]/15 dark:text-[#3B93FF] flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-[20px] sm:text-[22px] font-bold text-[#111214] dark:text-white uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative">
        {/* Base Layer: Thin Light-Gray Vertical Line from first milestone to last milestone */}
        {trackMetrics.ready && (
          <div
            aria-hidden="true"
            className="absolute left-[12px] sm:left-[14px] -translate-x-1/2 w-[2px] bg-[#E6E6E3] dark:bg-border pointer-events-none z-0"
            style={{
              top: `${trackMetrics.top}px`,
              height: `${trackMetrics.height}px`,
            }}
          />
        )}

        {/* Progress Layer: Clean Solid Blue Beam directly on top of the gray timeline */}
        {trackMetrics.ready && (
          <motion.div
            aria-hidden="true"
            className="absolute left-[12px] sm:left-[14px] -translate-x-1/2 w-[2px] bg-[#007BFF] dark:bg-[#3B93FF] pointer-events-none origin-top z-[1]"
            style={{
              top: `${trackMetrics.top}px`,
              height: `${trackMetrics.height}px`,
              scaleY: activeScale,
              transformOrigin: 'top center',
            }}
          />
        )}

        {/* Milestones */}
        {items.map((item, idx) => (
          <div key={item.id} className="relative pl-8 sm:pl-10 pb-10 last:pb-2 group">
            {/* Simple Solid Blue Dot (No rings, borders, halo, glow, or pulse) */}
            <div
              ref={(el) => (dotRefs.current[idx] = el)}
              aria-hidden="true"
              className="absolute left-[12px] sm:left-[14px] -translate-x-1/2 top-[7px] w-2.5 h-2.5 rounded-full bg-[#007BFF] dark:bg-[#3B93FF] z-10 pointer-events-none"
            />

            {/* Milestone Content */}
            <span className="inline-flex items-center px-3 py-1 mb-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#007BFF]/10 text-[#007BFF] dark:bg-[#3B93FF]/15 dark:text-[#3B93FF]">
              {item.year}
            </span>
            <h4 className="font-heading text-[18px] sm:text-[20px] font-bold text-[#111214] dark:text-white mb-1 leading-snug">
              {item.role}
            </h4>
            {(item.supporting || item.org) && (
              <div className="font-body text-[14px] font-medium text-[#111214]/75 dark:text-white/75 mb-2 leading-relaxed">
                {item.supporting || item.org}
                {item.location && <span className="text-text-muted font-normal"> · {item.location}</span>}
              </div>
            )}
            {item.desc && (
              <p className="font-body text-[14px] text-text-muted leading-relaxed">
                {item.desc}
              </p>
            )}

            {/* Entry 01: Bulleted Details */}
            {item.bullets && (
              <ul className="space-y-2 mt-3 font-body text-[13.5px] sm:text-[14px] text-text-secondary leading-relaxed">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF]/60 dark:bg-[#3B93FF]/70 shrink-0 mt-2" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Entry 02: Individual Projects Breakdown */}
            {item.projects && (
              <div className="mt-3.5 space-y-4 border-l border-border/70 pl-3.5 sm:pl-4">
                {item.projects.map((proj, pIdx) => (
                  <div key={pIdx}>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="font-heading font-bold text-[14.5px] sm:text-[15px] text-[#111214] dark:text-white">
                        {proj.name}
                      </span>
                      <span className="font-body text-[12px] sm:text-[12.5px] text-text-muted">
                        · {proj.date}
                      </span>
                    </div>
                    {proj.summary && (
                      <p className="font-body text-[13px] sm:text-[13.5px] text-text-secondary leading-relaxed mt-0.5">
                        {proj.summary}
                      </p>
                    )}
                    {proj.breakdown && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {proj.breakdown.map((chip, cIdx) => (
                          <span
                            key={cIdx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11.5px] font-medium bg-black/[0.03] dark:bg-white/[0.05] text-text-secondary border border-border/60"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.desc && (
                      <div className="space-y-1 mt-0.5">
                        {proj.desc.map((paragraph, dIdx) => (
                          <p key={dIdx} className="font-body text-[13px] sm:text-[13.5px] text-text-secondary leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Entry 03: Internships Breakdown */}
            {item.internships && (
              <div className="mt-3.5 space-y-3 border-l border-border/70 pl-3.5 sm:pl-4">
                {item.internships.map((intern, iIdx) => (
                  <div key={iIdx}>
                    <div className="font-heading font-semibold text-[14px] sm:text-[14.5px] text-[#111214] dark:text-white leading-snug">
                      {intern.org}{' '}
                      <span className="font-body font-normal text-[13px] text-text-muted">
                        — {intern.role}
                      </span>
                    </div>
                    {intern.detail && (
                      <p className="font-body text-[12.5px] sm:text-[13px] text-text-secondary leading-relaxed mt-0.5">
                        {intern.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const CERTIFICATIONS_COURSES = {
  completed: [
    {
      num: '01',
      title: 'Canva Design Rockstar',
      provider: 'Ranjeet Raj',
      desc: 'Learned advanced Canva techniques for professional design creation.',
      status: 'Completed'
    },
    {
      num: '02',
      title: 'Advanced Graphic Design',
      provider: 'Ranjeet Raj',
      desc: 'In-depth learning of design principles, layouts, and creative workflows.',
      status: 'Completed'
    },
    {
      num: '03',
      title: 'Canva Design Bootcamp (15 Days)',
      provider: 'Shruti Rajpoot',
      desc: 'Hands-on bootcamp focused on practical design projects and real-world use cases.',
      status: 'Completed'
    },
    {
      num: '04',
      title: 'Instagram Influencer & Content Design Using Canva, Cohort 1 & 2',
      provider: 'Rajas Nikhumbh',
      desc: 'Learned to create engaging social media content, carousels and brand-focused visuals.',
      status: 'Completed'
    }
  ],
  currentlyLearning: [
    {
      num: '01',
      title: 'Graphic Design with AI',
      provider: 'PW (Physics Wallah)',
      desc: 'Learning AI tools and modern workflows for graphic design.',
      status: 'In Progress'
    },
    {
      num: '02',
      title: 'Design With Hardik',
      provider: 'Design With Hardik',
      desc: 'Learning practical design techniques and industry-relevant workflows.',
      status: 'In Progress'
    },
    {
      num: '03',
      title: 'Graphic Design & Video Editing Training',
      provider: 'Vipul Singhal',
      desc: 'Building skills in graphic design and basic video editing for content creation.',
      status: 'In Progress'
    },
    {
      num: '04',
      title: 'Design Training',
      provider: 'Rajeev Mehta Course',
      desc: 'Strengthening core design fundamentals and real-world application.',
      status: 'In Progress'
    }
  ]
};

export default function Experience() {
  return (
    <section id="experience" className="w-full bg-bg py-16 md:py-24">
      {/* ── Experience & Education Container (Preserved at max-w-[1440px]) ── */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[96px]">
        
        {/* Section Heading */}
        <div className="mb-12 md:mb-16 text-center">
          <span className="font-body text-[11px] md:text-[12px] font-semibold tracking-[0.2em] text-text-muted uppercase mb-3 block">
            EXPERIENCE
          </span>
          <h2 className="font-heading text-[clamp(34px,4vw,54px)] font-light md:font-normal text-text-primary leading-[1.15] tracking-[-0.02em] max-w-3xl mx-auto">
            How I Got{' '}
            <span className="text-[#007BFF] dark:text-[#3B93FF]">Here</span>
          </h2>
          <p className="font-body text-[15px] md:text-base leading-[1.65] text-text-secondary max-w-2xl mx-auto mt-3">
            Education, hands-on design work, and the courses shaping my craft.
          </p>
        </div>

        {/* Timelines Container: Experience on LEFT, Education on RIGHT */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-12 sm:gap-14 min-[900px]:gap-16">
          {/* LEFT: Experience */}
          <TimelineColumn
            title="Experience"
            icon={Briefcase}
            items={EXPERIENCE_DATA}
          />

          {/* RIGHT: Education */}
          <TimelineColumn
            title="Education"
            icon={GraduationCap}
            items={EDUCATION_DATA}
          />
        </div>

        {/* ── Certifications & Courses ── */}
        <div className="mt-20 md:mt-28">
          {/* Section Heading */}
          <div className="mb-12 md:mb-16 text-center">
            <span className="font-body text-[11px] md:text-[12px] font-semibold tracking-[0.2em] text-text-muted uppercase mb-3 block">
              CERTIFICATIONS & COURSES
            </span>
            <h3 className="font-heading text-[clamp(34px,4vw,54px)] font-light md:font-normal text-text-primary leading-[1.15] tracking-[-0.02em] max-w-3xl mx-auto">
              Certifications &{' '}
              <span className="text-[#007BFF] dark:text-[#3B93FF]">Courses.</span>
            </h3>
            <p className="font-body text-[15px] md:text-base leading-[1.65] text-text-secondary max-w-2xl mx-auto mt-3">
              A curated list of courses and learning programs shaping my design skills.
            </p>
          </div>

          {/* Two-Column Editorial Listing: Completed & Currently Learning */}
          <div className="w-full grid grid-cols-1 min-[900px]:grid-cols-2 gap-12 sm:gap-14 min-[900px]:gap-16 items-start">
            
            {/* ── Group 1: COMPLETED ─────────────────────────────────── */}
            <div className="flex flex-col">
              {/* Group Header: Clean uppercase heading, no badge/count */}
              <div className="pb-3.5 mb-1 border-b border-border/60">
                <h4 className="font-heading text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.16em] text-text-primary">
                  COMPLETED
                </h4>
              </div>

              {/* Course Rows */}
              <div className="flex flex-col divide-y divide-border/40">
                {CERTIFICATIONS_COURSES.completed.map((item) => (
                  <div
                    key={item.num}
                    className="py-4.5 sm:py-5 first:pt-3 last:pb-1 flex flex-col min-[480px]:flex-row min-[480px]:items-start justify-between gap-3 min-[480px]:gap-4 group"
                  >
                    {/* Left Side: Number + Details */}
                    <div className="flex items-start gap-3.5 sm:gap-4.5 lg:gap-5 flex-1 min-w-0">
                      <span className="font-heading font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-none text-[#B8B8B8] dark:text-[#646770] w-[34px] sm:w-[40px] lg:w-[44px] shrink-0 select-none tracking-tight pt-0.5">
                        {item.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-heading text-[15.5px] sm:text-[16.5px] font-bold text-text-primary leading-snug group-hover:text-[#007BFF] dark:group-hover:text-[#3B93FF] transition-colors">
                          {item.title}
                        </h5>
                        <p className="font-body text-[13px] sm:text-[13.5px] font-medium text-text-secondary leading-normal mt-0.5">
                          {item.provider}
                        </p>
                        <p className="font-body text-[12.5px] sm:text-[13px] text-text-muted leading-relaxed mt-1.5 max-w-[620px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Status Pill */}
                    <div className="shrink-0 min-[480px]:pt-1 pl-[48px] min-[480px]:pl-0">
                      <span className="inline-flex items-center text-[10.5px] sm:text-[11px] font-heading font-medium tracking-wider uppercase px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 select-none">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Group 2: CURRENTLY LEARNING ─────────────────────────── */}
            <div className="flex flex-col">
              {/* Group Header: Clean uppercase heading, no badge/count */}
              <div className="pb-3.5 mb-1 border-b border-border/60">
                <h4 className="font-heading text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.16em] text-text-primary">
                  CURRENTLY LEARNING
                </h4>
              </div>

              {/* Course Rows */}
              <div className="flex flex-col divide-y divide-border/40">
                {CERTIFICATIONS_COURSES.currentlyLearning.map((item) => (
                  <div
                    key={item.num}
                    className="py-4.5 sm:py-5 first:pt-3 last:pb-1 flex flex-col min-[480px]:flex-row min-[480px]:items-start justify-between gap-3 min-[480px]:gap-4 group"
                  >
                    {/* Left Side: Number + Details */}
                    <div className="flex items-start gap-3.5 sm:gap-4.5 lg:gap-5 flex-1 min-w-0">
                      <span className="font-heading font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-none text-[#B8B8B8] dark:text-[#646770] w-[34px] sm:w-[40px] lg:w-[44px] shrink-0 select-none tracking-tight pt-0.5">
                        {item.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-heading text-[15.5px] sm:text-[16.5px] font-bold text-text-primary leading-snug group-hover:text-[#007BFF] dark:group-hover:text-[#3B93FF] transition-colors">
                          {item.title}
                        </h5>
                        <p className="font-body text-[13px] sm:text-[13.5px] font-medium text-text-secondary leading-normal mt-0.5">
                          {item.provider}
                        </p>
                        <p className="font-body text-[12.5px] sm:text-[13px] text-text-muted leading-relaxed mt-1.5 max-w-[620px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Status Pill */}
                    <div className="shrink-0 min-[480px]:pt-1 pl-[48px] min-[480px]:pl-0">
                      <span className="inline-flex items-center text-[10.5px] sm:text-[11px] font-heading font-medium tracking-wider uppercase px-2.5 py-0.5 sm:py-1 rounded-full bg-[#007BFF]/10 text-[#007BFF] dark:bg-[#3B93FF]/15 dark:text-[#3B93FF] border border-[#007BFF]/20 select-none">
                        In Progress
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
