import { useState, useMemo, useEffect } from 'react';
import TagFilter from './components/TagFilter';
import HeroSearch from './components/HeroSearch';
import MasonryGrid from './components/MasonryGrid';
import BoardGrid from './components/BoardGrid';
import Sidebar from './components/Sidebar';
import CreateBoardModal from './components/CreateBoardModal';
import AddLinkModal from './components/AddLinkModal';
import SettingsDrawer from './components/SettingsDrawer';
import initialLinks from './data/links.json';

const DEFAULT_BOARDS = [
  { id: 'b1', name: 'Design Inspiration', icon: '🎨', linkIds: [1, 3, 5] },
  { id: 'b2', name: 'Developer Tools', icon: '🛠️', linkIds: [2, 4, 7] },
];

export default function App() {
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem('linkter-links');
    return saved ? JSON.parse(saved) : initialLinks;
  });

  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem('linkter-boards');
    return saved ? JSON.parse(saved) : DEFAULT_BOARDS;
  });

  const [currentView, setCurrentView] = useState('feed'); // 'feed' | 'boards'
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('linkter-dark-mode') === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('linkter-links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('linkter-boards', JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    localStorage.setItem('linkter-dark-mode', darkMode);
  }, [darkMode]);

  // Filtered links logic
  const filteredLinks = useMemo(() => {
    let result = links;
    
    // Filter by board if active
    if (activeBoardId) {
      const board = boards.find(b => b.id === activeBoardId);
      if (board) {
        result = result.filter(link => board.linkIds.includes(link.id));
      }
    }

    // Tag filter
    if (activeTag && activeTag !== 'all' && activeTag !== 'All') {
      result = result.filter(link => 
        link.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      );
    }
    
    // Search query filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      result = result.filter(link => 
        link.title.toLowerCase().includes(q) ||
        link.description.toLowerCase().includes(q) ||
        link.domain.toLowerCase().includes(q) ||
        link.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    
    return result;
  }, [links, activeTag, searchQuery, activeBoardId, boards]);

  const handleAddLink = (newLink) => {
    setLinks(prev => [newLink, ...prev]);
  };

  const handleAddBoard = (newBoard) => {
    setBoards(prev => [...prev, newBoard]);
  };

  const handleAddToBoard = (linkId, boardId) => {
    setBoards(prev => prev.map(b => 
      b.id === boardId 
        ? { ...b, linkIds: b.linkIds.includes(linkId) ? b.linkIds : [...b.linkIds, linkId] } 
        : b
    ));
  };

  const navigateToBoard = (boardId) => {
    setActiveBoardId(boardId);
    setCurrentView('feed');
  };

  const resetFilters = () => {
    setActiveBoardId(null);
    setActiveTag('All');
    setCurrentView('feed');
  };

  const handleExportData = () => {
    const data = { links, boards };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkter-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetApp = () => {
    if (window.confirm('Are you sure you want to reset Linkter? All your links and boards will be permanently deleted.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className={`app-layout ${darkMode ? 'dark-mode' : ''}`}>
      {/* 0. Sidebar Navigation */}
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        boards={boards}
        activeBoardId={activeBoardId}
        onBoardClick={navigateToBoard}
        onAddLink={() => setIsLinkModalOpen(true)}
        onCreateBoard={() => setIsBoardModalOpen(true)}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />

      <main className="main-content">
        {/* 1. Pill Filter Bar */}
        <TagFilter 
          activeTag={activeTag} 
          onTagChange={setActiveTag} 
          currentView={currentView}
          onViewChange={setCurrentView}
          activeBoard={boards.find(b => b.id === activeBoardId)}
          onReset={resetFilters}
        />

        {/* 2. Hero Component */}
        <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* 3. Main content area */}
        <div className="scroll-content">
          {currentView === 'boards' ? (
            <BoardGrid 
              boards={boards} 
              onBoardClick={navigateToBoard} 
              onCreateClick={() => setIsBoardModalOpen(true)} 
            />
          ) : (
            <MasonryGrid 
              links={filteredLinks} 
              boards={boards} 
              onAddToBoard={handleAddToBoard}
            />
          )}
        </div>

        {/* 4. Modals / Drawer */}
        <CreateBoardModal 
          isOpen={isBoardModalOpen} 
          onClose={() => setIsBoardModalOpen(false)} 
          onAdd={handleAddBoard} 
        />
        <AddLinkModal 
          isOpen={isLinkModalOpen} 
          onClose={() => setIsLinkModalOpen(false)} 
          onAdd={handleAddLink} 
        />
        <SettingsDrawer 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onExportData={handleExportData}
          onResetApp={handleResetApp}
        />
      </main>
    </div>
  );
}
