export default function HRTab({ employees, teams, officeLocations }) {
  const escalatedEmployees = employees.filter(emp => emp.escalated_to_hr)

  return (
    <div>
      <h2>Escalated Cases</h2>
      {escalatedEmployees.map(emp => (
        <div key={emp.employee_id}>
          <p>{emp.employee_name} — {emp.team_name} — {emp.office_location}</p>
        </div>
      ))}

      <h2>Teams</h2>
      {teams.map(team => (
        <p key={team.id}>{team.name}</p>
      ))}

      <h2>Office Locations</h2>
      {Object.keys(officeLocations).map(location => (
        <p key={location}>{location}</p>
      ))}
    </div>
  )
}