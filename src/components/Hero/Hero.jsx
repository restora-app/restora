import { MdBatteryAlert } from 'react-icons/md';

/**
 * Hero section with animated battery icon, headline, subtext, and CTA button.
 */
export default function Hero() {
  return (
    <header className="max-w-[800px] mx-auto px-gutter pt-[112px] pb-lg text-center flex flex-col items-center gap-md">
      <div className="w-16 h-16 bg-secondary-fixed flex items-center justify-center rounded-full mb-sm animate-gentle-bounce">
        <MdBatteryAlert size={30} className="text-primary" />
      </div>

      <h1 className="text-headline-xl md:text-headline-xl max-w-2xl text-primary leading-tight">
        Does your brain feel like it's running on 12% battery by 3pm?
      </h1>

      <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
        This 60-second study explores if cognitive fatigue is a widespread
        problem. No sales pitch, just research.
      </p>

      <a
        href="#survey-anchor"
        className="mt-md bg-primary text-on-primary font-bold py-md px-xl rounded-full bloom-shadow-primary hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Take the 60-Second Check
      </a>
    </header>
  );
}
