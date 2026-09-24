// Dynamic helper to construct the deliverables string based entirely on actual asset arrays
export function getDeliverablesString(assets) {
  const parts = [];

  const addPart = (arr, singleLabel, pluralLabel) => {
    if (arr && arr.length > 0) {
      parts.push(`${arr.length} ${arr.length === 1 ? singleLabel : pluralLabel}`);
    }
  };

  addPart(assets.branding, 'branding asset', 'branding assets');

  if (assets.carousels) {
    const count = Array.isArray(assets.carousels)
      ? assets.carousels.length
      : ((assets.carousels.set1?.length || 0) + (assets.carousels.set2?.length || 0) + (assets.carousels.dark?.length || 0));
    if (count > 0) {
      parts.push(`${count} ${count === 1 ? 'carousel' : 'carousels'}`);
    }
  }

  if (assets.reelCovers) {
    const count = Array.isArray(assets.reelCovers)
      ? assets.reelCovers.length
      : ((assets.reelCovers.set1?.length || 0) + (assets.reelCovers.set2?.length || 0));
    if (count > 0) {
      parts.push(`${count} ${count === 1 ? 'reel cover' : 'reel covers'}`);
    }
  }
  addPart(assets.posters, 'poster', 'posters');
  addPart(assets.festivalOffers, 'combo / festival offer', 'combo / festival offers');
  addPart(assets.storyCovers, 'story cover', 'story covers');
  addPart(assets.festivalCreatives, 'festival creative', 'festival creatives');
  addPart(assets.highlightCovers, 'highlight cover', 'highlight covers');

  if (parts.length > 0) {
    // If some assets have items but empty placeholder sections exist, show category names without counts
    if (assets.reelCovers && assets.reelCovers.length === 0) parts.push('Reel Covers');
    if (assets.festivalOffers && assets.festivalOffers.length === 0) parts.push('Festival Offers / Combo');
    return parts.join(' · ');
  }

  // If all asset arrays exist but are empty, display the category pills without fake counts
  const categoryLabels = [];
  if (assets.carousels) categoryLabels.push('Instagram Carousels');
  if (assets.reelCovers) categoryLabels.push('Reel Covers');
  if (assets.festivalOffers) categoryLabels.push('Festival Offers / Combo');
  if (assets.posters) categoryLabels.push('Posters');

  return categoryLabels.length > 0 ? categoryLabels.join(' · ') : 'Design Work';
}

// Flattens the structured assets object into an array for rendering grids
export function getFlattenedAssets(assets) {
  const flat = [];
  if (assets.branding) flat.push(...assets.branding);
  if (assets.carousels) {
    if (Array.isArray(assets.carousels)) {
      flat.push(...assets.carousels);
    } else {
      if (assets.carousels.set1) flat.push(...assets.carousels.set1);
      if (assets.carousels.set2) flat.push(...assets.carousels.set2);
      if (assets.carousels.dark) flat.push(...assets.carousels.dark);
    }
  }
  if (assets.reelCovers) {
    if (Array.isArray(assets.reelCovers)) {
      flat.push(...assets.reelCovers);
    } else {
      if (assets.reelCovers.set1) flat.push(...assets.reelCovers.set1);
      if (assets.reelCovers.set2) flat.push(...assets.reelCovers.set2);
    }
  }
  if (assets.posters) flat.push(...assets.posters);
  if (assets.festivalOffers) flat.push(...assets.festivalOffers);
  if (assets.storyCovers) flat.push(...assets.storyCovers);
  if (assets.festivalCreatives) flat.push(...assets.festivalCreatives);
  if (assets.highlightCovers) flat.push(...assets.highlightCovers);
  return flat;
}

