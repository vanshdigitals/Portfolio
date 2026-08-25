export function PlaceholderSection({ id, num, title, desc }) {
  return (
    <section id={id} className="py-32">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 xl:px-20">
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-sm text-brand-blue">{num}</span>
          <h2 className="text-3xl md:text-5xl">{title}</h2>
        </div>
        
        {/* PLACEHOLDER: Real structural layout goes here in the future */}
        <div className="min-h-[240px] bg-secondary-bg border border-dashed border-border flex items-center justify-center p-8 text-center font-mono text-sm text-secondary-text">
          {/* PLACEHOLDER: {desc} */}
          [ Placeholder structural container for future content: {desc} ]
        </div>
      </div>
    </section>
  );
}
