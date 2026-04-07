export default function AnnouncementsPanel({ announcements = [] }) {
  return (
    <div className="announcements-panel">
      {announcements.length === 0 ? (
        <p className="announcements-empty">No announcements right now.</p>
      ) : (
        announcements.map((announcement, index) => (
          <div key={announcement.id ?? index} className="announcement-item">
            <div className={`announcement-icon announcement-icon--${announcement.priority || 'low'}`}>
              <span>!</span>
            </div>

            <div className="announcement-text">
              <h4 className="announcement-title">{announcement.title}</h4>
              <p className="announcement-content">{announcement.message}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}