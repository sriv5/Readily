import AnnouncementsPanel from "../components/AnnouncementsPanel"
import AbsenceForm from "../components/AbsenceForm"
import Card from "../components/Card"

export default function EmployeeTab({ employees, announcements }) {
  const currentEmployee = employees[0]

  return (
    <div className="tab-page">
      <div className="grid grid-auto">
        <Card title="My Details" variant="pink">
          <p><strong>Name:</strong> {currentEmployee.name}</p>
          <p><strong>Team:</strong> {currentEmployee.team_name}</p>
          <p><strong>Location:</strong> {currentEmployee.office_location}</p>
          <p><strong>Status:</strong> {currentEmployee.location_type}</p>
        </Card>

        <Card title="Announcements" variant="blue">
          <AnnouncementsPanel announcements={announcements} />
        </Card>

        <Card title="Submit Absence Form" variant="purple">
          <AbsenceForm  />
        </Card>
      </div>
    </div>
  )
}