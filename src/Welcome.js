import React from 'react';
import bgImage from './assets/images/smoothie-3697014_1920.jpg';
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Welcome to Your Diet Plan
        </h1>
        <p className="text-lg text-gray-700">
          Manage your health and nutrition with a personalized diet plan.
        </p>
        <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
          
          <Link to="/login" className="text-green-600  text-white ">
          Get Started
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
