export default function SampleWork() {
  // A mix of aspect ratios to create a varied masonry-like feel
  const tiles = [
    { id: 1, aspect: 'aspect-[3/4]', label: 'Poster Concept' },
    { id: 2, aspect: 'aspect-square', label: 'Social Square' },
    { id: 3, aspect: 'aspect-[4/5]', label: 'Carousel Slide' },
    { id: 4, aspect: 'aspect-[16/9]', label: 'Web Banner' },
    { id: 5, aspect: 'aspect-square', label: 'Brand Mark' },
    { id: 6, aspect: 'aspect-[3/4]', label: 'Reel Cover' },
    { id: 7, aspect: 'aspect-[4/5]', label: 'Carousel Slide' },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-16">
        <h3 className="font-mono text-sm tracking-[0.1em] text-[#007BFF] dark:text-[#FFD722] mb-3">
          02 &middot; SAMPLE WORK
        </h3>
        <p className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
          Explorations & concept pieces
        </p>
      </div>

      {/* Masonry-like Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-16">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={`
              w-full ${tile.aspect} rounded-2xl bg-secondary-bg 
              border border-dashed border-border flex items-center justify-center 
              p-6 text-center text-text-muted font-mono text-[10px] uppercase tracking-widest
              relative break-inside-avoid
              transition-colors hover:bg-black/5 dark:hover:bg-white/5
            `}
            aria-label={`Format placeholder: ${tile.label}`}
          >
            {tile.label}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="pt-8 border-t border-border/50 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
          More coming soon
        </p>
      </div>
    </div>
  );
}
