/**
 * Reusable glass-panel info card with a title and description.
 * Used for the "The Fog is Real" section.
 */
export default function InfoCard({ title, description }) {
  return (
    <section className="max-w-[800px] mx-auto px-gutter mb-xl">
      <div className="glass-panel p-lg rounded-xl border-2 border-outline-variant/30 text-center opacity-0 animate-fade-in-up">
        <h2 className="text-headline-md text-secondary mb-sm">{title}</h2>
        <p className="text-body-md text-on-surface-variant max-w-lg mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
