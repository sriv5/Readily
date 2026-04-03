import { useState } from 'react'
import { getAbsencesByLocation } from '../data/mockData'
import '../styles/WorldMap.css'

export default function WorldMap() {
  const [hoveredLocation, setHoveredLocation] = useState(null)
  const locations = getAbsencesByLocation()

  // Mercator projection - converts lat/lng to x/y on a flat map
  const projectCoordinates = (lat, lng) => {
    const width = 800
    const height = 400
    
    // Simple Web Mercator projection
    const x = ((lng + 180) / 360) * width
    const y = ((90 - lat) / 180) * height
    
    return { x, y }
  }

  // Get RAG status based on absences
  const getRAGStatus = (total) => {
    if (total > 5) return 'red'
    if (total >= 3) return 'amber'
    return 'green'
  }

  return (
    <div className="world-map-container">
      <h2>Global Absence Distribution</h2>
      
      <div className="map-wrapper">
        <svg className="world-map-svg" viewBox="0 0 800 400">
          {/* Light gray background for water */}
          <rect width="800" height="400" fill="#e8f4f8" />
          
          {/* Simplified world map grid */}
          <g className="map-grid" opacity="0.1">
            <line x1="0" y1="200" x2="800" y2="200" stroke="#999" strokeWidth="1" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="#999" strokeWidth="1" />
            <line x1="400" y1="0" x2="400" y2="400" stroke="#999" strokeWidth="1" />
            <line x1="600" y1="0" x2="600" y2="400" stroke="#999" strokeWidth="1" />
          </g>

          {/* Plot dots for each office location */}
          {locations.map(location => {
            const { x, y } = projectCoordinates(
              location.coordinates.lat,
              location.coordinates.lng
            )
            const ragStatus = getRAGStatus(location.total)
            const isHovered = hoveredLocation?.name === location.name

            return (
              <g key={location.name}>
                {/* Outer glow when hovered */}
                {isHovered && (
                  <circle
                    cx={x}
                    cy={y}
                    r="25"
                    fill="none"
                    stroke={`var(--rag-${ragStatus})`}
                    strokeWidth="2"
                    opacity="0.3"
                  />
                )}

                {/* Main dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 14 : 10}
                  fill={`var(--rag-${ragStatus})`}
                  stroke="white"
                  strokeWidth="2"
                  className="location-dot"
                  onMouseEnter={() => setHoveredLocation(location)}
                  onMouseLeave={() => setHoveredLocation(null)}
                />

                {/* Absence count badge */}
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="location-count"
                  fill="white"
                  fontSize={isHovered ? "14" : "12"}
                  fontWeight="700"
                >
                  {location.total}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Hover details panel */}
      {hoveredLocation && (
        <div className="location-details">
          <div className="details-header">
            <h3>{hoveredLocation.name}</h3>
            <span className={`details-rag ${getRAGStatus(hoveredLocation.total)}`}>
              {hoveredLocation.total} Absence{hoveredLocation.total !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="details-stats">
            <div className="detail-stat">
              <span className="stat-label">Escalated to HR:</span>
              <span className="stat-value">{hoveredLocation.escalated}</span>
            </div>
            <div className="detail-stat">
              <span className="stat-label">Country:</span>
              <span className="stat-value">{hoveredLocation.coordinates.country}</span>
            </div>
          </div>

          <div className="location-employees">
            <h4>Employees on Absence:</h4>
            <ul>
              {hoveredLocation.absences.slice(0, 5).map(emp => (
                <li key={emp.employee_id}>
                  <strong>{emp.employee_name}</strong>
                  <span className="absence-type">{emp.absence_type}</span>
                  {emp.escalated_to_hr === 'true' && (
                    <span className="escalated-badge">HR</span>
                  )}
                </li>
              ))}
            </ul>
            {hoveredLocation.absences.length > 5 && (
              <p className="more-employees">
                +{hoveredLocation.absences.length - 5} more
              </p>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-dot red"></span>
          <span>Critical (&gt;5 absences)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot amber"></span>
          <span>Warning (3-5 absences)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot green"></span>
          <span>Normal (&lt;3 absences)</span>
        </div>
      </div>
    </div>
  )
}
