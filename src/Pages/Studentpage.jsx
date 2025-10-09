import { useState } from "react";

export default function Studentpage() {
  const [subjects, setSubjects] = useState("");
  const [jobTimings, setJobTimings] = useState("");
  const [lookingForJob, setLookingForJob] = useState(false);
  const [education, setEducation] = useState("");
  const [interestedCompanies, setInterestedCompanies] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Student Details</h2>
      <label>Number of Subjects to Study:</label><br />
      <input type="number" value={subjects} onChange={e => setSubjects(e.target.value)} /><br /><br />

      <label>Job Timings (if any):</label><br />
      <input type="text" value={jobTimings} onChange={e => setJobTimings(e.target.value)} placeholder="e.g. Mon-Fri 3pm-6pm" /><br /><br />

      <label>Currently Looking for a Job?</label><br />
      <input type="checkbox" checked={lookingForJob} onChange={e => setLookingForJob(e.target.checked)} /><br /><br />

      <label>Highest Education Qualification Till Now:</label><br />
      <input type="text" value={education} onChange={e => setEducation(e.target.value)} /><br /><br />

      <label>Interested Companies:</label><br />
      <input type="text" value={interestedCompanies} onChange={e => setInterestedCompanies(e.target.value)} /><br /><br />

      <button style={{ marginRight: 10 }} onClick={() => alert("Timetable feature coming soon!")}>
        Timetable
      </button>
      <button style={{ marginRight: 10 }} onClick={() => alert("Tracking work hours feature coming soon!")}>
        Track Work Hours
      </button>
      <button onClick={() => alert("Job postings feature coming soon!")}>
        Job Postings
      </button>
    </div>
  );
}
