import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const userName = localStorage.getItem("first_name") || "User";
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("first_name");
    navigate("/login");
  };

  return (
    <nav className="shadow-md bg-gradient-to-r from-green-500 via-green-600 to-green-700">
      <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white cursor-pointer">
          <Link to="/">Health<span className="text-yellow-400">Quest</span>
        </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <span className="px-3 py-1 text-sm font-medium text-white bg-green-700 rounded-lg">
            Welcome, {userName}!
          </span>

          {/* Links */}
          <Link
            to="/seeDietPlan"
            className={`text-lg font-semibold ${
              location.pathname === "/seeDietPlan"
                ? "text-yellow-300 underline"
                : "text-white hover:text-yellow-300"
            }`}
          >
            Check Query Status
          </Link>

          <Link
            to="/trackingDiet"
            className={`text-lg font-semibold ${
              location.pathname === "/trackingDiet"
                ? "text-yellow-300 underline"
                : "text-white hover:text-yellow-300"
            }`}
          >
            Track Your Diet
          </Link>

          <Link
            to="/querystatus"
            className={`text-lg font-semibold ${
              location.pathname === "/querystatus"
                ? "text-yellow-300 underline"
                : "text-white hover:text-yellow-300"
            }`}
          >
            Submit Progress
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-green-700 bg-white rounded-md shadow-md hover:bg-yellow-300 hover:text-green-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
