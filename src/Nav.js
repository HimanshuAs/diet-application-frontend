import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

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

export default Nav;
