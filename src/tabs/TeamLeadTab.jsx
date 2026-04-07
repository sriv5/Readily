import { useState } from 'react'
import { getEmployeesByTeam, getLocationBreakdown, getTeamRAGStatus } from '../data/mockData'
import EmployeeList from '../components/EmployeeList'
import TeamStats from '../components/TeamStats'
import RAGStatus from '../components/RAGStatus'
import WorldMap from '../components/WorldMap'
import Card from '../components/Card'

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
    <div className="tab-page">

      <div className="tab-filter">
        <label htmlFor="team-select" className="tab-filter-label">
          Select Team:
        </label>
        <select
          id="team-select"
          className="select"
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

      {/* Content */}
      <div className="grid grid-auto">

        <Card title="Team Stats">
          <TeamStats
            teamId={selectedTeam}
            locationBreakdown={locationBreakdown}
            ragStatus={ragStatus}
            currentTeamRAG={currentTeamRAG}
          />
        </Card>

        <Card title="RAG Status" variant="soft">
          <RAGStatus ragStatus={ragStatus} />
        </Card>

        <Card title="Global Overview">
          <WorldMap />
        </Card>

        <Card title="Employees with Active Absences" className="grid-full">
          <EmployeeList employees={employees} team={selectedTeam} />
        </Card>

      </div>
    </div>
  )
}