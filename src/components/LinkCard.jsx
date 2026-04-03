import { useRef, useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import gsap from 'gsap';

export default function LinkCard({ link, index }) {
  const cardRef = useRef(null);
  const [isSaved, setIsSaved] = useState(link.saved);
  const bookmarkRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: index * 0.05, ease: 'power3.out' }
    );
  }, [index]);

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
        <button 
          className={`card-bookmark-icon ${isSaved ? 'saved' : ''}`} 
          onClick={toggleSave}
          aria-label="Save bookmark"
        >
          <span ref={bookmarkRef} style={{ display: 'inline-block' }}>
            <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={1.5} />
          </span>
        </button>
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
