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

  const renderTab = () => {
    switch (activeTab) {
      case 'employee':
        return <EmployeeTab employees={employees} announcements={announcements} />
      case 'teamLead':
        return <TeamLeadTab employees={employees} setEmployees={setEmployees} />
      case 'hr':
        return <HRTab employees={employees} teams={teams} officeLocations={officeLocations} />
      default:
        return <EmployeeTab employees={employees} announcements={announcements} />
    }
  }

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {renderTab()}
    </div>
  )
}

export default App