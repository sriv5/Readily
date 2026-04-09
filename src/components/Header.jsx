import logo from '../assets/logo.png'

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
          <button className="header-link">Help</button>
          <div className="avatar">A</div>
        </div>
      </div>

      <nav className="tab-nav">
        <button
          className={`tab-button ${activeTab === 'employee' ? 'active' : ''}`}
          onClick={() => setActiveTab('employee')}
        >
          Employee
        </button>

        <button
          className={`tab-button ${activeTab === 'teamLead' ? 'active' : ''}`}
          onClick={() => setActiveTab('teamLead')}
        >
          Team Lead
        </button>

        <button
          className={`tab-button ${activeTab === 'hr' ? 'active' : ''}`}
          onClick={() => setActiveTab('hr')}
        >
          HR
        </button>
      </nav>

      <div className="header-bottom">
        <p className="greeting">Welcome back, {currentEmployee.name}!</p>
      </div>
    </header>
  )
}