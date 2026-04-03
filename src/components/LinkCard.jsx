import { useRef, useEffect, useState } from 'react';
import { Bookmark, Plus, Folder } from 'lucide-react';
import gsap from 'gsap';

export default function LinkCard({ link, index, boards = [], onAddToBoard }) {
  const cardRef = useRef(null);
  const [isSaved, setIsSaved] = useState(link.saved);
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const bookmarkRef = useRef(null);
  const menuRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: index * 0.05, ease: 'power3.out' }
    );
  }, [index]);

  // Menu animation
  useEffect(() => {
    if (showBoardMenu) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, scale: 0.9, y: -10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out' }
      );
    }
  }, [showBoardMenu]);

  const toggleSave = (e) => {
    e.preventDefault();
    setIsSaved((prev) => !prev);
    if (bookmarkRef.current) {
      gsap.fromTo(
        bookmarkRef.current,
        { scale: 0.7 },
        { scale: 1, duration: 0.4, ease: 'back.out(2)' }
      );
    }
  };

  return (
    <article className="minimal-card" ref={cardRef} id={`link-card-${link.id}`}>
      <div className="card-top">
        <div className="card-actions-top">
          <button 
            className={`card-bookmark-icon ${isSaved ? 'saved' : ''}`} 
            onClick={toggleSave}
            aria-label="Save bookmark"
          >
            <span ref={bookmarkRef} style={{ display: 'inline-block' }}>
              <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={1.5} />
            </span>
          </button>
          
          <div className="board-add-wrapper" style={{ position: 'relative' }}>
            <button 
              className="card-add-board-btn" 
              onClick={() => setShowBoardMenu(!showBoardMenu)}
              aria-label="Add to Board"
            >
              <Plus size={18} />
            </button>
            
            {showBoardMenu && (
              <div 
                className="board-selection-menu" 
                ref={menuRef}
                onMouseLeave={() => setShowBoardMenu(false)}
                style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                  backgroundColor: '#fff', borderRadius: '12px', border: '1px solid var(--border-subtle)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 100, width: '180px', padding: '8px'
                }}
              >
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#999', margin: '4px 8px 8px' }}>Move to board</p>
                {boards.map(board => (
                  <button
                    key={board.id}
                    className="menu-item"
                    onClick={() => {
                      onAddToBoard(link.id, board.id);
                      setShowBoardMenu(false);
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px',
                      borderRadius: '8px', transition: 'background 0.2s', textAlign: 'left',
                      fontSize: '0.875rem'
                    }}
                  >
                    <span>{board.icon}</span>
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{board.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <h2 className="card-large-domain">{link.domain}</h2>
      </div>
      
      <div className="card-bottom">
        <div className="card-info">
          <img src={link.favicon} alt={`${link.domain} favicon`} className="card-favicon" />
          <span className="card-domain-small">{link.domain}</span>
        </div>
        <a 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-visit"
        >
          Visit
        </a>
      </div>
    </article>
  );
}
