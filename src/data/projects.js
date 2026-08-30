// Dynamic helper to construct the deliverables string based entirely on actual asset arrays
export function getDeliverablesString(assets) {
  const parts = [];

  const addPart = (arr, singleLabel, pluralLabel) => {
    if (arr && arr.length > 0) {
      parts.push(`${arr.length} ${arr.length === 1 ? singleLabel : pluralLabel}`);
    }
  };

  addPart(assets.branding, 'branding asset', 'branding assets');
  addPart(assets.carousels, 'carousel', 'carousels');
  addPart(assets.reelCovers, 'reel cover', 'reel covers');
  addPart(assets.posters, 'poster', 'posters');
  addPart(assets.festivalCreatives, 'festival creative', 'festival creatives');
  addPart(assets.highlightCovers, 'highlight cover', 'highlight covers');

  return parts.length > 0 ? parts.join(' · ') : 'Design Work';
}

// Flattens the structured assets object into an array for rendering grids
export function getFlattenedAssets(assets) {
  const flat = [];
  if (assets.branding) flat.push(...assets.branding);
  if (assets.carousels) flat.push(...assets.carousels);
  if (assets.reelCovers) flat.push(...assets.reelCovers);
  if (assets.posters) flat.push(...assets.posters);
  if (assets.festivalCreatives) flat.push(...assets.festivalCreatives);
  if (assets.highlightCovers) flat.push(...assets.highlightCovers);
  return flat;
}

