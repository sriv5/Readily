import '../styles/RAGStatus.css'

export default function RAGStatus({ ragStatus }) {
  const redTeams = ragStatus.filter(team => team.status === 'Red')
  const amberTeams = ragStatus.filter(team => team.status === 'Amber')
  const greenTeams = ragStatus.filter(team => team.status === 'Green')

  const RAGCard = ({ status, teams }) => (
    <div className={`rag-section ${status.toLowerCase()}`}>
      <div className="rag-header">
        <h3>{status} Status</h3>
        <span className="team-count">{teams.length} team{teams.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="rag-teams">
        {teams.length === 0 ? (
          <p className="no-teams">No teams in this status</p>
        ) : (
          teams.map(team => (
            <div key={team.team_id} className="rag-team-card">
              <div className="team-info">
                <h4>{team.team_name}</h4>
                <p className="absence-count">{team.total_absences} active absences</p>
                <p className="escalated-count">Escalated: {team.escalated}</p>
              </div>
              <div className="rag-indicator">
                <div className={`indicator ${status.toLowerCase()}`}></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  return (
    <div className="rag-status">
      <div className="rag-overview">
        <h2>World RAG Status - Team Absences</h2>
        <p className="rag-description">
          Red: &gt;5 absences | Amber: 3-5 absences | Green: &lt;3 absences
        </p>
      </div>

      <div className="rag-grid">
        <RAGCard status="Red" teams={redTeams} />
        <RAGCard status="Amber" teams={amberTeams} />
        <RAGCard status="Green" teams={greenTeams} />
      </div>

      <div className="rag-summary">
        <h3>Summary</h3>
        <div className="summary-stats">
          <div className="summary-stat">
            <span className="label">Total Teams:</span>
            <span className="value">{ragStatus.length}</span>
          </div>
          <div className="summary-stat">
            <span className="label">Total Active Absences:</span>
            <span className="value">{ragStatus.reduce((sum, team) => sum + team.total_absences, 0)}</span>
          </div>
          <div className="summary-stat">
            <span className="label">Total Escalations:</span>
            <span className="value">{ragStatus.reduce((sum, team) => sum + team.escalated, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
