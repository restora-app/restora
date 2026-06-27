import { MdPsychology, MdInfoOutline } from 'react-icons/md';

/**
 * Fixed top navigation bar with brand name and icon buttons.
 */
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex justify-between items-center max-w-[800px] mx-auto px-md py-sm">
        <span className="text-headline-md font-bold text-primary">
          Clarity Study
        </span>
        <div className="flex items-center gap-md">
          <button
            className="text-primary hover:opacity-70 transition-opacity"
            title="Research Info"
          >
            <MdPsychology size={24} />
          </button>
          <button
            className="text-primary hover:opacity-70 transition-opacity"
            title="Support"
          >
            <MdInfoOutline size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
