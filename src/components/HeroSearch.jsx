import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function HeroSearch() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  return (
    <div className="hero-section" ref={containerRef}>
      <h1 className="hero-title">Linkter.</h1>
      
      {/* We use the generated placeholder illustration to mimic the search bar graphic */}
      <img 
        src="/search-illustration.png" 
        alt="Search illustration" 
        className="hero-illustration"
        id="hero-search-illustration"
      />
    </div>
  );
}
