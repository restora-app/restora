/**
 * Fixed top navigation bar with brand name and text nav links.
 */
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { trackEvent } from "../../lib/analytics";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const anchorLinks = [
    { label: 'Approach', href: '#solution' },
    { label: 'Survey', href: '#survey-anchor' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 transition-all duration-300 bg-surface/90 backdrop-blur-xl border border-outline-variant/20 rounded-full shadow-[0_12px_40px_-12px_rgba(158,61,0,0.2)]">
      <div className="flex justify-between items-center w-full px-md py-sm sm:px-lg">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-xs">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <img src={logo} alt="Restora Logo" className="h-8 w-auto object-contain" />
          </div>
          <span className="text-headline-md font-bold text-primary">
            Restora
          </span>
        </Link>

        {/* Links and CTA */}
        <div className="flex items-center gap-md sm:gap-lg">
          <div className="hidden md:flex items-center gap-md">
            {/* Anchor links — only work on home page, so navigate there if needed */}
            {anchorLinks.map((link) =>
              isHome ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-label-md text-on-surface-variant font-bold hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={`/${link.href}`}
                  className="text-label-md text-on-surface-variant font-bold hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            )}

            {/* About Us — route link */}
            <Link
              to="/about"
              className="text-label-md text-on-surface-variant font-bold hover:text-primary transition-colors duration-300"
            >
              About Us
            </Link>
          </div>

          <Link
            to={isHome ? '/#survey-anchor' : '/'}
            onClick={(e) => {
              trackEvent("Clicked Get Started", { location: "navbar" });
              if (isHome) {
                e.preventDefault();
                document.getElementById('survey-anchor')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-xs bg-primary text-on-primary px-md py-[10px] rounded-full text-label-md font-bold hover:bg-primary/90 transition-colors shadow-sm"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
