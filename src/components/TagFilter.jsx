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
      <div className="filter-bar-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        
        {/* Left: View Toggle (Feed vs Boards) */}
        {!activeBoard && (
          <div className="view-toggle" style={{ display: 'flex', gap: '8px', padding: '4px', backgroundColor: '#f0f0f0', borderRadius: '12px' }}>
            <button 
              className={`view-toggle-btn ${currentView === 'feed' ? 'active' : ''}`}
              onClick={() => onViewChange('feed')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
                backgroundColor: currentView === 'feed' ? '#fff' : 'transparent',
                boxShadow: currentView === 'feed' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s'
              }}
            >
              <LayoutGrid size={16} /> Feed
            </button>
            <button 
              className={`view-toggle-btn ${currentView === 'boards' ? 'active' : ''}`}
              onClick={() => onViewChange('boards')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
                backgroundColor: currentView === 'boards' ? '#fff' : 'transparent',
                boxShadow: currentView === 'boards' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s'
              }}
            >
              <Folders size={16} /> Boards
            </button>
          </div>
        )}

        {/* Board Detail Header */}
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

        {/* Right: Tag Filter (Only shown in Feed or specific Board view) */}
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