export const cutsAndCurvesCarousels = {
  set1: [
    {
      id: 'CC-01',
      title: "Is Your Shower Water Ruining Your Hair?",
      label: 'Carousel 01',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-01-IS-YOUR-SHOWER-WATER-RUINING-YOUR-HAIR/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-01-IS-YOUR-SHOWER-WATER-RUINING-YOUR-HAIR/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-01-IS-YOUR-SHOWER-WATER-RUINING-YOUR-HAIR/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-01-IS-YOUR-SHOWER-WATER-RUINING-YOUR-HAIR/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-01-IS-YOUR-SHOWER-WATER-RUINING-YOUR-HAIR/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-01-IS-YOUR-SHOWER-WATER-RUINING-YOUR-HAIR/5.webp'
      ]
    },
    {
      id: 'CC-02',
      title: "Stop Using Box Dye For Root Touch-Up",
      label: 'Carousel 02',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-02-STOP-USING-BOX-DYE-FOR-ROOT-TOUCH-UP/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-02-STOP-USING-BOX-DYE-FOR-ROOT-TOUCH-UP/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-02-STOP-USING-BOX-DYE-FOR-ROOT-TOUCH-UP/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-02-STOP-USING-BOX-DYE-FOR-ROOT-TOUCH-UP/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-02-STOP-USING-BOX-DYE-FOR-ROOT-TOUCH-UP/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-02-STOP-USING-BOX-DYE-FOR-ROOT-TOUCH-UP/5.webp'
      ]
    },
    {
      id: 'CC-03',
      title: "Do You Have Dandruff Or Just A Dry Scalp?",
      label: 'Carousel 03',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-03-DO-YOU-DANDRUFF-OR-JUST-A-DRY-SCALP/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-03-DO-YOU-DANDRUFF-OR-JUST-A-DRY-SCALP/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-03-DO-YOU-DANDRUFF-OR-JUST-A-DRY-SCALP/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-03-DO-YOU-DANDRUFF-OR-JUST-A-DRY-SCALP/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-03-DO-YOU-DANDRUFF-OR-JUST-A-DRY-SCALP/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-03-DO-YOU-DANDRUFF-OR-JUST-A-DRY-SCALP/5.webp'
      ]
    },
    {
      id: 'CC-04',
      title: "Looking Down At Your Phone Is Aging Your Neck",
      label: 'Carousel 04',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-04-LOOKING-DOWN-AT-YOUR-PHONE-IS-AGING-YOUR-NECK/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-04-LOOKING-DOWN-AT-YOUR-PHONE-IS-AGING-YOUR-NECK/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-04-LOOKING-DOWN-AT-YOUR-PHONE-IS-AGING-YOUR-NECK/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-04-LOOKING-DOWN-AT-YOUR-PHONE-IS-AGING-YOUR-NECK/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-04-LOOKING-DOWN-AT-YOUR-PHONE-IS-AGING-YOUR-NECK/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-04-LOOKING-DOWN-AT-YOUR-PHONE-IS-AGING-YOUR-NECK/5.webp'
      ]
    },
    {
      id: 'CC-05',
      title: "The Pimple Is Gone But The Dark Spot Stayed",
      label: 'Carousel 05',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-05-THE-PIMPLE-IS-GONE-BUT-THE-DARK-SPOT-STAYED/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-05-THE-PIMPLE-IS-GONE-BUT-THE-DARK-SPOT-STAYED/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-05-THE-PIMPLE-IS-GONE-BUT-THE-DARK-SPOT-STAYED/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-05-THE-PIMPLE-IS-GONE-BUT-THE-DARK-SPOT-STAYED/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-05-THE-PIMPLE-IS-GONE-BUT-THE-DARK-SPOT-STAYED/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-05-THE-PIMPLE-IS-GONE-BUT-THE-DARK-SPOT-STAYED/5.webp'
      ]
    },
    {
      id: 'CC-06',
      title: "Why Your Dark Circles Won't Go Away",
      label: 'Carousel 06',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-06-WHY-YOUR-DARK-CIRCLES-WONT-GO-AWAY/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-06-WHY-YOUR-DARK-CIRCLES-WONT-GO-AWAY/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-06-WHY-YOUR-DARK-CIRCLES-WONT-GO-AWAY/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-06-WHY-YOUR-DARK-CIRCLES-WONT-GO-AWAY/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-06-WHY-YOUR-DARK-CIRCLES-WONT-GO-AWAY/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-06-WHY-YOUR-DARK-CIRCLES-WONT-GO-AWAY/5.webp'
      ]
    },
    {
      id: 'CC-07',
      title: "How To Survive Your Haldi Mehndi Makeup",
      label: 'Carousel 07',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-07-HOW-TO-SURVIVE-YOUR-HALDI-MEHNDI-MAKEUP/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-07-HOW-TO-SURVIVE-YOUR-HALDI-MEHNDI-MAKEUP/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-07-HOW-TO-SURVIVE-YOUR-HALDI-MEHNDI-MAKEUP/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-07-HOW-TO-SURVIVE-YOUR-HALDI-MEHNDI-MAKEUP/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-07-HOW-TO-SURVIVE-YOUR-HALDI-MEHNDI-MAKEUP/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-07-HOW-TO-SURVIVE-YOUR-HALDI-MEHNDI-MAKEUP/5.webp'
      ]
    },
    {
      id: 'CC-08',
      title: "Does Your Eyeliner Disappear?",
      label: 'Carousel 08',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-08-DOES-YOUR-EYELINER-DISAPPEAR/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-08-DOES-YOUR-EYELINER-DISAPPEAR/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-08-DOES-YOUR-EYELINER-DISAPPEAR/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-08-DOES-YOUR-EYELINER-DISAPPEAR/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-08-DOES-YOUR-EYELINER-DISAPPEAR/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-08-DOES-YOUR-EYELINER-DISAPPEAR/5.webp'
      ]
    },
    {
      id: 'CC-09',
      title: "How To Get Plump Fuller Lips",
      label: 'Carousel 09',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-09-HOW-TO-GET-PLUMP-FULLER-LIPS-DISAPPEAR/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-09-HOW-TO-GET-PLUMP-FULLER-LIPS-DISAPPEAR/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-09-HOW-TO-GET-PLUMP-FULLER-LIPS-DISAPPEAR/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-09-HOW-TO-GET-PLUMP-FULLER-LIPS-DISAPPEAR/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-09-HOW-TO-GET-PLUMP-FULLER-LIPS-DISAPPEAR/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-09-HOW-TO-GET-PLUMP-FULLER-LIPS-DISAPPEAR/5.webp'
      ]
    },
    {
      id: 'CC-10',
      title: "Why Everyone Is Switching To The Russian Manicure",
      label: 'Carousel 10',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-10-WHY-EVERYONE-IS-SWITCHING-TO-THE-RUSSIAN-MANICURE/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-10-WHY-EVERYONE-IS-SWITCHING-TO-THE-RUSSIAN-MANICURE/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-10-WHY-EVERYONE-IS-SWITCHING-TO-THE-RUSSIAN-MANICURE/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-10-WHY-EVERYONE-IS-SWITCHING-TO-THE-RUSSIAN-MANICURE/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-10-WHY-EVERYONE-IS-SWITCHING-TO-THE-RUSSIAN-MANICURE/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-10-WHY-EVERYONE-IS-SWITCHING-TO-THE-RUSSIAN-MANICURE/5.webp'
      ]
    },
    {
      id: 'CC-11',
      title: "Still Waxing Every 3 Weeks?",
      label: 'Carousel 11',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-11-STILL-WAXING-EVERY-3-WEEKS/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-11-STILL-WAXING-EVERY-3-WEEKS/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-11-STILL-WAXING-EVERY-3-WEEKS/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-11-STILL-WAXING-EVERY-3-WEEKS/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-11-STILL-WAXING-EVERY-3-WEEKS/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-11-STILL-WAXING-EVERY-3-WEEKS/5.webp'
      ]
    },
    {
      id: 'CC-12',
      title: "Want Perfect Brows?",
      label: 'Carousel 12',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-12-WANT-PERFECT-BROWS/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-12-WANT-PERFECT-BROWS/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-12-WANT-PERFECT-BROWS/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-12-WANT-PERFECT-BROWS/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-12-WANT-PERFECT-BROWS/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-12-WANT-PERFECT-BROWS/5.webp'
      ]
    }
  ],
  set2: [
    {
      id: 'CC-13',
      title: "Are You Applying Hair Serum Wrong?",
      label: 'Carousel 13',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-01-ARE-YOU-APPLYING-HAIR-SERUM-WRONG/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-01-ARE-YOU-APPLYING-HAIR-SERUM-WRONG/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-01-ARE-YOU-APPLYING-HAIR-SERUM-WRONG/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-01-ARE-YOU-APPLYING-HAIR-SERUM-WRONG/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-01-ARE-YOU-APPLYING-HAIR-SERUM-WRONG/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-01-ARE-YOU-APPLYING-HAIR-SERUM-WRONG/5.webp'
      ]
    },
    {
      id: 'CC-14',
      title: "Do You Need A Haircut Or A Hair Spa?",
      label: 'Carousel 14',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-02-DO-YO-NEED-HAIRCUT-OR-A-HAIR-SPA/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-02-DO-YO-NEED-HAIRCUT-OR-A-HAIR-SPA/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-02-DO-YO-NEED-HAIRCUT-OR-A-HAIR-SPA/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-02-DO-YO-NEED-HAIRCUT-OR-A-HAIR-SPA/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-02-DO-YO-NEED-HAIRCUT-OR-A-HAIR-SPA/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-02-DO-YO-NEED-HAIRCUT-OR-A-HAIR-SPA/5.webp'
      ]
    },
    {
      id: 'CC-15',
      title: "Summer Hair Care: The Sun Is Frying Your Hair",
      label: 'Carousel 15',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-03-SUMMER-HAIR-CARE-THE-SUN-IS-FRYING-YOUR-HAIR/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-03-SUMMER-HAIR-CARE-THE-SUN-IS-FRYING-YOUR-HAIR/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-03-SUMMER-HAIR-CARE-THE-SUN-IS-FRYING-YOUR-HAIR/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-03-SUMMER-HAIR-CARE-THE-SUN-IS-FRYING-YOUR-HAIR/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-03-SUMMER-HAIR-CARE-THE-SUN-IS-FRYING-YOUR-HAIR/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-03-SUMMER-HAIR-CARE-THE-SUN-IS-FRYING-YOUR-HAIR/5.webp'
      ]
    },
    {
      id: 'CC-16',
      title: "Washing Your Face But Still Breaking Out?",
      label: 'Carousel 16',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-04-SKINCARE-SERIES-WASHING-YOUR-FACE-BUT-STILL-BREAKING-OUT/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-04-SKINCARE-SERIES-WASHING-YOUR-FACE-BUT-STILL-BREAKING-OUT/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-04-SKINCARE-SERIES-WASHING-YOUR-FACE-BUT-STILL-BREAKING-OUT/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-04-SKINCARE-SERIES-WASHING-YOUR-FACE-BUT-STILL-BREAKING-OUT/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-04-SKINCARE-SERIES-WASHING-YOUR-FACE-BUT-STILL-BREAKING-OUT/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-04-SKINCARE-SERIES-WASHING-YOUR-FACE-BUT-STILL-BREAKING-OUT/5.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-04-SKINCARE-SERIES-WASHING-YOUR-FACE-BUT-STILL-BREAKING-OUT/6.webp'
      ]
    },
    {
      id: 'CC-17',
      title: "3 Sunscreen Rules You're Breaking",
      label: 'Carousel 17',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-05-3-SUNSCREEN-RULES-YOUR-BREAKING/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-05-3-SUNSCREEN-RULES-YOUR-BREAKING/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-05-3-SUNSCREEN-RULES-YOUR-BREAKING/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-05-3-SUNSCREEN-RULES-YOUR-BREAKING/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-05-3-SUNSCREEN-RULES-YOUR-BREAKING/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-05-3-SUNSCREEN-RULES-YOUR-BREAKING/5.webp'
      ]
    },
    {
      id: 'CC-18',
      title: "Is Icing Your Face Actually Good?",
      label: 'Carousel 18',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-06-IS-ICING-YOUR-FACE-ACTUALLY-GOOD/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-06-IS-ICING-YOUR-FACE-ACTUALLY-GOOD/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-06-IS-ICING-YOUR-FACE-ACTUALLY-GOOD/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-06-IS-ICING-YOUR-FACE-ACTUALLY-GOOD/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-06-IS-ICING-YOUR-FACE-ACTUALLY-GOOD/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-06-IS-ICING-YOUR-FACE-ACTUALLY-GOOD/5.webp'
      ]
    },
    {
      id: 'CC-19',
      title: "How To Stop Your Makeup From Melting Today",
      label: 'Carousel 19',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-07-HOW-TO-STOP-YOUR-MAKE-UP-FROM-MELTING-TODAY/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-07-HOW-TO-STOP-YOUR-MAKE-UP-FROM-MELTING-TODAY/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-07-HOW-TO-STOP-YOUR-MAKE-UP-FROM-MELTING-TODAY/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-07-HOW-TO-STOP-YOUR-MAKE-UP-FROM-MELTING-TODAY/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-07-HOW-TO-STOP-YOUR-MAKE-UP-FROM-MELTING-TODAY/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-07-HOW-TO-STOP-YOUR-MAKE-UP-FROM-MELTING-TODAY/5.webp'
      ]
    },
    {
      id: 'CC-20',
      title: "Sponge Or Brush?",
      label: 'Carousel 20',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-08-SPONGE-OR-BRUSH/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-08-SPONGE-OR-BRUSH/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-08-SPONGE-OR-BRUSH/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-08-SPONGE-OR-BRUSH/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-08-SPONGE-OR-BRUSH/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-08-SPONGE-OR-BRUSH/5.webp'
      ]
    },
    {
      id: 'CC-21',
      title: "Your Pre-Bridal Timeline",
      label: 'Carousel 21',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-09-YOUR-PRE-BRIDAL-TIMELINE/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-09-YOUR-PRE-BRIDAL-TIMELINE/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-09-YOUR-PRE-BRIDAL-TIMELINE/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-09-YOUR-PRE-BRIDAL-TIMELINE/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-09-YOUR-PRE-BRIDAL-TIMELINE/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-09-YOUR-PRE-BRIDAL-TIMELINE/5.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-09-YOUR-PRE-BRIDAL-TIMELINE/6.webp'
      ]
    },
    {
      id: 'CC-22',
      title: "Why Your Gel Nails Keep Chipping",
      label: 'Carousel 22',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-10-WHY-YOUR-GEL-NAILS-KEEP-CHIPPING/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-10-WHY-YOUR-GEL-NAILS-KEEP-CHIPPING/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-10-WHY-YOUR-GEL-NAILS-KEEP-CHIPPING/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-10-WHY-YOUR-GEL-NAILS-KEEP-CHIPPING/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-10-WHY-YOUR-GEL-NAILS-KEEP-CHIPPING/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-10-WHY-YOUR-GEL-NAILS-KEEP-CHIPPING/5.webp'
      ]
    },
    {
      id: 'CC-23',
      title: "The Summer Debate",
      label: 'Carousel 23',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-11-THE-SUMMER-DEBATE/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-11-THE-SUMMER-DEBATE/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-11-THE-SUMMER-DEBATE/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-11-THE-SUMMER-DEBATE/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-11-THE-SUMMER-DEBATE/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-11-THE-SUMMER-DEBATE/5.webp'
      ]
    },
    {
      id: 'CC-24',
      title: "Stop Picking Your Cuticles",
      label: 'Carousel 24',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-12-STOP-PICKING-YOUR-CUTICLES/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-12-STOP-PICKING-YOUR-CUTICLES/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-12-STOP-PICKING-YOUR-CUTICLES/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-12-STOP-PICKING-YOUR-CUTICLES/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-12-STOP-PICKING-YOUR-CUTICLES/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-Part2-12-STOP-PICKING-YOUR-CUTICLES/5.webp'
      ]
    }
  ],
  dark: [
    {
      id: 'CC-D01',
      title: "5 Bridal Skincare Mistakes",
      label: 'Carousel 01',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-01-5-BRIDAL-SKINCARE-MISTAKES/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-01-5-BRIDAL-SKINCARE-MISTAKES/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-01-5-BRIDAL-SKINCARE-MISTAKES/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-01-5-BRIDAL-SKINCARE-MISTAKES/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-01-5-BRIDAL-SKINCARE-MISTAKES/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-01-5-BRIDAL-SKINCARE-MISTAKES/5.webp'
      ]
    },
    {
      id: 'CC-D02',
      title: "Gel vs Acrylic",
      label: 'Carousel 02',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-02-GEL-VS-ACRYLIC/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-02-GEL-VS-ACRYLIC/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-02-GEL-VS-ACRYLIC/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-02-GEL-VS-ACRYLIC/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-02-GEL-VS-ACRYLIC/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-02-GEL-VS-ACRYLIC/5.webp'
      ]
    },
    {
      id: 'CC-D03',
      title: "Stop Guessing: Nanoplastia vs Botox",
      label: 'Carousel 03',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-03-STOP-GUESSING-NANOPLASTIA-VS-BOTOX/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-03-STOP-GUESSING-NANOPLASTIA-VS-BOTOX/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-03-STOP-GUESSING-NANOPLASTIA-VS-BOTOX/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-03-STOP-GUESSING-NANOPLASTIA-VS-BOTOX/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-03-STOP-GUESSING-NANOPLASTIA-VS-BOTOX/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-03-STOP-GUESSING-NANOPLASTIA-VS-BOTOX/5.webp'
      ]
    },
    {
      id: 'CC-D04',
      title: "Day vs Night Look: Cakey",
      label: 'Carousel 04',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-04-DAY-VS-NIGHT-LOOK-CAKEY/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-04-DAY-VS-NIGHT-LOOK-CAKEY/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-04-DAY-VS-NIGHT-LOOK-CAKEY/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-04-DAY-VS-NIGHT-LOOK-CAKEY/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-04-DAY-VS-NIGHT-LOOK-CAKEY/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-04-DAY-VS-NIGHT-LOOK-CAKEY/5.webp'
      ]
    },
    {
      id: 'CC-D05',
      title: "Why Home Facials Are Ruining Your Glow",
      label: 'Carousel 05',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-05-STOP-DOING-THIS-WHY-HOME-FACIALS-ARE-RUINING-YOUR-GLOW/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-05-STOP-DOING-THIS-WHY-HOME-FACIALS-ARE-RUINING-YOUR-GLOW/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-05-STOP-DOING-THIS-WHY-HOME-FACIALS-ARE-RUINING-YOUR-GLOW/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-05-STOP-DOING-THIS-WHY-HOME-FACIALS-ARE-RUINING-YOUR-GLOW/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-05-STOP-DOING-THIS-WHY-HOME-FACIALS-ARE-RUINING-YOUR-GLOW/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-05-STOP-DOING-THIS-WHY-HOME-FACIALS-ARE-RUINING-YOUR-GLOW/5.webp'
      ]
    },
    {
      id: 'CC-D06',
      title: "The 1-Minute Hair Test You Need To Do",
      label: 'Carousel 06',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-06-THE-1-MINUTE-HAIR-TEST-YOU-NEED-TO-DO/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-06-THE-1-MINUTE-HAIR-TEST-YOU-NEED-TO-DO/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-06-THE-1-MINUTE-HAIR-TEST-YOU-NEED-TO-DO/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-06-THE-1-MINUTE-HAIR-TEST-YOU-NEED-TO-DO/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-06-THE-1-MINUTE-HAIR-TEST-YOU-NEED-TO-DO/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-06-THE-1-MINUTE-HAIR-TEST-YOU-NEED-TO-DO/5.webp'
      ]
    },
    {
      id: 'CC-D07',
      title: "Why That Lipstick Looks Bad On You",
      label: 'Carousel 07',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-07-WHY-THAT-LIPSTICK-LOOKS-BAD-ON-YOU/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-07-WHY-THAT-LIPSTICK-LOOKS-BAD-ON-YOU/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-07-WHY-THAT-LIPSTICK-LOOKS-BAD-ON-YOU/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-07-WHY-THAT-LIPSTICK-LOOKS-BAD-ON-YOU/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-07-WHY-THAT-LIPSTICK-LOOKS-BAD-ON-YOU/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-07-WHY-THAT-LIPSTICK-LOOKS-BAD-ON-YOU/5.webp'
      ]
    },
    {
      id: 'CC-D08',
      title: "What Your Acne Is Trying To Tell You",
      label: 'Carousel 08',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-08-ACNE-ZONES-WHAT-YOUR-ACNE-IS-TRYING-TO-TELL-YOU/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-08-ACNE-ZONES-WHAT-YOUR-ACNE-IS-TRYING-TO-TELL-YOU/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-08-ACNE-ZONES-WHAT-YOUR-ACNE-IS-TRYING-TO-TELL-YOU/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-08-ACNE-ZONES-WHAT-YOUR-ACNE-IS-TRYING-TO-TELL-YOU/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-08-ACNE-ZONES-WHAT-YOUR-ACNE-IS-TRYING-TO-TELL-YOU/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-08-ACNE-ZONES-WHAT-YOUR-ACNE-IS-TRYING-TO-TELL-YOU/5.webp'
      ]
    },
    {
      id: 'CC-D09',
      title: "Is Your Shampoo Killing Your Hair?",
      label: 'Carousel 09',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-09-IS-YOUR-SHAMPOO-KILLING-YOUR-HAIR/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-09-IS-YOUR-SHAMPOO-KILLING-YOUR-HAIR/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-09-IS-YOUR-SHAMPOO-KILLING-YOUR-HAIR/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-09-IS-YOUR-SHAMPOO-KILLING-YOUR-HAIR/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-09-IS-YOUR-SHAMPOO-KILLING-YOUR-HAIR/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-09-IS-YOUR-SHAMPOO-KILLING-YOUR-HAIR/5.webp'
      ]
    },
    {
      id: 'CC-D10',
      title: "Confused Which Nail Shape Suits You?",
      label: 'Carousel 10',
      aspect: 'aspect-[4/5]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-10-CONFUSED-WHICH-NAIL-SHAPE-SUITS-YOU/1.webp',
      slides: [
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-10-CONFUSED-WHICH-NAIL-SHAPE-SUITS-YOU/1.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-10-CONFUSED-WHICH-NAIL-SHAPE-SUITS-YOU/2.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-10-CONFUSED-WHICH-NAIL-SHAPE-SUITS-YOU/3.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-10-CONFUSED-WHICH-NAIL-SHAPE-SUITS-YOU/4.webp',
        'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Dark-10-CONFUSED-WHICH-NAIL-SHAPE-SUITS-YOU/5.webp'
      ]
    }
  ]
};

