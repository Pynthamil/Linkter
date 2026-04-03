import { useState, useMemo } from 'react';
import TagFilter from './components/TagFilter';
import HeroSearch from './components/HeroSearch';
import MasonryGrid from './components/MasonryGrid';
import initialLinks from './data/links.json';

export default function App() {
  const [links, setLinks] = useState(initialLinks);
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered links
  const filteredLinks = useMemo(() => {
    let result = links;
    
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
  }, [links, activeTag, searchQuery]);

  return (
    <>
      {/* 1. Pill Filter Bar at the very top */}
      <TagFilter activeTag={activeTag} onTagChange={setActiveTag} />

      {/* 2. Hero Component with "Linkter." and functional search bar illustration */}
      <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* 3. Main Grid layout holding the cards */}
      <MasonryGrid links={filteredLinks} />
    </>
  );
}
