import { useEffect, useRef } from 'react';

/**
 * Fixed ambient blurred orbs that float behind all content.
 * Includes a lightweight parallax scroll effect.
 */
export default function BackgroundOrbs() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrolled = window.pageYOffset;
      const orbs = containerRef.current.children;
      Array.from(orbs).forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute w-[500px] h-[500px] -top-24 -left-24 bg-primary-fixed rounded-full blur-[80px] animate-slow-pulse-8" />
      <div className="absolute w-[600px] h-[600px] top-1/2 -right-32 bg-secondary-fixed rounded-full blur-[80px] animate-slow-pulse-12" />
      <div className="absolute w-[400px] h-[400px] bottom-0 left-1/4 bg-tertiary-fixed rounded-full blur-[80px] animate-slow-pulse-10" />
    </div>
  );
}