export const cutsAndCurvesReelCovers = {
  set1: [
    {
      id: 'CC-RC-01',
      title: 'Reel Cover 01',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/1.webp'
    },
    {
      id: 'CC-RC-02',
      title: 'Reel Cover 02',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/2.webp'
    },
    {
      id: 'CC-RC-03',
      title: 'Reel Cover 03',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/3.webp'
    },
    {
      id: 'CC-RC-04',
      title: 'Reel Cover 04',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/4.webp'
    },
    {
      id: 'CC-RC-05',
      title: 'Reel Cover 05',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/5.webp'
    },
    {
      id: 'CC-RC-06',
      title: 'Reel Cover 06',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/6.webp'
    },
    {
      id: 'CC-RC-07',
      title: 'Reel Cover 07',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/7.webp'
    },
    {
      id: 'CC-RC-08',
      title: 'Reel Cover 08',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/8.webp'
    },
    {
      id: 'CC-RC-09',
      title: 'Reel Cover 09',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/9.webp'
    },
    {
      id: 'CC-RC-10',
      title: 'Reel Cover 10',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/10.webp'
    },
    {
      id: 'CC-RC-11',
      title: 'Reel Cover 11',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/11.webp'
    },
    {
      id: 'CC-RC-12',
      title: 'Reel Cover 12',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/12.webp'
    },
    {
      id: 'CC-RC-13',
      title: 'Reel Cover 13',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/13.webp'
    },
    {
      id: 'CC-RC-14',
      title: 'Reel Cover 14',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/14.webp'
    },
    {
      id: 'CC-RC-15',
      title: 'Reel Cover 15',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/15.webp'
    },
    {
      id: 'CC-RC-16',
      title: 'Reel Cover 16',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/16.webp'
    },
    {
      id: 'CC-RC-17',
      title: 'Reel Cover 17',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/17.webp'
    }
  ],
  set2: [
    {
      id: 'CC-RC-18',
      title: 'Reel Cover 18',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/18.webp'
    },
    {
      id: 'CC-RC-19',
      title: 'Reel Cover 19',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/19.webp'
    },
    {
      id: 'CC-RC-20',
      title: 'Reel Cover 20',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/20.webp'
    },
    {
      id: 'CC-RC-21',
      title: 'Reel Cover 21',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/21.webp'
    },
    {
      id: 'CC-RC-22',
      title: 'Reel Cover 22',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/22.webp'
    },
    {
      id: 'CC-RC-23',
      title: 'Reel Cover 23',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/23.webp'
    },
    {
      id: 'CC-RC-24',
      title: 'Reel Cover 24',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/24.webp'
    },
    {
      id: 'CC-RC-25',
      title: 'Reel Cover 25',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/25.webp'
    },
    {
      id: 'CC-RC-26',
      title: 'Reel Cover 26',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/26.webp'
    },
    {
      id: 'CC-RC-27',
      title: 'Reel Cover 27',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/27.webp'
    },
    {
      id: 'CC-RC-28',
      title: 'Reel Cover 28',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/28.webp'
    },
    {
      id: 'CC-RC-29',
      title: 'Reel Cover 29',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/29.webp'
    },
    {
      id: 'CC-RC-30',
      title: 'Reel Cover 30',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/30.webp'
    },
    {
      id: 'CC-RC-31',
      title: 'Reel Cover 31',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/31.webp'
    },
    {
      id: 'CC-RC-32',
      title: 'Reel Cover 32',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/32.webp'
    },
    {
      id: 'CC-RC-33',
      title: 'Reel Cover 33',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/33.webp'
    },
    {
      id: 'CC-RC-34',
      title: 'Reel Cover 34',
      label: 'Reel Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Reel-Cover/34.webp'
    }
  ]
};

