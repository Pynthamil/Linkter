import { Search, Plus, Link2, User } from 'lucide-react';

export default function Navbar({ searchQuery, onSearchChange, onAddClick }) {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="navbar-logo-icon">
            <Link2 size={18} color="white" strokeWidth={2.5} />
          </div>
          <span className="navbar-logo-text">Linkter</span>
        </div>

        {/* Search */}
        <div className="navbar-center">
          <div className="search-wrapper">
            <input
              id="search-input"
              className="search-input"
              type="text"
              placeholder="Search links, tags, domains..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search size={16} className="search-icon" />
          </div>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <button
            className="mobile-search-toggle"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            id="add-link-btn"
            className="btn-add-link"
            onClick={onAddClick}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Link</span>
          </button>
          <button className="avatar-btn" aria-label="Profile">
            <User size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
