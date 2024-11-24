import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "./assets/images/drink-1532300_1920.jpg"; // Your background image path

const DietPlanPage = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("YOUR_API_ENDPOINT_HERE"); // Replace with actual API endpoint
        setUsers(response.data); // Assuming API returns an array of users
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewDetails = (user) => {
    navigate(`/userdetails/${user.user_id}`, { state: { user } });
  };

  return (
    <div
      className="relative min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black bg-opacity-60 filter blur-sm"></div>

      {/* Content Section */}
      <div className="relative z-10 p-8 text-center text-white">
        <h1 className="mb-8 text-3xl font-semibold">Diet Plan Page</h1>

        {/* Loading and Error Handling */}
        {loading ? (
          <p className="text-xl text-green-300">Loading data...</p>
        ) : error ? (
          <p className="text-xl text-red-500">{error}</p>
        ) : (
          <div className="max-w-6xl p-6 mx-auto overflow-x-auto bg-white rounded-lg shadow-xl bg-opacity-90">
            <table className="min-w-full border-collapse table-auto">
              <thead>
                <tr className="text-white bg-green-600">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Allergy</th>
                  <th className="px-6 py-3 text-left">Preference</th>
                  <th className="px-6 py-3 text-left">Disease</th>
                  <th className="px-6 py-3 text-left">Diet Plan</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3 text-gray-800">{user.first_name}</td>
                    <td className="px-6 py-3 text-gray-800">
                      {user.allergic_to_food || "None"}
                    </td>
                    <td className="px-6 py-3 text-gray-800">{user.preference}</td>
                    <td className="px-6 py-3 text-gray-800">
                      {user.disease || "None"}
                    </td>
                    <td className="px-6 py-3 text-gray-800">{user.diet_plan}</td>
                    <td className="px-6 py-3 text-gray-800">
                      {user.query_message}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlanPage;