export const cutsAndCurvesComboFestivalOffers = [
    {
      id: 'CC-CFO-01',
      title: 'Combo / Festival Offer 01',
      label: 'Combo / Festival Offer',
      aspect: 'aspect-[1587/2245]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Post/1.webp'
    },
    {
      id: 'CC-CFO-02',
      title: 'Combo / Festival Offer 02',
      label: 'Combo / Festival Offer',
      aspect: 'aspect-[1587/2245]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Post/2.webp'
    },
    {
      id: 'CC-CFO-03',
      title: 'Combo / Festival Offer 03',
      label: 'Combo / Festival Offer',
      aspect: 'aspect-[1587/2245]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Post/3.webp'
    },
    {
      id: 'CC-CFO-04',
      title: 'Combo / Festival Offer 04',
      label: 'Combo / Festival Offer',
      aspect: 'aspect-[1587/2245]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Post/4.webp'
    },
    {
      id: 'CC-CFO-05',
      title: 'Combo / Festival Offer 05',
      label: 'Combo / Festival Offer',
      aspect: 'aspect-[1587/2245]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Post/5.webp'
    },
    {
      id: 'CC-CFO-06',
      title: 'Combo / Festival Offer 06',
      label: 'Combo / Festival Offer',
      aspect: 'aspect-[1587/2245]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Post/6.webp'
    },
    {
      id: 'CC-CFO-07',
      title: 'Combo / Festival Offer 07',
      label: 'Combo / Festival Offer',
      aspect: 'aspect-[1587/2245]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Post/7.webp'
    }
];

