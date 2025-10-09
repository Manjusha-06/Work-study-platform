import { useState } from "react";

export default function Signup({ onSignup, switchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    onSignup(formData);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2><center>Sign Up</center></h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label><br />
        <input name="fullName" value={formData.fullName} onChange={handleChange} required /><br /><br />

        <label>Username:</label><br />
        <input name="username" value={formData.username} onChange={handleChange} required /><br /><br />

        <label>Email:</label><br />
        <input name="email" type="email" value={formData.email} onChange={handleChange} required /><br /><br />

        <label>Password:</label><br />
        <input name="password" type="password" value={formData.password} onChange={handleChange} required /><br /><br />

        <label>Confirm Password:</label><br />
        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required /><br /><br />

        {error && <p style={{color: "red"}}>{error}</p>}

       <center><button type="submit">Sign Up</button></center> 
      </form>
      <p>
        Already have an account? <button onClick={switchToLogin}>Login here</button>
      </p>
    </div>
  );
}
