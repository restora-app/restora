/**
 * Decorative visual break section with spa icon and "Designing for Cognitive Ease" label.
 */
export default function VisualBreak() {
  return (
    <section className="max-w-[800px] mx-auto px-gutter my-xl">
      <div className="relative overflow-hidden rounded-xl h-64">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-tertiary-fixed/20 backdrop-blur-sm" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-tertiary animate-slow-pulse-4">
              spa
            </span>
            <p className="text-headline-md text-secondary mt-sm">
              Designing for Cognitive Ease
            </p>
          </div>
        </div>

        {/* Decorative blurred orbs */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary-fixed/40 rounded-full blur-2xl" />
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary-fixed/30 rounded-full blur-2xl" />
      </div>
    </section>
  );
}
