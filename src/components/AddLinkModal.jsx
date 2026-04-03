import { useRef, useEffect, useState } from 'react';
import { X, Link2 } from 'lucide-react';
import gsap from 'gsap';

export default function AddLinkModal({ isOpen, onClose, onAdd }) {
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const [form, setForm] = useState({
    url: '',
    title: '',
    description: '',
    tags: '',
    image: '',
  });

  // Animate in/out
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
      opacity: 0,
      scale: 0.92,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLink = {
      id: Date.now(),
      title: form.title || 'Untitled Link',
      url: form.url,
      description: form.description,
      tags: form.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      image: form.image || '',
      favicon: form.url
        ? `https://www.google.com/s2/favicons?domain=${new URL(form.url).hostname}&sz=32`
        : '',
      domain: form.url ? new URL(form.url).hostname : '',
      saved: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    onAdd(newLink);
    setForm({ url: '', title: '', description: '', tags: '', image: '' });
    handleClose();
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && handleClose()}
      id="add-link-modal"
    >
      <div className="modal-content" ref={contentRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Link2 size={20} style={{ color: 'var(--accent-blue)' }} />
              Add New Link
            </span>
          </h2>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal" id="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="link-url">URL</label>
              <input
                id="link-url"
                className="form-input"
                type="url"
                placeholder="https://example.com"
                value={form.url}
                onChange={handleChange('url')}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="link-title">Title</label>
              <input
                id="link-title"
                className="form-input"
                type="text"
                placeholder="My awesome link"
                value={form.title}
                onChange={handleChange('title')}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="link-description">Description</label>
              <textarea
                id="link-description"
                className="form-input"
                placeholder="What's this link about?"
                value={form.description}
                onChange={handleChange('description')}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="link-tags">Tags</label>
              <input
                id="link-tags"
                className="form-input"
                type="text"
                placeholder="frontend, design, animation"
                value={form.tags}
                onChange={handleChange('tags')}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="link-image">Preview Image URL</label>
              <input
                id="link-image"
                className="form-input"
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={form.image}
                onChange={handleChange('image')}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" id="modal-save-btn">
              Save Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
