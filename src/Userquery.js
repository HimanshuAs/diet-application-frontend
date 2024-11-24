import React, { useState } from "react";
import bgImage from './assets/images/drink-1532300_1920.jpg';

const Userquery = () => {
  const [formData, setFormData] = useState({
    dietitianId: "",
    allergicToFood: "",
    preference: "",
    disease: "",
    dietPlan: "",
    queryMessage: "",
  });

  const [status, setStatus] = useState("new");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      const dataToSubmit = {
        ...formData,
        user_id: userId,
        status,
      };

      const response = await fetch("http://127.0.0.1:8000/user/query/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();

      if (data.Status === 200) {
        setSuccess(true);
        setError("");
        setFormData({
          dietitianId: "",
          allergicToFood: "",
          preference: "",
          disease: "",
          dietPlan: "",
          queryMessage: "",
        });
      } else {
        setError(data.message || "Failed to submit the query. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-sm"
        style={{
          backgroundImage:  `url(${bgImage})`, // Replace with your image URL
        }}
      ></div>

      {/* Content Section */}
      <div className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-600">Submit Your Query</h2>
        <p className="mb-6 text-center text-gray-500">Let us know your details</p>

        {/* Success/Error Messages */}
        {success && <p className="mb-4 text-center text-green-600">Query submitted successfully!</p>}
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="dietitianId"
            placeholder="Dietitian ID"
            value={formData.dietitianId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <input
            type="text"
            name="allergicToFood"
            placeholder="Allergic to food (Optional)"
            value={formData.allergicToFood}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <select
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option value="">Select Dietary Preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>

          <input
            type="text"
            name="disease"
            placeholder="Disease (Optional)"
            value={formData.disease}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <select
            name="dietPlan"
            value={formData.dietPlan}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option value="">Select Diet Plan</option>
            <option value="vegetarian">Weight Gain</option>
            <option value="non-vegetarian">Lose Weight</option>
          </select>
          

          <textarea
            name="queryMessage"
            placeholder="Query Message (Optional)"
            value={formData.queryMessage}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Query"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Userquery;
