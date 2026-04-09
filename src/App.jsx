import { useState } from 'react'
import './index.css'

import { mockEmployees, announcements, teams, officeLocations } from './data/mockData'
import EmployeeTab from './tabs/EmployeeTab'
import TeamLeadTab from './tabs/TeamLeadTab'
import HRTab from './tabs/HRTab'

import Header from './components/Header'

function App() {
  const [activeTab, setActiveTab] = useState('employee')
  const [employees, setEmployees] = useState(mockEmployees)
  const currentEmployee = employees[0]

  const renderTab = () => {
    switch (activeTab) {
      case 'employee':
        return <EmployeeTab employees={employees} employee={currentEmployee} announcements={announcements} />
      case 'teamLead':
        return <TeamLeadTab employees={employees} setEmployees={setEmployees} />
      case 'hr':
        return <HRTab employees={employees} teams={teams} officeLocations={officeLocations} />
      default:
        return <EmployeeTab employees={employees} employee={currentEmployee} announcements={announcements} />
    }
  }

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} currentEmployee={currentEmployee} />

        {renderTab()}
    </div>
  )
}

export default App