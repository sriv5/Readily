import logo from '../assets/logo.png'
import Button from './Button'

export default function Header({ activeTab, setActiveTab, currentEmployee }) {
  const titles = {
    employee: 'Employee Mode',
    teamLead: 'Team Lead Mode',
    hr: 'HR Mode',
  }

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-left">
          <img src={logo} alt="Readily logo" className="logo-img" />
        </div>

        <div className="header-center">
          <h2 className="mode-title">{titles[activeTab]}</h2>
        </div>

        <div className="header-right">
          <Button variant="link">Help</Button>
          <div className="avatar">{currentEmployee.name.charAt(0)}</div>
        </div>
      </div>

      <nav className="tab-nav">
        <Button
          variant="tab"
          className={activeTab === 'employee' ? 'active' : ''}
          onClick={() => setActiveTab('employee')}
        >
          Employee
        </Button>

        <Button
          variant="tab"
          className={activeTab === 'teamLead' ? 'active' : ''}
          onClick={() => setActiveTab('teamLead')}
        >
          Team Lead
        </Button>

        <Button
          variant="tab"
          className={activeTab === 'hr' ? 'active' : ''}
          onClick={() => setActiveTab('hr')}
        >
          HR
        </Button>
      </nav>

      <div className="header-bottom">
        <p className="greeting">Welcome back, {currentEmployee.name}!</p>
      </div>
    </header>
  )
}