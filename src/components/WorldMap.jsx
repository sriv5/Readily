import { useState } from 'react'
import { getAbsencesByLocation } from '../data/mockData'
import '../styles/WorldMap.css'

export default function WorldMap() {
  const [hoveredLocation, setHoveredLocation] = useState(null)
  const locations = getAbsencesByLocation()

  // Maps geo coordinates to SVG pixel coords using Web Mercator (more accurate than simple linear)
  const projectCoordinates = (lat, lng) => {
    const width = 800
    const height = 400

    // longitude to x [0..width]
    const x = ((lng + 180) / 360) * width

    // latitude to y using Web Mercator
    const latRad = (lat * Math.PI) / 180
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
    const y = (height / 2) - (width * mercN) / (2 * Math.PI)

    return { x, y }
  }

  // Get RAG status based on absences
  const getRAGStatus = (total) => {
    if (total > 5) return 'red'
    if (total >= 3) return 'amber'
    return 'green'
  }

  const continents = [
    {
      name: 'North America',
      coords: [
        [72, -170], [60, -170], [52, -125], [45, -100], [42, -90], [45, -70], [55, -45], [70, -50], [72, -140]
      ]
    },
    {
      name: 'South America',
      coords: [
        [15, -80], [0, -80], [-15, -75], [-30, -65], [-45, -60], [-50, -45], [-25, -40], [5, -45]
      ]
    },
    {
      name: 'Europe',
      coords: [
        [70, -10], [65, 0], [60, 10], [55, 20], [50, 30], [50, 40], [55, 30], [62, 20]
      ]
    },
    {
      name: 'Africa',
      coords: [
        [35, -20], [35, 20], [20, 35], [0, 40], [-20, 40], [-35, 20], [-35, 0], [-20, -15]
      ]
    },
    {
      name: 'Asia',
      coords: [
        [70, 40], [65, 80], [55, 100], [45, 110], [35, 120], [20, 130], [10, 110], [25, 90], [35, 70]
      ]
    },
    {
      name: 'Australia',
      coords: [
        [-10, 110], [-10, 155], [-40, 155], [-45, 130], [-30, 110]
      ]
    }
  ]

  const pathFromCoords = (coords) => {
    const points = coords.map(([lat, lng]) => {
      const p = projectCoordinates(lat, lng)
      return `${p.x} ${p.y}`
    }).join(' L ')

    return `M ${points} Z`
  }

  const mapImage = '/world-map.svg' // place map image in public/world-map.svg

  return (
    <div className="world-map-container">
      <h2>Global Absence Distribution</h2>
      
      <div className="map-wrapper">
        <img src={mapImage} alt="World map" className="map-bg" />
        <svg className="world-map-svg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
          {/* Optional grid overlay for lat/lon reference */}
          <g className="map-grid" opacity="0.08">
            <line x1="0" y1="200" x2="800" y2="200" stroke="#999" strokeWidth="1" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="#999" strokeWidth="1" />
            <line x1="400" y1="0" x2="400" y2="400" stroke="#999" strokeWidth="1" />
            <line x1="600" y1="0" x2="600" y2="400" stroke="#999" strokeWidth="1" />
          </g>

          {/* Plot dots for each office location */}
          {locations.map(location => {
            const [xOffset = 0, yOffset = 0] = location.offset || []
            const { x, y } = projectCoordinates(
              location.coordinates.lat,
              location.coordinates.lng
            )
            const ragStatus = getRAGStatus(location.total)
            const isHovered = hoveredLocation?.name === location.name
            const xPos = x + xOffset
            const yPos = y + yOffset

            return (
              <g key={location.name}>
                {/* Outer glow when hovered */}
                {isHovered && (
                  <circle
                    cx={xPos}
                    cy={yPos}
                    r="25"
                    fill="none"
                    stroke={`var(--rag-${ragStatus})`}
                    strokeWidth="2"
                    opacity="0.3"
                  />
                )}

                {/* Main dot */}
                <circle
                  cx={xPos}
                  cy={yPos}
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
                  x={xPos}
                  y={yPos}
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
