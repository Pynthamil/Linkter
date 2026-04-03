import { useRef, useEffect } from 'react';
import { LayoutGrid, Folders, ChevronLeft } from 'lucide-react';
import gsap from 'gsap';

const ALL_TAGS = [
  'All', 'Design', 'Productivity', 'Coding', 'Frontend', 'Backend', 'DevOps', 'Open Source', 'Inspiration', 'UI/UX', 'Tools'
];

export default function TagFilter({ 
  activeTag, 
  onTagChange, 
  currentView, 
  onViewChange, 
  activeBoard, 
  onReset 
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chips = containerRef.current.querySelectorAll('.filter-chip, .view-toggle-btn');
    gsap.fromTo(
      chips,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
    );
  }, [currentView, activeBoard]);

  return (
    <div className="top-nav-container" style={{ padding: '0 20px', marginBottom: '24px' }}>
      <div className="filter-bar-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px' }}>
        
        {/* Board Detail Header (Breadcrumb style) */}
        {activeBoard && (
          <div className="board-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={onReset} className="back-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px', borderRadius: '50%', backgroundColor: '#f0f0f0', transition: 'all 0.2s' }}>
              <ChevronLeft size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>{activeBoard.icon}</span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{activeBoard.name}</h2>
            </div>
          </div>
        )}

        {/* Tag Filter (Only shown in Feed or specific Board view) */}
        {!activeBoard && currentView === 'feed' && (
          <div className="filter-bar" id="tag-filter" ref={containerRef} style={{ margin: 0, padding: 0, border: 'none' }}>
            {ALL_TAGS.map((tag, idx) => (
              <button
                key={`${tag}-${idx}`}
                className={`filter-chip ${activeTag === tag.toLowerCase() ? 'active' : ''}`}
                onClick={() => onTagChange(tag.toLowerCase())}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
