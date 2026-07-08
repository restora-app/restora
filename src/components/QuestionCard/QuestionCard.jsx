import { MdCheck, MdClose } from 'react-icons/md';

/**
 * Individual self-assessment question card.
 * Users respond with options (defaults to Yes / No).
 */
export default function QuestionCard({ text, answer, onAnswer, options }) {
  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-xl md:text-2xl font-bold text-center text-on-surface mb-4 max-w-xl mx-auto leading-snug">
        {text}
      </h3>

      <div
        className={`grid gap-3 w-full ${
          options && options.length >= 4
            ? 'grid-cols-1 sm:grid-cols-2 max-w-[600px]'
            : 'grid-cols-1 max-w-[400px]'
        }`}
      >
        {options ? (
          options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onAnswer(opt.value)}
              className={`flex items-center p-3 rounded-2xl font-bold text-base transition-all border-2
                ${
                  answer === opt.value
                    ? 'bg-[#fcece4] border-[#fcece4] text-[#b64b16]'
                    : 'bg-[#fcfaf8] border-[#f4ece3] text-on-surface hover:border-[#e8dacd]'
                }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-4
                  ${
                    answer === opt.value
                      ? 'bg-[#f3d9cd] text-[#b64b16]'
                      : 'bg-[#f4ece3] text-on-surface-variant'
                  }`}
              >
                {answer === opt.value ? <MdCheck size={16} /> : null}
              </div>
              <span className="flex-1 text-center pr-2">{opt.label}</span>
            </button>
          ))
        ) : (
          <>
            <button
              type="button"
              onClick={() => onAnswer('yes')}
              className={`flex items-center p-3 rounded-2xl font-bold text-base transition-all border-2
                ${
                  answer === 'yes'
                    ? 'bg-[#fcece4] border-[#fcece4] text-[#b64b16]'
                    : 'bg-[#fcfaf8] border-[#f4ece3] text-on-surface hover:border-[#e8dacd]'
                }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-4
                  ${
                    answer === 'yes'
                      ? 'bg-[#f3d9cd] text-[#b64b16]'
                      : 'bg-[#f4ece3] text-on-surface-variant'
                  }`}
              >
                <MdCheck size={16} />
              </div>
              <span className="flex-1 text-center pr-12">Yes</span>
            </button>

            <button
              type="button"
              onClick={() => onAnswer('no')}
              className={`flex items-center p-3 rounded-2xl font-bold text-base transition-all border-2
                ${
                  answer === 'no'
                    ? 'bg-[#f5f5f5] border-[#e0e0e0] text-on-surface'
                    : 'bg-[#fcfaf8] border-[#f4ece3] text-on-surface hover:border-[#e8dacd]'
                }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-4
                  ${
                    answer === 'no'
                      ? 'bg-[#e0e0e0] text-on-surface-variant'
                      : 'bg-[#f4ece3] text-on-surface-variant'
                  }`}
              >
                <MdClose size={16} />
              </div>
              <span className="flex-1 text-center pr-12">No</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
