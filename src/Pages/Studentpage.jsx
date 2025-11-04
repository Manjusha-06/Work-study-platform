import { useState } from "react";

export default function Studentpage() {
  // Core inputs
  const [subjects, setSubjects] = useState(""); // total number of subjects
  const [subjectNames, setSubjectNames] = useState(""); // comma-separated names
  const [jobTimings, setJobTimings] = useState(""); // e.g., "Mon-Fri 15:00-18:00" or "15:00-18:00"
  // Yes/No mutually exclusive options for job seeking
  // null = not answered yet, true = yes, false = no
  const [lookingForJob, setLookingForJob] = useState(null);
  const [education, setEducation] = useState("");
  const [interestedCompanies, setInterestedCompanies] = useState("");

  // Timetable state
  // We store a structure: { grid: [{ day, slots: [{ subject }] }], headerLabels: [] }
  const [timetable, setTimetable] = useState(null);

  // Helper: parse a simple daily job window from jobTimings
  // Returns { startHour, endHour } in 24h integers, or null if not parseable
  const parseDailyJobWindow = () => {
    if (!jobTimings) return null;

    // Normalize input (remove spaces)
    const s = jobTimings.replace(/\s+/g, "");
    // Try patterns like "HH:MM-HH:MM" or "HH-HH" for daily window
    const m1 = s.match(/^(\d{1,2}):?(\d{2})?-(\d{1,2}):?(\d{2})?$/);
    if (m1) {
      const sh = parseInt(m1[1], 10);
      const eh = parseInt(m1[3], 10);
      // If minutes are present, ignore for simplicity and normalize to hours
      return { startHour: sh, endHour: eh };
    }
    const m2 = s.match(/^(\d{1,2})-(\d{1,2})$/);
    if (m2) {
      const sh = parseInt(m2[1], 10);
      const eh = parseInt(m2[2], 10);
      return { startHour: sh, endHour: eh };
    }
    // Could not parse
    return null;
  };

  // Generate timetable: 5 days Mon-Fri, 4 slots per day by default
  // Slots are 1 hour each; only subject names displayed in cells
  const generateTimetable = () => {
    const numsSubjects = parseInt(subjects);
    if (isNaN(numsSubjects) || numsSubjects <= 0) {
      alert("Please enter a valid number of subjects.");
      return;
    }

    // Subject names mapping
    const namesArray = subjectNames
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    const subjectsList = [];
    for (let i = 0; i < numsSubjects; i++) {
      subjectsList.push(namesArray[i] || `Subject ${i + 1}`);
    }

    // Timetable layout
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const dayStartHourDefault = 16; // 4 PM
    const slotsPerDayDefault = 4; // 4 one-hour slots

    // If job timings are provided and parseable, compute available hours
    const jobWindow = parseDailyJobWindow();
    let headerLabels = [];
    let slotsPerDay = slotsPerDayDefault;
    let grid = days.map((day) => ({ day, slots: [] }));

    if (jobWindow) {
      // Compute available hours within a base study window, e.g., 16:00-20:00
      // We'll take a simple approach: include hours from 16 to 23 except the job window
      const baseStart = 16;
      const baseEnd = 23; // up to 23:00 for daily slots
      const availableHours = [];
      for (let h = baseStart; h < baseEnd; h++) {
        // if h is within [start, end) block, skip
        if (h >= jobWindow.startHour && h < jobWindow.endHour) continue;
        availableHours.push(h);
      }
      headerLabels = availableHours.map((h) => {
        const ampm = h >= 12 ? "pm" : "am";
        const h12 = h % 12 === 0 ? 12 : h % 12;
        return `${h12}${ampm}`;
      });
      slotsPerDay = availableHours.length || 0;
      // If no available slots, fall back to a minimal 1-slot grid to avoid empty table
      if (slotsPerDay === 0) {
        slotsPerDay = 1;
        headerLabels = ["?"];
      }

      // Build grid with available hours slots, but we only fill with subject names
      // We map sequential subjects across days and slots
      let subjectIndex = 0;
      for (let d = 0; d < days.length; d++) {
        grid[d].slots = [];
        for (let s = 0; s < slotsPerDay; s++) {
          grid[d].slots.push({ subject: subjectsList[subjectIndex] });
          subjectIndex = (subjectIndex + 1) % numsSubjects;
        }
      }
      // Attach headerLabels to grid data
      setTimetable({ grid, headerLabels });
      return;
    }

    // Default behavior: no job window
    // Build grid: 5 days x slotsPerDayDefault
    let subjectIndex = 0;
    for (let d = 0; d < days.length; d++) {
      grid[d].slots = [];
      for (let s = 0; s < slotsPerDayDefault; s++) {
        grid[d].slots.push({ subject: subjectsList[subjectIndex] });
        subjectIndex = (subjectIndex + 1) % numsSubjects;
      }
    }

    headerLabels = Array.from({ length: slotsPerDayDefault }, (_, i) => {
      const hour = dayStartHourDefault + i;
      const ampm = hour >= 12 ? "pm" : "am";
      const h12 = hour % 12 === 0 ? 12 : hour % 12;
      return `${h12}${ampm}`;
    });

    setTimetable({ grid, headerLabels });
  };

  const renderTimetableTable = () => {
    if (!timetable) return null;
    const { grid, headerLabels } = timetable;
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Generated Timetable</h3>
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Day / Time</th>
              {headerLabels.map((label, idx) => (
                <th key={idx} style={{ whiteSpace: "nowrap" }}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((dayBlock, di) => (
              <tr key={di}>
                <td style={{ fontWeight: "bold" }}>{dayBlock.day}</td>
                {dayBlock.slots.map((slot, si) => (
                  <td key={si}>{slot.subject}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Student Details</h2>

      <label>Number of Subjects to Study:</label><br />
      <input type="number" value={subjects} onChange={e => setSubjects(e.target.value)} /><br /><br />

      <label>Subject Names (comma-separated):</label><br />
      <input
        type="text"
        value={subjectNames}
        onChange={e => setSubjectNames(e.target.value)}
        placeholder="e.g., Math, Physics, Chemistry"
        style={{ width: "100%" }}
      /><br /><br />

      <label>Job Timings (if any):</label><br />
      <input type="text" value={jobTimings} onChange={e => setJobTimings(e.target.value)} placeholder="e.g. Mon-Fri 15:00-18:00" /><br /><br />

      <label>Currently Looking for a Job?</label><br />
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={lookingForJob === true}
            onChange={() => setLookingForJob(true)}
            aria-checked={lookingForJob === true}
          />
          <span style={{ marginLeft: 6 }}>Yes</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={lookingForJob === false}
            onChange={() => setLookingForJob(false)}
            aria-checked={lookingForJob === false}
          />
          <span style={{ marginLeft: 6 }}>No</span>
        </label>

        <span style={{ marginLeft: 10, color: "#555" }}>
          {lookingForJob === null ? "No selection" : lookingForJob ? "Yes" : "No"}
        </span>
      </div>
      <br />

      <label>Highest Education Qualification Till Now:</label><br />
      <input type="text" value={education} onChange={e => setEducation(e.target.value)} /><br /><br />

      <label>Interested Companies:</label><br />
      <input type="text" value={interestedCompanies} onChange={e => setInterestedCompanies(e.target.value)} /><br /><br />

      <button style={{ marginRight: 10 }} onClick={generateTimetable}>
        Generate Timetable
      </button>
      <button style={{ marginRight: 10 }} onClick={() => alert("Tracking work hours feature coming soon!")}>
        Track Work Hours
      </button>
      <button onClick={() => alert("Job postings feature coming soon!")}>
        Job Postings
      </button>

      {renderTimetableTable()}
    </div>
  );
}
