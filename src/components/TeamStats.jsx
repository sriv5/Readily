import '../styles/TeamStats.css'

export default function TeamStats({ teamId, locationBreakdown, ragStatus, currentTeamRAG }) {
  const getTeamAbsenceRank = () => {
    const sorted = [...ragStatus].sort((a, b) => b.total_absences - a.total_absences)
    const rank = sorted.findIndex(team => team.team_id === teamId) + 1
    return { rank, total: sorted.length }
  }

  const { rank, total } = getTeamAbsenceRank()
  const percentageRemote = ((locationBreakdown.remote / locationBreakdown.total) * 100).toFixed(1)
  const percentageOnsite = ((locationBreakdown.onsite / locationBreakdown.total) * 100).toFixed(1)

  return (
    <div className="team-stats">
      <div className="stats-section">
        <h2>Current Team Performance</h2>
        
        <div className="stat-cards">
          <div className="stat-card">
            <h3>Total Active Absences</h3>
            <p className={`stat-value ${currentTeamRAG?.status.toLowerCase()}`}>
              {currentTeamRAG?.total_absences || 0}
            </p>
            <p className="stat-label">Status: {currentTeamRAG?.status}</p>
          </div>

          <div className="stat-card">
            <h3>Escalated to HR</h3>
            <p className="stat-value">{currentTeamRAG?.escalated || 0}</p>
            <p className="stat-label">Pending HR review</p>
          </div>

          <div className="stat-card">
            <h3>Team Ranking</h3>
            <p className="stat-value">{rank}/{total}</p>
            <p className="stat-label">Highest absence rate</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2>Remote vs Onsite Breakdown</h2>
        <div className="breakdown-container">
          <div className="breakdown-chart">
            <div className="bar-container">
              <div className="bar remote-bar" style={{ width: `${percentageRemote}%` }}>
                <span>{percentageRemote}%</span>
              </div>
              <div className="bar onsite-bar" style={{ width: `${percentageOnsite}%` }}>
                <span>{percentageOnsite}%</span>
              </div>
            </div>
            <div className="breakdown-legend">
              <div className="legend-item">
                <span className="legend-color remote"></span>
                <span>Remote: {locationBreakdown.remote} employees</span>
              </div>
              <div className="legend-item">
                <span className="legend-color onsite"></span>
                <span>Onsite: {locationBreakdown.onsite} employees</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2>Team Comparison to Others</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Total Absences</th>
              <th>Escalated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ragStatus.map(team => (
              <tr key={team.team_id} className={team.team_id === teamId ? 'current-team' : ''}>
                <td className="team-name">{team.team_name}</td>
                <td>{team.total_absences}</td>
                <td>{team.escalated}</td>
                <td>
                  <span className={`rag-badge ${team.status.toLowerCase()}`}>
                    {team.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
