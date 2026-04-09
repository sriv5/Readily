export default function AbsenceForm({ announcements = [] }) {
    return (
      <div className="absence-form-panel">
    <label>
      Absence Reason
      <select name="absence_reason">
        <option value="illness">Illness</option>
        <option value="contractual_leave">Contractual Leave</option>
        <option value="other">Other</option>
      </select>
      <hr />
      Absence Duration
      <hr />
      Handover Information
      <textarea name="handover_info" rows={4} cols={40}/>
    </label>
    <hr />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
      </div>
    )
  }