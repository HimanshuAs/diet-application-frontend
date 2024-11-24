import React from 'react';
import bgImage from './assets/images/smoothie-3697014_1920.jpg';
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="p-8 text-center bg-white rounded-lg shadow-md bg-opacity-80">
        <h1 className="mb-4 text-3xl font-bold text-green-600">
          Welcome to Your Diet Plan
        </h1>
        <p className="text-lg text-gray-700">
          Manage your health and nutrition with a personalized diet plan.
        </p>
        <button className="px-6 py-2 mt-6 text-white transition bg-green-500 rounded-lg hover:bg-green-600">
          
          <Link to="/login" className="text-white text-green-600 ">
          Get Started
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
