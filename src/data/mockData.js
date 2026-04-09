// ==============================
// EMPLOYEE ABSENCE DATA
// ==============================

export const mockEmployees = [
  {
    employee_id: 'EMP001',
    name: 'John Smith',
    absence_type: 'Sick Leave',
    start_date: '2026-03-20',
    end_date: '2026-03-25',
    location_type: 'Remote',
    team_id: 'TEAM01',
    team_name: 'Sales',
    escalated_to_hr: false,
    office_location: 'London',
  },
  {
    employee_id: 'EMP002',
    name: 'Sarah Johnson',
    absence_type: 'COVID-19',
    start_date: '2026-03-15',
    end_date: '2026-03-29',
    location_type: 'Onsite',
    team_id: 'TEAM01',
    team_name: 'Sales',
    escalated_to_hr: true,
    office_location: 'London',
  },
  {
    employee_id: 'EMP003',
    name: 'Michael Chen',
    absence_type: 'Personal Leave',
    start_date: '2026-03-22',
    end_date: '2026-03-24',
    location_type: 'Remote',
    team_id: 'TEAM01',
    team_name: 'Sales',
    escalated_to_hr: false,
    office_location: 'New York',
  },
  {
    employee_id: 'EMP004',
    name: 'Emma Wilson',
    absence_type: 'Injury',
    start_date: '2026-03-18',
    end_date: '2026-04-01',
    location_type: 'Onsite',
    team_id: 'TEAM02',
    team_name: 'Marketing',
    escalated_to_hr: true,
    office_location: 'Johannesburg',
  },
  {
    employee_id: 'EMP005',
    name: 'David Brown',
    absence_type: 'Maternity Leave',
    start_date: '2026-02-01',
    end_date: '2026-05-31',
    location_type: 'Remote',
    team_id: 'TEAM02',
    team_name: 'Marketing',
    escalated_to_hr: false,
    office_location: 'London',
  },
  {
    employee_id: 'EMP006',
    name: 'Lisa Anderson',
    absence_type: 'Sick Leave',
    start_date: '2026-03-23',
    end_date: '2026-03-26',
    location_type: 'Onsite',
    team_id: 'TEAM01',
    team_name: 'Sales',
    escalated_to_hr: false,
    office_location: 'Mumbai',
  },
  {
    employee_id: 'EMP007',
    name: 'Robert Taylor',
    absence_type: 'COVID-19',
    start_date: '2026-03-21',
    end_date: '2026-03-28',
    location_type: 'Remote',
    team_id: 'TEAM03',
    team_name: 'Operations',
    escalated_to_hr: false,
    office_location: 'New York',
  },
  {
    employee_id: 'EMP008',
    name: 'Jennifer Lee',
    absence_type: 'Bereavement',
    start_date: '2026-03-24',
    end_date: '2026-03-27',
    location_type: 'Onsite',
    team_id: 'TEAM02',
    team_name: 'Marketing',
    escalated_to_hr: true,
    office_location: 'Johannesburg',
  },
  {
    employee_id: 'EMP009',
    name: 'James Martinez',
    absence_type: 'Sick Leave',
    start_date: '2026-03-17',
    end_date: '2026-03-27',
    location_type: 'Remote',
    team_id: 'TEAM03',
    team_name: 'Operations',
    escalated_to_hr: false,
    office_location: 'Mumbai',
  },
  {
    employee_id: 'EMP010',
    name: 'Maria Garcia',
    absence_type: 'Personal Leave',
    start_date: '2026-03-25',
    end_date: '2026-03-26',
    location_type: 'Onsite',
    team_id: 'TEAM01',
    team_name: 'Sales',
    escalated_to_hr: false,
    office_location: 'London',
  },
]

export const officeLocations = {
  London: { lat: 51.5074, lng: -0.1278, country: 'UK' },
  'New York': { lat: 40.7128, lng: -74.0060, country: 'USA' },
  Johannesburg: { lat: -26.2044, lng: 28.0456, country: 'South Africa' },
  Mumbai: { lat: 19.0760, lng: 72.8777, country: 'India' },
}

