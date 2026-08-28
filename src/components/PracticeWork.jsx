export default function PracticeWork() {
  const tiles = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    label: 'Study'
  }));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-16">
        <h3 className="font-heading font-normal text-sm tracking-[0.1em] text-[#007BFF] dark:text-[#FFD722] mb-3">
          03 &middot; PRACTICE WORK
        </h3>
        <p className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
          Studies & self-initiated work
        </p>
      </div>

      {/* Uniform Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-16">
        {tiles.map((tile) => (
          <div key={tile.id} className="flex flex-col gap-3">
            <div
              className="
                w-full aspect-square rounded-2xl bg-secondary-bg 
                border border-dashed border-border flex items-center justify-center 
                relative transition-colors hover:bg-black/5 dark:hover:bg-white/5
              "
              aria-label={`Format placeholder: ${tile.label}`}
            >
              {/* No text inside the tile for practice work, keeping it clean */}
            </div>
            <p className="text-center font-heading font-normal text-[10px] uppercase tracking-widest text-text-muted">
              {tile.label} {String(tile.id).padStart(2, '0')}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="pt-8 border-t border-border/50 text-center">
        <p className="font-heading font-normal text-[11px] uppercase tracking-[0.1em] text-text-muted">
          More coming soon
        </p>
      </div>
    </div>
  );
}