export const PROJECTS = [
  {
    id: '01',
    name: 'Ranjeet Raj Official',
    role: 'Freelance Graphic Designer | Project-Based Work',
    date: 'January 2026 – August 2026',
    category: 'Social / Personal Brand',
    detail: 'Designed carousel posts for Ranjeet Raj Official based on the content and reference posts provided by the client. I understood the style and theme of the references and created the carousels accordingly, using their red, black, and white colour palette with bold typography and a consistent visual style.',
    featuredImage: { url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/01.webp', alt: 'Ranjeet Raj Official social media and personal brand design' },
    
    tint: 'bg-[#F3EEF9]',
    tintDark: 'dark:bg-[#17121E]',
    tintLightWC: 'bg-[#F4F0FA]',
    tintDarkWC: 'dark:bg-[#160E1E]',
    accentWC: 'text-[#7C3AED]',
    
    assets: {
      carousels: [
        { 
          id: 'RR-01', 
          title: 'Pro Designer Vocabulary',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/01.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/01.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/02.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/03.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/04.webp"
          ]
        },
        { 
          id: 'RR-02', 
          title: 'Attractive Brand Colors',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/01.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/01.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/02.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/03.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-02-Attractive-Brand-Colors-Carousel/04.webp"
          ]
        },
        { 
          id: 'RR-03', 
          title: 'The Batching System',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/01.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/01.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/02.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/03.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-03-The-Batching-System-Carousel/04.webp"
          ]
        },
        { 
          id: 'RR-04', 
          title: 'Top Canva Background Keywords',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/01.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/01.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/02.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/03.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-04-Top-Canva-Background-Keywords-Carousel/04.webp"
          ]
        }
      ]
    }
  },
  {
    id: '02',
    name: 'Builders Playground',
    role: 'Freelance Graphic Designer | Short-Term Project',
    date: 'July 2026',
    category: 'Brand Content',
    detail: "Created reel covers, an event poster, a social carousel and highlight covers for the brand's event; followed the existing brand theme while adapting layouts; completed within a 4–5 day engagement.",
    featuredImage: { url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/1.webp', alt: 'Builders Playground brand content design' },
    
    tint: 'bg-[#F5F3EC]',
    tintDark: 'dark:bg-[#1A1A14]',
    tintLightWC: 'bg-[#F8F4E8]',
    tintDarkWC: 'dark:bg-[#1A1910]',
    accentWC: 'text-[#D4A100]',
    
    assets: {
      reelCovers: [
        { id: 'bp-rc1', label: 'Reel Cover', title: 'Reel Cover 01', aspect: 'aspect-[9/16]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-1st-reel-cover-launching-v2.webp" },
        { id: 'bp-rc2', label: 'Reel Cover', title: 'Reel Cover 02', aspect: 'aspect-[9/16]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-2nd-reel-cover-join-cummunity.webp" },
        { id: 'bp-rc3', label: 'Reel Cover', title: 'Reel Cover 03', aspect: 'aspect-[9/16]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-3rd-reel-cover-join-cummunity-about-bp.webp" },
        { id: 'bp-rc4', label: 'Reel Cover', title: 'Reel Cover 04', aspect: 'aspect-[9/16]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-4th-reel-cover-foot-ball-event-01.webp" },
        { id: 'bp-rc5', label: 'Reel Cover', title: 'Reel Cover 05', aspect: 'aspect-[9/16]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-5th-reel-cover-foot-ball-event-02.webp" },
        { id: 'bp-rc6', label: 'Reel Cover', title: 'Reel Cover 06', aspect: 'aspect-[9/16]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Reel-Covers/builders-playground-6th-reel-cover-foot-ball-event-03.webp" }
      ],
      highlightCovers: [
        { id: 'bp-hl1', label: 'Highlight Cover', title: 'Highlight Cover 01', aspect: 'aspect-[1/1]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/01-about-us.webp" },
        { id: 'bp-hl2', label: 'Highlight Cover', title: 'Highlight Cover 02', aspect: 'aspect-[1/1]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/02-bts-v2.webp" },
        { id: 'bp-hl3', label: 'Highlight Cover', title: 'Highlight Cover 03', aspect: 'aspect-[1/1]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/03-community-v2.webp" },
        { id: 'bp-hl4', label: 'Highlight Cover', title: 'Highlight Cover 04', aspect: 'aspect-[1/1]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/04-event-v2.webp" },
        { id: 'bp-hl5', label: 'Highlight Cover', title: 'Highlight Cover 05', aspect: 'aspect-[1/1]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/05-football-baithek.webp" },
        { id: 'bp-hl6', label: 'Highlight Cover', title: 'Highlight Cover 06', aspect: 'aspect-[1/1]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Highlight-Covers/06-upcoming-events.webp" }
      ],
      carousels: [
        { 
          id: 'BP-01', 
          title: 'Event Carousel',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/1.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/1.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/2.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/3.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/4.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/5.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/6.webp"
          ]
        }
      ]
    }
  },
  {
    id: '03',
    name: 'Keshvi Beauty Lounge',
    role: 'Freelance Graphic Designer | Project-Based Work',
    date: 'February 2026',
    category: 'Beauty / Personal Brand',
    detail: "Designed a cohesive visual collection for Keshvi Beauty Lounge across brand identity, promotional posters, Instagram carousels and reel covers, maintaining a consistent beauty-focused visual direction across formats.",
    featuredImage: { url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/KBL-Signature-Packages-Collection-Posters/15.webp', alt: 'Keshvi Beauty Lounge branding and social design' },
    
    tint: 'bg-[#FAF2F0]',
    tintDark: 'dark:bg-[#1C1614]',
    tintLightWC: 'bg-[#FAF3F0]',
    tintDarkWC: 'dark:bg-[#1C1512]',
    accentWC: 'text-[#C48A72]',
    
    assets: {
      branding: [
        { id: 'kb-brand1', label: 'Logo', title: 'Keshvi Beauty Lounge Logo 1', aspect: 'aspect-[1/1]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Keshvi-Beauty-Lounge-Logo/1.webp" },
        { id: 'kb-brand2', label: 'Logo', title: 'Keshvi Beauty Lounge Logo 2', aspect: 'aspect-[1/1]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Keshvi-Beauty-Lounge-Logo/2.webp" }
      ],
      posters: [
        { id: 'kb-post1', label: 'Poster', title: 'Signature Packages 1', aspect: 'aspect-[4/5]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/KBL-Signature-Packages-Collection-Posters/15.webp" },
        { id: 'kb-post2', label: 'Poster', title: 'Signature Packages 2', aspect: 'aspect-[4/5]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/KBL-Signature-Packages-Collection-Posters/16.webp" },
        { id: 'kb-post3', label: 'Poster', title: 'Signature Packages 3', aspect: 'aspect-[4/5]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/KBL-Signature-Packages-Collection-Posters/17.webp" },
        { id: 'kb-post4', label: 'Poster', title: 'Signature Packages 4', aspect: 'aspect-[4/5]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/KBL-Signature-Packages-Collection-Posters/18.webp" },
        { id: 'kb-post5', label: 'Poster', title: 'Signature Packages 5', aspect: 'aspect-[4/5]', url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/KBL-Signature-Packages-Collection-Posters/19.webp" }
      ],
      carousels: [
        { 
          id: 'KBL-C1', 
          title: 'Texture Vs Cakey — Bridal Authority',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-1-TextureVsCakey-Bridal-Authority/1.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-1-TextureVsCakey-Bridal-Authority/1.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-1-TextureVsCakey-Bridal-Authority/2.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-1-TextureVsCakey-Bridal-Authority/3.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-1-TextureVsCakey-Bridal-Authority/4.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-1-TextureVsCakey-Bridal-Authority/5.webp"
          ]
        },
        { 
          id: 'KBL-C2', 
          title: 'Party Glam Portfolio',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-2-PartyGlam-Portfolio/6.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-2-PartyGlam-Portfolio/6.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-2-PartyGlam-Portfolio/7.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-2-PartyGlam-Portfolio/8.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-2-PartyGlam-Portfolio/9.webp"
          ]
        },
        { 
          id: 'KBL-C3', 
          title: 'Heritage Bride Portfolio',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-3-Heritage-Bride-Portfolio/10.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-3-Heritage-Bride-Portfolio/10.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-3-Heritage-Bride-Portfolio/11.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-3-Heritage-Bride-Portfolio/12.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-3-Heritage-Bride-Portfolio/13.webp"
          ]
        }
      ],
      reelCovers: [
        { 
          id: 'kb-rc1', 
          title: 'Mehendi Portfolio',
          label: 'Reel Cover', 
          aspect: 'aspect-[9/16]', 
          url: "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Reel-Cover/KBL-Mehendi-Portfolio-Reel-Cover-01.webp" 
        }
      ]
    }
  }
];
