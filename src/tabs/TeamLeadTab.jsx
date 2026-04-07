import { useState } from 'react'
import { getEmployeesByTeam, getLocationBreakdown, getTeamRAGStatus } from '../data/mockData'
import EmployeeList from '../components/EmployeeList'
import TeamStats from '../components/TeamStats'
import RAGStatus from '../components/RAGStatus'
import WorldMap from '../components/WorldMap'
import '../styles/TeamLeadTab.css'

export default function TeamLeadTab() {
  const [selectedTeam, setSelectedTeam] = useState('TEAM01')

  const employees = getEmployeesByTeam(selectedTeam)
  const locationBreakdown = getLocationBreakdown(selectedTeam)
  const ragStatus = getTeamRAGStatus()
  const currentTeamRAG = ragStatus.find(team => team.team_id === selectedTeam)

  const teams = ragStatus.map(team => ({
    id: team.team_id,
    name: team.team_name,
  }))

  return (
    <div className="team-lead-tab">
      <div className="teamlead-controls">
        <div>
          <h1 className="teamlead-title">Team Dashboard</h1>
          <p className="teamlead-subtitle">
            Monitor team absences, escalation status, and location coverage.
          </p>
        </div>

        <div className="team-selector">
          <label htmlFor="team-select">Select Team:</label>
          <select
            id="team-select"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section team-stats-section">
          <TeamStats
            teamId={selectedTeam}
            locationBreakdown={locationBreakdown}
            ragStatus={ragStatus}
            currentTeamRAG={currentTeamRAG}
          />
        </div>

        <div className="dashboard-section rag-status-section">
          <RAGStatus ragStatus={ragStatus} />
        </div>

        <div className="dashboard-section world-map-section">
          <WorldMap />
        </div>

        <div className="dashboard-section employee-list-section">
          <EmployeeList employees={employees} team={selectedTeam} />
        </div>
      </div>
    </div>
  )
}