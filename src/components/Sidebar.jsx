import { Link2, LayoutGrid, Folders, Plus, Settings } from 'lucide-react';

export default function Sidebar({ 
  currentView, 
  onViewChange, 
  boards, 
  activeBoardId, 
  onBoardClick,
  onAddLink,
  onCreateBoard
}) {
  return (
    <aside className="sidebar-strip">
      <div className="sidebar-top">
        <div className="sidebar-logo-v" title="Linkter Home" onClick={() => { onViewChange('feed'); onBoardClick(null); }}>
          <div className="logo-icon-v">
            <Link2 size={24} color="white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <nav className="mini-nav">
        <button 
          className={`mini-nav-item ${currentView === 'feed' && !activeBoardId ? 'active' : ''}`}
          onClick={() => {
            onViewChange('feed');
            onBoardClick(null);
          }}
          title="All Feed"
        >
          <LayoutGrid size={24} />
        </button>
        
        <button 
          className={`mini-nav-item ${currentView === 'boards' ? 'active' : ''}`}
          onClick={() => {
            onViewChange('boards');
            onBoardClick(null);
          }}
          title="All Boards"
        >
          <Folders size={24} />
        </button>

        <div className="mini-divider" />

        {/* Board Icons (Emoji-based) */}
        <div className="mini-board-list">
          {boards.map(board => (
            <button
              key={board.id}
              className={`mini-board-item ${activeBoardId === board.id ? 'active' : ''}`}
              onClick={() => onBoardClick(board.id)}
              title={board.name}
            >
              <span className="mini-emoji">{board.icon}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-bottom">
        <button className="icon-action-btn" onClick={onAddLink} title="Add New Link">
          <Plus size={24} strokeWidth={2.5} />
        </button>
        <div className="mini-divider" />
        <button className="icon-action-btn ghost" title="Settings">
          <Settings size={24} />
        </button>
      </div>
    </aside>
  );
}
