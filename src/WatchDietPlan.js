import React, { useEffect, useState } from "react";
import bgImage from "./assets/images/drink-1532300_1920.jpg"; // Replace with your background image path
import { Link} from "react-router-dom";
const DietPlanDetails = () => {
  const [dietDetails, setDietDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user_id from localStorage
    const id = localStorage.getItem("user_id");

    if (!id) {
      setError("User ID not found in localStorage.");
      setLoading(false);
      return;
    }

    // Fetch diet plan details from API
    const fetchDietPlan = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/dietitian/diet-plan/${id}`);
        const data = await response.json();
        console.log("24",data)

        if (response.ok) {
          setDietDetails(data);
        } else {
          setError(data.message || "Failed to fetch diet plan details.");
        }
      } catch (err) {
        setError("An error occurred while fetching the diet plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchDietPlan();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading diet plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black bg-opacity-50 filter blur-md"></div>

      {/* Content Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-3xl p-8 shadow-xl bg-gradient-to-br from-white via-green-100 to-white rounded-2xl">
          {/* Title Section */}
          <h1 className="mb-6 text-4xl font-extrabold text-center text-green-700">
            Your Personalized Diet Plan
          </h1>
          <p className="mb-10 text-center text-gray-600">
            Stay healthy and achieve your goals with this custom diet plan!
          </p>

          {/* Diet Details */}
          <div className="grid gap-6 text-lg">
            {/* Breakfast */}
            <div className="flex items-center p-4 bg-green-100 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-200 rounded-full">
                🥣
              </div>
              <div>
                <strong>Breakfast:</strong> {dietDetails.breakfast || "Not specified"}
              </div>
            </div>

            {/* Lunch */}
            <div className="flex items-center p-4 bg-green-100 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-200 rounded-full">
                🍛
              </div>
              <div>
                <strong>Lunch:</strong> {dietDetails.lunch || "Not specified"}
              </div>
            </div>

            {/* Dinner */}
            <div className="flex items-center p-4 bg-green-100 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-200 rounded-full">
                🥗
              </div>
              <div>
                <strong>Dinner:</strong> {dietDetails.dinner || "Not specified"}
              </div>
            </div>

            {/* Water Intake */}
            <div className="flex items-center p-4 bg-green-100 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-200 rounded-full">
                💧
              </div>
              <div>
                <strong>Water Intake:</strong> {dietDetails.water_intake || "Not specified"}
              </div>
            </div>

            {/* Exercise */}
            <div className="flex items-center p-4 bg-green-100 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-200 rounded-full">
                🏋️
              </div>
              <div>
                <strong>Exercise:</strong> {dietDetails.exercise || "Not specified"}
              </div>
            </div>

            {/* Plan Duration */}
            <div className="flex items-center p-4 bg-green-100 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-200 rounded-full">
                ⏳
              </div>
              <div>
                <strong>Plan Duration:</strong> {dietDetails.plan_duration || "Not specified"}
              </div>
            </div>

            {/* Description */}
            <div className="p-6 border-l-4 border-green-400 rounded-lg shadow-md bg-green-50">
              <strong>Description:</strong>
              <p className="mt-2 text-gray-700">
                {dietDetails.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10 text-center">
            <button className="px-6 py-3 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700">
            <Link
            to="/querystatus"
            
          >
           Follow This Plan
          </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlanDetails;
