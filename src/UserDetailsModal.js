import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "./assets/images/smoothie-3697014_1920.jpg";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user || {};
  console.log("user", user);

  const [formData, setFormData] = useState({
    lunch: "",
    dinner: "",
    breakfast: "",
    water_intake: "",
    exercise: "",
    plan_duration: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const payload = {
      user_id: user.user_id,
      ...formData,
    };
    console.log("Payload:", payload);

    try {
      const response = await fetch("http://127.0.0.1:8000/dietitian/create-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Diet Plan for ${user.first_name} submitted successfully!`);
        navigate("/dietitian");
      } else {
        setError(data.message || "Failed to submit the diet plan.");
      }
    } catch (err) {
      setError("An error occurred while submitting the diet plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-md"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>

      {/* Content Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg bg-opacity-90">
          <h2 className="mb-6 text-2xl font-bold text-center text-green-600">
            User Diet Details
          </h2>
          <div className="mb-4">
            <p>
              <strong>Name:</strong> {user.first_name}
            </p>
            <p>
              <strong>Height:</strong> {user.height}
            </p>
            <p>
              <strong>Weight:</strong> {user.weight}
            </p>
            <p>
              <strong>Preference:</strong> {user.preference}
            </p>
            <p>
              <strong>Description:</strong> {user.query_message}
            </p>
            <p>
              <strong>Disease:</strong> {user.disease || "None"}
            </p>
            <p>
              <strong>Allergic food:</strong> {user.allergic_to_food || "None"}
            </p>
            <p>
              <strong>Diet Plan:</strong> {user.diet_plan}
            </p>
          </div>
          {/* Input Fields */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-gray-700">Lunch:</label>
              <input
                type="text"
                name="lunch"
                value={formData.lunch}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter lunch details"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Dinner:</label>
              <input
                type="text"
                name="dinner"
                value={formData.dinner}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter dinner details"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Breakfast:</label>
              <input
                type="text"
                name="breakfast"
                value={formData.breakfast}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter breakfast details"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Water Intake (ml):</label>
              <input
                type="number"
                name="water_intake"
                value={formData.water_intake}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter water intake in ml"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Exercise:</label>
              <input
                type="text"
                name="exercise"
                value={formData.exercise}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter exercise details"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Plan Duration:</label>
              <input
                type="text"
                name="plan_duration"
                value={formData.plan_duration}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter plan duration"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                placeholder="Additional description..."
              ></textarea>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate("/dietitian")}
                className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className={`px-4 py-2 text-white rounded-md ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Submitting..." : "Submit Plan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
