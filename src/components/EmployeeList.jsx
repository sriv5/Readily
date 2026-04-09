import { useState } from 'react'
import '../styles/EmployeeList.css'
import Button from './Button'

export default function EmployeeList({ employees, team }) {
  const [escalated, setEscalated] = useState(
    employees.reduce((acc, emp) => {
      acc[emp.employee_id] = emp.escalated_to_hr === 'true'
      return acc
    }, {})
  )

  const handleEscalate = (employeeId) => {
    setEscalated(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }))
  }

  return (
    <div className="employee-list">
      <h2>Employees with Active Absences</h2>
      <table className="employees-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Absence Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr className="empty-row">
              <td colSpan="7">No active absences for this team</td>
            </tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.employee_id} className={escalated[emp.employee_id] ? 'escalated' : ''}>
                <td>{emp.employee_name}</td>
                <td>{emp.absence_type}</td>
                <td>{emp.start_date}</td>
                <td>{emp.end_date}</td>
                <td>
                  <span className={`location-badge ${emp.location_type.toLowerCase()}`}>
                    {emp.location_type}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${escalated[emp.employee_id] ? 'escalated' : 'pending'}`}>
                    {escalated[emp.employee_id] ? 'Escalated to HR' : 'Pending'}
                  </span>
                </td>
                <td>
                  <Button
                    size="small"
                    className={`escalate-btn ${escalated[emp.employee_id] ? 'escalated' : ''}`}
                    onClick={() => handleEscalate(emp.employee_id)}
                  >
                    {escalated[emp.employee_id] ? 'Unescalate' : 'Escalate to HR'}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
