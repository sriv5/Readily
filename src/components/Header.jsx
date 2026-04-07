export default function Header({ activeTab, setActiveTab }) {
  const titles = {
    employee: 'Employee Mode',
    teamLead: 'Team Lead Mode',
    hr: 'HR Mode',
  }

  return (
    <header className="app-header">

      {/* TOP ROW */}
      <div className="header-top">

        <div className="header-left">
          <img src="/src/assets/logo.png" alt="Readily logo" className="logo-img" />
        </div>

        <div className="header-center">
          <h2 className="mode-title">{titles[activeTab]}</h2>
        </div>

        <div className="header-right">
          <button className="header-link">Help</button>
          <div className="avatar">A</div>
        </div>

      </div>

      {/* NAVIGATION */}
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

    </header>
  )
}