export default function SkeletonCard({ index }) {
  // Vary heights for visual interest
  const heights = [180, 140, 200, 160, 190, 150, 170, 210];
  const h = heights[index % heights.length];

  return (
    <div className="skeleton-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="skeleton-image" style={{ height: h }} />
      <div className="skeleton-body">
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </div>
    </div>
  );
}
