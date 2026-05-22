export default function EmptyState() {
  return (
    <div className="empty-state" role="status" aria-label="No habits yet">
      <div className="empty-icon" aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="60" height="8" rx="4" fill="currentColor" opacity="0.15"/>
          <rect x="10" y="36" width="60" height="8" rx="4" fill="currentColor" opacity="0.1"/>
          <rect x="10" y="52" width="60" height="8" rx="4" fill="currentColor" opacity="0.06"/>
          <circle cx="40" cy="40" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" opacity="0.3"/>
          <path d="M34 40L38.5 44.5L46 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
        </svg>
      </div>
      <h2 className="empty-title">No habits yet</h2>
      <p className="empty-subtitle">
        Start by adding a habit above.<br />
        Track anything — reading, exercise, water, sleep.
      </p>
    </div>
  )
}
