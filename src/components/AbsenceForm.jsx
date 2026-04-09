import Button from './Button'
import '../styles/AbsenceForm.css'

export default function AbsenceForm({ announcements = [] }) {
  return (
    <form className="absence-form">
      <div className="form-group">
        <label htmlFor="absence_reason" className="form-label">
          Absence Reason
        </label>
        <select
          id="absence_reason"
          name="absence_reason"
          className="form-select"
          defaultValue=""
        >
          <option value="" disabled>Select a reason</option>
          <option value="illness">Illness</option>
          <option value="contractual_leave">Contractual Leave</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Absence Duration</label>
        <div className="date-inputs">
          <div className="date-group">
            <label htmlFor="start_date" className="date-label">Start Date</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              className="form-input"
            />
          </div>
          <div className="date-group">
            <label htmlFor="end_date" className="date-label">End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              className="form-input"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="handover_info" className="form-label">
          Handover Information
        </label>
        <textarea
          id="handover_info"
          name="handover_info"
          rows={4}
          className="form-textarea"
          placeholder="Please provide details about your absence and any handover information..."
        />
      </div>

      <div className="form-actions">
        <Button type="reset" variant="secondary">
          Reset
        </Button>
        <Button type="submit" variant="primary">
          Submit Request
        </Button>
      </div>
    </form>
  )
}