export const cutsAndCurvesStoryCovers = [
    {
      id: 'CC-SC-01',
      title: 'Story Cover 01',
      label: 'Story Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Post/8.webp'
    },
    {
      id: 'CC-SC-02',
      title: 'Story Cover 02',
      label: 'Story Cover',
      aspect: 'aspect-[9/16]',
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Post/9.webp'
    }
];

export const cutsAndCurves = {
  carousels: cutsAndCurvesCarousels,
  reelCovers: cutsAndCurvesReelCovers,
  festivalOffers: cutsAndCurvesComboFestivalOffers,
  storyCovers: cutsAndCurvesStoryCovers
};

export const waterPlaneCarousels = [
  {
    id: 'WP-01',
    title: "Growth Is a Mindset, Not a Metric",
    label: 'Carousel 01',
    aspect: 'aspect-[3/4]',
    url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/1.webp',
    slides: [
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/1.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/2.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/3.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/4.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/5.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/6.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/7.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/8.webp'
    ]
  },
  {
    id: 'WP-02',
    title: "We Don't Guess, We Measure",
    label: 'Carousel 02',
    aspect: 'aspect-[3/4]',
    url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-02-WE-DONT-GUESS-WE-MEASURE/1.webp',
    slides: [
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-02-WE-DONT-GUESS-WE-MEASURE/1.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-02-WE-DONT-GUESS-WE-MEASURE/2.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-02-WE-DONT-GUESS-WE-MEASURE/3.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-02-WE-DONT-GUESS-WE-MEASURE/4.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-02-WE-DONT-GUESS-WE-MEASURE/5.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-02-WE-DONT-GUESS-WE-MEASURE/6.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-02-WE-DONT-GUESS-WE-MEASURE/7.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-02-WE-DONT-GUESS-WE-MEASURE/8.webp'
    ]
  },
  {
    id: 'WP-03',
    title: "Simplicity Cuts Through the Noise",
    label: 'Carousel 03',
    aspect: 'aspect-[3/4]',
    url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-03-SIMPLICITY-CUTS-THROUGH-THE-NOISE/1.webp',
    slides: [
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-03-SIMPLICITY-CUTS-THROUGH-THE-NOISE/1.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-03-SIMPLICITY-CUTS-THROUGH-THE-NOISE/2.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-03-SIMPLICITY-CUTS-THROUGH-THE-NOISE/3.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-03-SIMPLICITY-CUTS-THROUGH-THE-NOISE/4.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-03-SIMPLICITY-CUTS-THROUGH-THE-NOISE/5.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-03-SIMPLICITY-CUTS-THROUGH-THE-NOISE/6.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-03-SIMPLICITY-CUTS-THROUGH-THE-NOISE/7.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-03-SIMPLICITY-CUTS-THROUGH-THE-NOISE/8.webp'
    ]
  },
  {
    id: 'WP-04',
    title: "Collaboration Creates Stronger Brands",
    label: 'Carousel 04',
    aspect: 'aspect-[3/4]',
    url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-04-COLLABORATION-CREATES-STRONGER-BRANDS/1.webp',
    slides: [
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-04-COLLABORATION-CREATES-STRONGER-BRANDS/1.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-04-COLLABORATION-CREATES-STRONGER-BRANDS/2.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-04-COLLABORATION-CREATES-STRONGER-BRANDS/3.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-04-COLLABORATION-CREATES-STRONGER-BRANDS/4.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-04-COLLABORATION-CREATES-STRONGER-BRANDS/5.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-04-COLLABORATION-CREATES-STRONGER-BRANDS/6.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-04-COLLABORATION-CREATES-STRONGER-BRANDS/7.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-04-COLLABORATION-CREATES-STRONGER-BRANDS/8.webp'
    ]
  },
  {
    id: 'WP-05',
    title: "Branding Isn't Cosmetic",
    label: 'Carousel 05',
    aspect: 'aspect-[3/4]',
    url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-05-BRANDING-ISNT-COSMETIC/1.webp',
    slides: [
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-05-BRANDING-ISNT-COSMETIC/1.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-05-BRANDING-ISNT-COSMETIC/2.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-05-BRANDING-ISNT-COSMETIC/3.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-05-BRANDING-ISNT-COSMETIC/4.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-05-BRANDING-ISNT-COSMETIC/5.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-05-BRANDING-ISNT-COSMETIC/6.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-05-BRANDING-ISNT-COSMETIC/7.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-05-BRANDING-ISNT-COSMETIC/8.webp'
    ]
  },
  {
    id: 'WP-06',
    title: "The Iceberg: What You See vs What You Don’t",
    label: 'Carousel 06',
    aspect: 'aspect-[3/4]',
    url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-06-THE-ICEBERG-WHAT-YOU-SEE-VS-WHAT-YOU-DONT/1.webp',
    slides: [
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-06-THE-ICEBERG-WHAT-YOU-SEE-VS-WHAT-YOU-DONT/1.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-06-THE-ICEBERG-WHAT-YOU-SEE-VS-WHAT-YOU-DONT/2.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-06-THE-ICEBERG-WHAT-YOU-SEE-VS-WHAT-YOU-DONT/3.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-06-THE-ICEBERG-WHAT-YOU-SEE-VS-WHAT-YOU-DONT/4.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-06-THE-ICEBERG-WHAT-YOU-SEE-VS-WHAT-YOU-DONT/5.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-06-THE-ICEBERG-WHAT-YOU-SEE-VS-WHAT-YOU-DONT/6.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-06-THE-ICEBERG-WHAT-YOU-SEE-VS-WHAT-YOU-DONT/7.webp',
      'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-06-THE-ICEBERG-WHAT-YOU-SEE-VS-WHAT-YOU-DONT/8.webp'
    ]
  }
];

