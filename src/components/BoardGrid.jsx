import { useRef, useEffect } from 'react';
import { Plus, Folder } from 'lucide-react';
import gsap from 'gsap';

export default function BoardGrid({ boards, onBoardClick, onCreateClick }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tiles = containerRef.current.querySelectorAll('.board-tile');
    gsap.fromTo(
      tiles,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="board-grid" ref={containerRef}>
      {/* Create New Board Tile */}
      <button className="board-tile create" onClick={onCreateClick}>
        <div className="board-icon-wrapper create">
          <Plus size={32} strokeWidth={1.5} />
        </div>
        <span className="board-name">New Board</span>
      </button>

      {/* Render Boards */}
      {boards.map((board) => (
        <button 
          key={board.id} 
          className="board-tile" 
          onClick={() => onBoardClick(board.id)}
        >
          <div className="board-icon-wrapper">
            <span className="board-emoji">{board.icon}</span>
          </div>
          <div className="board-info">
            <span className="board-name">{board.name}</span>
            <span className="board-count">{board.linkIds.length} items</span>
          </div>
        </button>
      ))}
    </div>
  );
}
