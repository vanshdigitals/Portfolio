export function PlaceholderSection({ id, num, title, desc }) {
  return (
    <section id={id} className="py-32">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 xl:px-20">
        <div className="flex items-center justify-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl text-center">{title}</h2>
        </div>
        
        {/* PLACEHOLDER: Real structural layout goes here in the future */}
        <div className="min-h-[240px] bg-secondary-bg border border-dashed border-border flex items-center justify-center p-8 text-center font-heading font-normal text-sm text-secondary-text">
          {/* PLACEHOLDER: {desc} */}
          [ Placeholder structural container for future content: {desc} ]
        </div>
      </div>
    </section>
  );
}
