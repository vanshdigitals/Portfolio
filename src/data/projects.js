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
    category: 'Social / Personal Brand',
    featuredImage: { url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/RR-01-Pro-Designer-Vocabulary-Carousel/01.webp', alt: 'Ranjeet Raj Official social media and personal brand design' },
    
    tint: 'bg-[#F3EEF9]',
    tintDark: 'dark:bg-[#17121E]',
    tintLightWC: 'bg-[#F4F0FA]',
    tintDarkWC: 'dark:bg-[#160E1E]',
    accentWC: 'text-[#7C3AED]',
    
    assets: {
      carousels: [
        { id: 'rr-car1', label: 'Carousel', aspect: 'aspect-[4/5]', url: null },
        { id: 'rr-car2', label: 'Carousel', aspect: 'aspect-[4/5]', url: null },
        { id: 'rr-car3', label: 'Carousel', aspect: 'aspect-[4/5]', url: null }
      ]
    }
  },
  {
    id: '02',
    name: 'Builders Playground',
    category: 'Brand Content',
    featuredImage: { url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Builders-Playground/Event-Carousel/1.webp', alt: 'Builders Playground brand content design' },
    
    tint: 'bg-[#F5F3EC]',
    tintDark: 'dark:bg-[#1A1A14]',
    tintLightWC: 'bg-[#F8F4E8]',
    tintDarkWC: 'dark:bg-[#1A1910]',
    accentWC: 'text-[#D4A100]',
    
    assets: {
      reelCovers: [
        { id: 'bp-rc1', label: 'Reel Cover', aspect: 'aspect-[9/16]', url: null }
      ],
      highlightCovers: [
        { id: 'bp-hl1', label: 'Highlight Cover', aspect: 'aspect-[1/1]', url: null },
        { id: 'bp-hl2', label: 'Highlight Cover', aspect: 'aspect-[1/1]', url: null }
      ]
    }
  },
  {
    id: '03',
    name: 'Keshvi Beauty Lounge',
    category: 'Beauty / Branding',
    featuredImage: { url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/KBL-Signature-Packages-Collection-Posters/15.webp', alt: 'Keshvi Beauty Lounge branding and social design' },
    
    tint: 'bg-[#FAF2F0]',
    tintDark: 'dark:bg-[#1C1614]',
    tintLightWC: 'bg-[#FAF3F0]',
    tintDarkWC: 'dark:bg-[#1C1512]',
    accentWC: 'text-[#C48A72]',
    
    assets: {
      branding: [
        { id: 'kb-brand1', label: 'Logo + Palette', aspect: 'aspect-[4/5]', url: null }
      ],
      carousels: [
        { id: 'kb-car1', label: 'Carousel', aspect: 'aspect-[4/5]', url: null },
        { id: 'kb-car2', label: 'Carousel', aspect: 'aspect-[4/5]', url: null }
      ],
      festivalCreatives: [
        { id: 'kb-fest1', label: 'Festival Creative', aspect: 'aspect-[4/5]', url: null }
      ]
    }
  }
];
