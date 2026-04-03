import { useRef, useEffect, useState } from 'react';
import { X, FolderPlus } from 'lucide-react';
import gsap from 'gsap';

const EMOJI_OPTIONS = ['🎨', '🛠️', '📚', '🏠', '💻', '🎮', '💡', '🎵', '🍕', '🚀', '🌈', '🔥'];

export default function CreateBoardModal({ isOpen, onClose, onAdd }) {
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)', delay: 0.05 }
      );
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      opacity: 0, scale: 0.92, y: 20, duration: 0.25, ease: 'power2.in',
    });
    gsap.to(backdropRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: onClose,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAdd({
      id: `b-${Date.now()}`,
      name: name.trim(),
      icon: selectedEmoji,
      linkIds: []
    });
    
    setName('');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && handleClose()}
    >
      <div className="modal-content" ref={contentRef} style={{ maxWidth: '400px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <FolderPlus size={20} />
              New Board
            </span>
          </h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Board Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Design Systems"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Icon</label>
              <div className="emoji-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`emoji-btn ${selectedEmoji === emoji ? 'active' : ''}`}
                    onClick={() => setSelectedEmoji(emoji)}
                    style={{
                      fontSize: '1.5rem',
                      padding: '8px',
                      borderRadius: '8px',
                      border: selectedEmoji === emoji ? '2px solid #1a1a1a' : '2px solid transparent',
                      backgroundColor: selectedEmoji === emoji ? '#f0f0f0' : 'transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={!name.trim()}>
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
