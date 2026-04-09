// Mock CSV data for Team Lead absence tracking
export const mockCSVData = `employee_id,employee_name,absence_type,start_date,end_date,location_type,team_id,team_name,escalated_to_hr,office_location
EMP001,John Smith,Sick Leave,2026-03-20,2026-03-25,Remote,TEAM01,Sales,false,London
EMP002,Sarah Johnson,COVID-19,2026-03-15,2026-03-29,Onsite,TEAM01,Sales,true,London
EMP003,Michael Chen,Personal Leave,2026-03-22,2026-03-24,Remote,TEAM01,Sales,false,New York
EMP004,Emma Wilson,Injury,2026-03-18,2026-04-01,Onsite,TEAM02,Marketing,true,Johannesburg
EMP005,David Brown,Maternity,2026-02-01,2026-05-31,Remote,TEAM02,Marketing,false,London
EMP006,Lisa Anderson,Sick Leave,2026-03-23,2026-03-26,Onsite,TEAM01,Sales,false,Mumbai
EMP007,Robert Taylor,COVID-19,2026-03-21,2026-03-28,Remote,TEAM03,Operations,false,New York
EMP008,Jennifer Lee,Bereavement,2026-03-24,2026-03-27,Onsite,TEAM02,Marketing,true,Johannesburg
EMP009,James Martinez,Sick Leave,2026-03-17,2026-03-27,Remote,TEAM03,Operations,false,Mumbai
EMP010,Maria Garcia,Personal Leave,2026-03-25,2026-03-26,Onsite,TEAM01,Sales,false,London`;

// Office locations with coordinates
export const officeLocations = {
  'London': { lat: 51.5074, lng: -0.1278, country: 'UK', offset: [-30, -4] },
  'New York': { lat: 40.7128, lng: -74.0060, country: 'USA', offset: [-30, 5] },
  'Johannesburg': { lat: -26.2044, lng: 28.0456, country: 'South Africa', offset: [2, 7] },
  'Mumbai': { lat: 19.0760, lng: 72.8777, country: 'India', offset: [3, -3] }
};

// Parse CSV string to array of objects
export const parseCSV = (csvString) => {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
};

// Get all employees with absences
export const getEmployeeAbsences = () => {
  return parseCSV(mockCSVData);
};

// Get employees filtered by team
export const getEmployeesByTeam = (teamId) => {
  const employees = getEmployeeAbsences();
  return employees.filter(emp => emp.team_id === teamId);
};

// Get escalated employees (flagged for HR)
export const getEscalatedEmployees = () => {
  const employees = getEmployeeAbsences();
  return employees.filter(emp => emp.escalated_to_hr === 'true');
};

// Get remote vs onsite breakdown
export const getLocationBreakdown = (teamId = null) => {
  const employees = teamId ? getEmployeesByTeam(teamId) : getEmployeeAbsences();
  const breakdown = {
    remote: employees.filter(emp => emp.location_type === 'Remote').length,
    onsite: employees.filter(emp => emp.location_type === 'Onsite').length,
  };
  breakdown.total = breakdown.remote + breakdown.onsite;
  return breakdown;
};

// Get team availability summary
export const getTeamAvailability = () => {
  const employees = getEmployeeAbsences();
  const teams = {};
  
  employees.forEach(emp => {
    if (!teams[emp.team_id]) {
      teams[emp.team_id] = {
        team_id: emp.team_id,
        team_name: emp.team_name,
        total_absences: 0,
        escalated: 0,
      };
    }
    teams[emp.team_id].total_absences++;
    if (emp.escalated_to_hr === 'true') {
      teams[emp.team_id].escalated++;
    }
  });
  
  return Object.values(teams);
};

// Get RAG status (Red/Amber/Green)
// Red: > 5 absences, Amber: 3-5 absences, Green: < 3 absences
export const getTeamRAGStatus = () => {
  const availability = getTeamAvailability();
  
  return availability.map(team => ({
    ...team,
    status: team.total_absences > 5 ? 'Red' : team.total_absences >= 3 ? 'Amber' : 'Green',
  }));
};

// Get absences by office location
export const getAbsencesByLocation = () => {
  const employees = getEmployeeAbsences();
  const locations = {};
  
  Object.keys(officeLocations).forEach(location => {
    locations[location] = {
      name: location,
      coordinates: officeLocations[location],
      absences: [],
      total: 0,
      escalated: 0,
    };
  });
  
  employees.forEach(emp => {
    if (locations[emp.office_location]) {
      locations[emp.office_location].absences.push(emp);
      locations[emp.office_location].total++;
      if (emp.escalated_to_hr === 'true') {
        locations[emp.office_location].escalated++;
      }
    }
  });
  
  return Object.values(locations).filter(loc => loc.total > 0);
};
