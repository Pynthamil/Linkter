import { useState, useMemo } from 'react';
import TagFilter from './components/TagFilter';
import HeroSearch from './components/HeroSearch';
import MasonryGrid from './components/MasonryGrid';
import initialLinks from './data/links.json';

export default function App() {
  const [links, setLinks] = useState(initialLinks);
  const [activeTag, setActiveTag] = useState('');

  // Filtered links
  const filteredLinks = useMemo(() => {
    let result = links;
    if (activeTag) {
      result = result.filter(link => 
        link.tags.some((t) => t.toLowerCase() === activeTag)
      );
    }
    return result;
  }, [links, activeTag]);

  return (
    <>
      {/* 1. Pill Filter Bar at the very top */}
      <TagFilter activeTag={activeTag} onTagChange={setActiveTag} />

      {/* 2. Hero Component with "Linkter." and search bar illustration */}
      <HeroSearch />

      {/* 3. Main Grid layout holding the cards */}
      <MasonryGrid links={filteredLinks} />
    </>
  );
}
