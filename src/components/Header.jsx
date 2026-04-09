import logo from '../assets/logo.png'
import Button from './Button'

export default function Header({ activeTab, setActiveTab, currentEmployee }) {

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-left">
          <img src={logo} alt="Readily logo" className="logo-img" />
        </div>

        <div className="header-center">
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
        </div>

        <div className="header-right">
          <Button variant="link">Help</Button>
          <div className="avatar">{currentEmployee.name.split(' ').map(n => n.charAt(0)).join('')}</div>
        </div>
      </div>

      <div className="header-bottom">
        <p className="greeting">Welcome back, {currentEmployee.name}!</p>
      </div>
    </header>
  )
}