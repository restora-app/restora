/**
 * Footer with brand name, nav links, and copyright.
 */
import logo from '../../assets/images/logo.png';

export default function Footer() {
  return (
    <footer className="w-full py-xl bg-surface-container-low mt-xl flex flex-col items-center gap-md text-center px-gutter">
      <div className="flex items-center justify-center gap-sm">
        <img src={logo} alt="Restora Logo" className="h-10 w-auto object-contain" />
        <span className="text-headline-lg text-primary font-bold">Restora</span>
      </div>
      <p className="text-body-sm text-on-surface-variant font-medium tracking-wide">
        Out of the Fog, Into the Flow
      </p>

      <div className="flex flex-wrap justify-center gap-md">
        {/* <a
          href="#"
          className="text-on-surface-variant font-medium hover:text-primary transition-colors"
        >
          Research Ethics
        </a> */}
        <a
          href="#"
          className="text-on-surface-variant font-medium hover:text-primary transition-colors"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-on-surface-variant font-medium hover:text-primary transition-colors"
        >
          Contact Support
        </a>
      </div>

      <p className="text-body-md text-on-surface-variant max-w-xs opacity-80">
        © 2026 Cognitive Health Research. Crafted for human minds.
      </p>
    </footer>
  );
}
