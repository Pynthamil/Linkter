import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const ALL_TAGS = [
  'All',
  'Design',
  'Productivity',
  'Coding',
  'Frontend',
  'Backend',
  'DevOps',
  'Open Source',
  'Inspiration',
  'UI/UX',
  'Tools'
];

export default function TagFilter({ activeTag, onTagChange }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chips = containerRef.current.querySelectorAll('.filter-chip');
    gsap.fromTo(
      chips,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
    );
  }, []);

  // Using index as key because of deliberate duplicate tags matching the reference design layout
  return (
    <div className="filter-bar" id="tag-filter" ref={containerRef}>
      {ALL_TAGS.map((tag, idx) => (
        <button
          key={`${tag}-${idx}`}
          className={`filter-chip ${activeTag === tag.toLowerCase() ? 'active' : ''}`}
          onClick={() => onTagChange(tag.toLowerCase())}
          id={`filter-chip-${tag.toLowerCase()}-${idx}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
