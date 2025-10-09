import { useState } from "react";

export default function Loginpage({ onLogin, switchToSignup }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(usernameOrEmail, password);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2><center>Login</center></h2>
      <form onSubmit={handleSubmit}>
        <label>Username or Email:</label><br />
        <input type="text" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} required /><br /><br />

        <label>Password:</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />

        <center><button type="submit">Login</button></center>
      </form>
      <p>
        Forgot password? <a href="mailto:harmanvar@gmail.com">Contact Support</a>
      </p>
      <p>
        New user? <button onClick={switchToSignup}>Sign up here</button>
      </p>
    </div>
  );
}
