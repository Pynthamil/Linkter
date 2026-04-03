import { SearchX } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="empty-state" id="empty-state">
      <div className="empty-state-icon">
        <SearchX size={32} />
      </div>
      <h2 className="empty-state-title">No links found</h2>
      <p className="empty-state-text">
        Try adjusting your search or filters. You can also add a new link to get started.
      </p>
    </div>
  );
}