export const waterPlaneAgency = {
  carousels: waterPlaneCarousels
};


export const PROJECTS = [
  {
    id: '01',
    name: 'Ranjeet Raj Official',
    role: 'Freelance Graphic Designer | Project-Based Work',
    date: 'January 2026 – August 2026',
    category: 'Social / Personal Brand',
    detail: 'Designed carousel posts for Ranjeet Raj Official based on the content and reference posts provided by the client. I understood the style and theme of the references and created the carousels accordingly, using their red, black, and white colour palette with bold typography and a consistent visual style.',
    featuredImage: { url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/1.webp', alt: 'Ranjeet Raj Official social media and personal brand design' },
    
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
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/1.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/1.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/2.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/3.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/4.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/5.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/6.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/7.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-01-Pro-Designer-Vocabulary-Carousel/8.webp"
          ]
        },
        { 
          id: 'RR-02', 
          title: 'Attractive Brand Colors',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-02-Attractive-Brand-Colors-Carousel/1.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-02-Attractive-Brand-Colors-Carousel/1.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-02-Attractive-Brand-Colors-Carousel/2.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-02-Attractive-Brand-Colors-Carousel/3.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-02-Attractive-Brand-Colors-Carousel/4.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-02-Attractive-Brand-Colors-Carousel/5.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-02-Attractive-Brand-Colors-Carousel/6.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-02-Attractive-Brand-Colors-Carousel/7.webp"
          ]
        },
        { 
          id: 'RR-03', 
          title: 'The Batching System',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/1.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/1.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/2.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/3.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/4.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/5.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/6.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/7.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/8.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/9.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-03-The-Batching-System-Carousel/10.webp"
          ]
        },
        { 
          id: 'RR-04', 
          title: 'Top Canva Background Keywords',
          label: 'Carousel', 
          aspect: 'aspect-[4/5]', 
          url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/1.webp',
          slides: [
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/1.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/2.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/3.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/4.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/5.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/6.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/7.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/8.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/9.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/10.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/11.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/12.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/13.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/14.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/15.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/16.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/17.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/18.webp",
            "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/RanjeetRaj/Carousel/RR-04-Top-Canva-Background-Keywords-Carousel/19.webp"
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
  },
  {
    id: '04',
    name: 'Cuts & Curves',
    role: 'Freelance Graphic Designer | Project-Based Work',
    date: '2024',
    category: 'Fitness / Social Media',
    detail: 'Designed a high-volume social media visual system for Cuts & Curves across fitness carousels, reel covers, and promotional festival creatives, maintaining high visual consistency for fitness and lifestyle branding.',
    featuredImage: { 
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Cuts-and-Curves/Carousel/CC-Light-01-IS-YOUR-SHOWER-WATER-RUINING-YOUR-HAIR/1.webp', 
      alt: 'Cuts & Curves fitness and beauty social media design' 
    },
    
    tint: 'bg-[#F4F8F3]',
    tintDark: 'dark:bg-[#121A14]',
    tintLightWC: 'bg-[#F2F7F2]',
    tintDarkWC: 'dark:bg-[#111913]',
    accentWC: 'text-[#16A34A]',
    
    assets: cutsAndCurves
  },
  {
    id: '05',
    name: 'WaterPlane Agency',
    role: 'Freelance Graphic Designer | Project-Based Work',
    date: '2024',
    category: 'Carousel Designs',
    detail: 'Designed strategic educational and branding carousels for WaterPlane Agency, delivering visual storytelling, consistent agency brand aesthetic, bold typography, and marketing psychology frameworks across 6 carousels.',
    featuredImage: { 
      url: 'https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/WaterPlane/Carousel/WP-01-Growth-Is-a-Mindset-Not-a-Metric/1.webp', 
      alt: 'WaterPlane Agency marketing and branding carousel design' 
    },
    
    tint: 'bg-[#EFF6FF]',
    tintDark: 'dark:bg-[#0F172A]',
    tintLightWC: 'bg-[#F0F7FF]',
    tintDarkWC: 'dark:bg-[#0E1626]',
    accentWC: 'text-[#2563EB]',
    
    assets: waterPlaneAgency
  }
];
