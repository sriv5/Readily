export default function EmployeeTab({ employees, announcements }) {
  const currentEmployee = employees[0]

  return (
    <div>
      <h1>Employee Tab</h1>

      <h2>Current Status</h2>
      <p>{currentEmployee.employee_name}</p>
      <p>{currentEmployee.absence_type}</p>
      <p>{currentEmployee.start_date} to {currentEmployee.end_date}</p>

      <h2>Announcements</h2>
      {announcements.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  )
}