/**
 * Call-to-action teaser: headline, email input, submit button, and privacy note.
 */
export default function ResultTeaser() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Future: handle email submission
  };

  return (
    <section className="max-w-[800px] mx-auto px-gutter mt-lg">
      <div className="p-lg bg-surface-container rounded-xl text-center border border-primary/10">
        <p className="text-headline-md text-primary">
          If 3+ of these felt true, you're not imagining it — here's what's next
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-md flex flex-col md:flex-row items-center justify-center gap-sm"
        >
          <input
            type="email"
            placeholder="Email (for research results)"
            aria-label="Email for research results"
            className="bg-surface-container-lowest border-2 border-outline-variant rounded-full px-md py-sm w-full md:w-64 focus:border-primary focus:ring-0 focus:outline-none transition-colors text-body-md text-on-surface"
          />
          <button
            type="submit"
            className="bg-primary text-on-primary px-lg py-sm rounded-full font-bold hover:scale-105 transition-transform whitespace-nowrap bloom-shadow-primary"
          >
            Show Me My Results
          </button>
        </form>

        <p className="mt-sm text-label-sm text-on-surface-variant opacity-60">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </section>
  );
}