export const teams = [
  { id: 'TEAM01', name: 'Sales' },
  { id: 'TEAM02', name: 'Marketing' },
  { id: 'TEAM03', name: 'Operations' },
]

export const announcements = [
  {
    id: 1,
    title: 'COVID-19 Reporting Update',
    message: 'All employees must report COVID-related symptoms immediately via the app.',
    priority: 'high',
    date: '2026-03-24',
  },
  {
    id: 2,
    title: 'Remote Work Guidance',
    message: 'Employees working remotely must remain available during core working hours.',
    priority: 'medium',
    date: '2026-03-20',
  },
  {
    id: 3,
    title: 'Wellbeing Support',
    message: 'Confidential wellbeing support is available for all employees during this period.',
    priority: 'low',
    date: '2026-03-18',
  },
]

export const teamAbsencePercentageData = [
  { name: 'Absent', value: 23 },
  { name: 'Available', value: 77 },
]

export const absenceLevelComparisonData = [
  { name: 'Our Team', value: 23 },
  { name: 'Team B', value: 15 },
  { name: 'Team C', value: 30 },
]

export const liveStaffStatusData = [
  { name: 'Available', value: 80 },
  { name: 'Absent', value: 12 },
  { name: 'On Leave', value: 8 },
]

export const organisationAbsenceSnapshotData = [
  { name: 'Compliance', value: 47 },
  { name: 'Operations', value: 51 },
  { name: 'Wealth Mgmt', value: 40 },
  { name: 'Technology', value: 60 },
  { name: 'Risk', value: 32 },
  { name: 'HR', value: 25 },
]

// ==============================
// HELPER FUNCTIONS
// adapted to current data shape
// ==============================

// Get all employees with absences
export const getEmployeeAbsences = () => {
  return mockEmployees
}

// Get employees filtered by team
export const getEmployeesByTeam = (teamId) => {
  return mockEmployees.filter(emp => emp.team_id === teamId)
}

// Get escalated employees
export const getEscalatedEmployees = () => {
  return mockEmployees.filter(emp => emp.escalated_to_hr)
}

// Get remote vs onsite breakdown
export const getLocationBreakdown = (teamId = null) => {
  const employees = teamId ? getEmployeesByTeam(teamId) : getEmployeeAbsences()

  const breakdown = {
    remote: employees.filter(emp => emp.location_type === 'Remote').length,
    onsite: employees.filter(emp => emp.location_type === 'Onsite').length,
  }

  breakdown.total = breakdown.remote + breakdown.onsite
  return breakdown
}

// Get team availability summary
export const getTeamAvailability = () => {
  const employees = getEmployeeAbsences()
  const teamSummary = {}

  employees.forEach(emp => {
    if (!teamSummary[emp.team_id]) {
      teamSummary[emp.team_id] = {
        team_id: emp.team_id,
        team_name: emp.team_name,
        total_absences: 0,
        escalated: 0,
      }
    }

    teamSummary[emp.team_id].total_absences += 1

    if (emp.escalated_to_hr) {
      teamSummary[emp.team_id].escalated += 1
    }
  })

  return Object.values(teamSummary)
}

// Get RAG status
// Red: > 5 absences, Amber: 3-5 absences, Green: < 3 absences
export const getTeamRAGStatus = () => {
  const availability = getTeamAvailability()

  return availability.map(team => ({
    ...team,
    status:
      team.total_absences > 5
        ? 'Red'
        : team.total_absences >= 3
        ? 'Amber'
        : 'Green',
  }))
}

// Get absences by office location
export const getAbsencesByLocation = () => {
  const employees = getEmployeeAbsences()
  const locations = {}

  Object.keys(officeLocations).forEach(location => {
    locations[location] = {
      name: location,
      coordinates: officeLocations[location],
      absences: [],
      total: 0,
      escalated: 0,
    }
  })

  employees.forEach(emp => {
    if (locations[emp.office_location]) {
      locations[emp.office_location].absences.push(emp)
      locations[emp.office_location].total += 1

      if (emp.escalated_to_hr) {
        locations[emp.office_location].escalated += 1
      }
    }
  })

  return Object.values(locations).filter(location => location.total > 0)
}