import { useRef, useEffect } from 'react';
import { Search, Send } from 'lucide-react';
import gsap from 'gsap';
import avatarImg from '../assets/avatar2.png';

export default function HeroSearch({ searchQuery, setSearchQuery }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="hero-section" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="hero-title">Linkter.</h1>

      <div style={{ position: 'relative', width: '100%', maxWidth: '580px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* New Minimalist Avatar completely replacing the old illustration */}
        <img
          src={avatarImg}
          alt="Avatar"
          style={{
            width: '380px', // Scaling up slightly for a bit more presence
            display: 'block',
            pointerEvents: 'none',
            // Pull the avatar down slightly more to match its larger scale
            marginBottom: '-60px',
            position: 'relative',
            zIndex: 1
          }}
        />

        {/* Real, Functional Native Search Bar */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '64px',
          border: '2.5px solid #1a1a1a',
          borderRadius: '12px',
          padding: '0 12px',
          // Gentle drop-shadow to lift it slightly off the page
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
        }}>
          <Search size={26} color="#1a1a1a" strokeWidth={2.5} style={{ marginLeft: '8px', marginRight: '16px' }} />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Relaxing and searching..."
            style={{
              flex: 1,
              height: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '1.25rem',
              fontFamily: 'var(--font-mono)',
              color: '#1a1a1a'
            }}
          />

          <button style={{
            backgroundColor: '#1a1a1a',
            width: '52px',
            height: '46px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2.5px solid #1a1a1a',
            marginLeft: '12px',
            transition: 'all 0.1s ease',
            cursor: 'pointer'
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333333'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
            <Send size={20} color="#ffffff" strokeWidth={2.5} style={{ marginRight: '2px', marginTop: '2px' }} />
          </button>
        </div>
      </div>

    </div>
  );
}
