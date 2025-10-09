import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import Loginpage from "./Pages/Loginpage";
import Signup from "./Pages/Signuppage";
import Homepage from "./Pages/Homepage";
import Aboutpage from "./Pages/Aboutpage";
import ContactPage from "./Pages/ContactPage";
import Studentpage from "./Pages/Studentpage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true); // initially show signup page

  const handleLogin = (username, password) => {
    // placeholder authentication logic - accept any input
    setIsAuthenticated(true);
    setIsNewUser(false);
  };

  const handleSignup = (userData) => {
    // placeholder signup logic - accept any input
    setIsAuthenticated(true);
    setIsNewUser(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsNewUser(true);
  };

  return (
    <Router>
      <div>
        {/* Header with navigation only after login */}
        {isAuthenticated && (
          <header style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
            <nav>
              <Link to="/">Home</Link> |{" "}
              <Link to="/about">About</Link> |{" "}
              <Link to="/contact">Contact</Link> |{" "}
              <Link to="/student">Student</Link> |{" "}
              <button onClick={handleLogout}>Logout</button>
            </nav>
          </header>
        )}

        <Routes>
          {!isAuthenticated ? (
            <>
              {isNewUser ? (
                <Route path="*" element={<Signup onSignup={handleSignup} switchToLogin={() => setIsNewUser(false)} />} />
              ) : (
                <Route path="*" element={<Loginpage onLogin={handleLogin} switchToSignup={() => setIsNewUser(true)} />} />
              )}
            </>
          ) : (
            <>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<Aboutpage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/student" element={<Studentpage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
