import { useEffect, useState } from 'react';
import LinkCard from './LinkCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';

export default function MasonryGrid({ links, boards, onAddToBoard }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [links]);

  if (loading) {
    return (
      <div className="main-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="minimal-card" style={{ height: '300px' }}>
            <SkeletonCard index={i} />
          </div>
        ))}
      </div>
    );
  }

  if (!links.length) {
    return <EmptyState />;
  }

  return (
    <div className="main-grid" id="main-grid">
      {links.map((link, index) => (
        <LinkCard 
          key={link.id} 
          link={link} 
          index={index} 
          boards={boards} 
          onAddToBoard={onAddToBoard}
        />
      ))}
    </div>
  );
}
