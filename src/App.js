import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './Login';
import ProfilePage from './ProfilePage';
import Signup from './Signup';
import DietPlanPage from './DietPlanPage';
import Welcome from './Welcome';
import Loader from "./Loader";
import Userquery from "./Userquery";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Show loader on route change
    const timeout = setTimeout(() => setLoading(false), 1000); // Simulate async delay
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="App">
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dietitian" element={<DietPlanPage />} />
        <Route path="/userquery" element={<Userquery />} />
      </Routes>
    </div>
  );
}

export default App;
