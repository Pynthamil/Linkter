import { useRef, useEffect } from 'react';
import { X, Moon, Sun, Download, Trash2, ExternalLink, ChevronRight, HelpCircle, Shield, Info } from 'lucide-react';
import gsap from 'gsap';

export default function SettingsDrawer({ 
  isOpen, 
  onClose, 
  darkMode, 
  onToggleDarkMode,
  onExportData,
  onResetApp
}) {
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        drawerRef.current,
        { x: '-100%' },
        { x: 0, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(drawerRef.current, { x: '-100%', duration: 0.3, ease: 'power3.in' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" ref={backdropRef} onClick={onClose}>
      <aside className="settings-drawer" ref={drawerRef} onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2 className="drawer-title">Settings & Support</h2>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {/* Settings Section */}
          <div className="drawer-section">
            <h3 className="section-label">Settings</h3>
            
            <button className="drawer-item" onClick={onToggleDarkMode}>
              <div className="item-icon-bg">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </div>
              <span className="item-label">Appearance (Dark Mode)</span>
              <div className={`toggle-switch ${darkMode ? 'on' : 'off'}`}>
                <div className="toggle-knob" />
              </div>
            </button>

            <button className="drawer-item">
              <div className="item-icon-bg">
                <HelpCircle size={18} />
              </div>
              <span className="item-label">Refine your recommendations</span>
              <ChevronRight size={16} className="item-arrow" />
            </button>
          </div>

          <div className="drawer-divider" />

          {/* Support Section */}
          <div className="drawer-section">
            <h3 className="section-label">Support</h3>
            
            <button className="drawer-item" onClick={onExportData}>
              <div className="item-icon-bg">
                <Download size={18} />
              </div>
              <span className="item-label">Export Data (JSON)</span>
              <ExternalLink size={16} className="item-arrow" />
            </button>

            <button className="drawer-item danger" onClick={onResetApp}>
              <div className="item-icon-bg danger">
                <Trash2 size={18} />
              </div>
              <span className="item-label">Reset Application (Danger)</span>
            </button>
          </div>

          <div className="drawer-divider" />

          {/* Privacy & Terms */}
          <div className="drawer-section">
            <h3 className="section-label">Resources</h3>
            
            <button className="drawer-item">
              <div className="item-icon-bg">
                <Shield size={18} />
              </div>
              <span className="item-label">Privacy Rights</span>
              <ExternalLink size={16} className="item-arrow" />
            </button>

            <button className="drawer-item">
              <div className="item-icon-bg">
                <Info size={18} />
              </div>
              <span className="item-label">About Linkter</span>
              <ChevronRight size={16} className="item-arrow" />
            </button>
          </div>
        </div>

        <div className="drawer-footer">
          <div className="footer-links">
            <span>About</span>
            <span>Press</span>
            <span>Businesses</span>
          </div>
          <div className="footer-links">
            <span>Careers</span>
            <span>Developers</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
