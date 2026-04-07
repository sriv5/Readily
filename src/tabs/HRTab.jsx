import { useState } from 'react'
import Card from '../components/Card'
import ChartPanel from '../components/ChartPanel'
import { liveStaffStatusData, organisationAbsenceSnapshotData } from '../data/mockData'
export default function HRTab({ employees, teams, officeLocations }) {
  const escalatedEmployees = employees.filter(emp => emp.escalated_to_hr)

  return (
    <div className="tab-page">
      <div className="grid grid-auto">
        <Card title="Live Staff Status" variant="blue">
          <ChartPanel
            type="doughnut"
            data={liveStaffStatusData}
            showLegend={false}
          />
        </Card>

        <Card title="Organisation Absence Snapshot" variant="purple">
          <ChartPanel
            type="bar"
            data={organisationAbsenceSnapshotData}
            showLegend={false}
          />
        </Card>
      </div>
    </div>
  )
}