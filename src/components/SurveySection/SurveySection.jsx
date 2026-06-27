import QuestionCard from '../QuestionCard/QuestionCard';

/**
 * Self-assessment survey section.
 * Renders a header and a grid of QuestionCard components.
 */
export default function SurveySection({ questions }) {
  return (
    <section
      id="survey-anchor"
      className="max-w-[800px] mx-auto px-gutter flex flex-col gap-sm"
    >
      <div className="mb-md text-center">
        <span className="text-label-md text-tertiary uppercase tracking-widest">
          Self-Assessment
        </span>
        <p className="text-body-md text-on-surface-variant">
          Tap the cards that resonate with your current state.
        </p>
      </div>

      <div className="grid gap-sm">
        {questions.map((q) => (
          <QuestionCard key={q.id} icon={q.icon} text={q.text} />
        ))}
      </div>
    </section>
  );
}
