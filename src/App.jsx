import { useState, useMemo, useEffect } from 'react';
import TagFilter from './components/TagFilter';
import HeroSearch from './components/HeroSearch';
import MasonryGrid from './components/MasonryGrid';
import BoardGrid from './components/BoardGrid';
import CreateBoardModal from './components/CreateBoardModal';
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

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('linkter-links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('linkter-boards', JSON.stringify(boards));
  }, [boards]);

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

  return (
    <>
      {/* 1. Pill Filter Bar at the very top */}
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

      {/* 3. Main Content Grid holding either Cards or Board folders */}
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

      {/* 4. Modals */}
      <CreateBoardModal 
        isOpen={isBoardModalOpen} 
        onClose={() => setIsBoardModalOpen(false)} 
        onAdd={handleAddBoard} 
      />
    </>
  );
}
