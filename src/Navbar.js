import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection

const Navbar = () => {
  const userName = localStorage.getItem('first_name') || 'User'; // Assuming user's name is stored in localStorage
  const navigate = useNavigate(); // Use navigate for redirection

  // Handle logout
  const handleLogout = () => {
    // Clear the user's data from localStorage
    localStorage.removeItem('user_id');
    localStorage.removeItem('first_name');
    
    // Redirect to login page
    navigate('/login'); // You can change '/login' to your actual login route
  };

  return (
    <nav className="flex items-center justify-between p-4 text-white bg-green-600">
      <div className="text-xl font-bold">HealthQuest</div>
      <div className="flex space-x-4">
        <span>{userName}</span>
        <Link to="/querystatus" className="text-white hover:text-green-200">
          Check Query Status
        </Link>
        <Link to="/trackingDiet" className="text-white hover:text-green-200">
          Track Your Diet
        </Link>
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="text-white hover:text-green-200">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
