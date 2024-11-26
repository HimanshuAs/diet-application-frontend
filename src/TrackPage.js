import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faGlassWater, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Nav";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const TrackPage = () => {
  const [trackData, setTrackData] = useState(null); // Track data entries
  const [queryStatus, setQueryStatus] = useState(""); // To track request status (pending or resolved)
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(""); // For error messages

  useEffect(() => {
    const fetchQueryStatus = async () => {
      setLoading(true);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch query status from the first API
        const response = await fetch(`http://127.0.0.1:8000/user/query-status/${userId}`);
        const data = await response.json();

        if (data.Status === 200) {
          setQueryStatus(data.Data.query_status); // Set the query status (pending or resolved)

          // If resolved, fetch tracking details
          if (data.Data.query_status !== "pending") {
            fetchTrackDetails(userId); // Call to fetch the tracking details
          }
        } else {
          setError("Failed to fetch request status.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchTrackDetails = async (userId) => {
      try {
        // Fetch tracking details from the second API when the request is resolved
        const response = await fetch(`http://127.0.0.1:8000/user/diet-progress/${userId}`);
        const data = await response.json();
        console.log("Diet Progress Data:", data);

        if (data.Status === 200) {
          setTrackData(data.Data); // Set the overall tracking data
        } else {
          setError("Failed to fetch tracking details.");
        }
      } catch (err) {
        setError("An error occurred while fetching tracking details.");
      }
    };

    fetchQueryStatus();
  }, []);

  const progressData = trackData ? trackData.progress : {};
  const chartData = {
    labels: ["Breakfast", "Lunch", "Dinner", "Exercise", "Water Intake"],
    datasets: [
      {
        data: [
          progressData.breakfast || 0,
          progressData.lunch || 0,
          progressData.dinner || 0,
          progressData.exercise || 0,
          progressData.water_intake || 0
        ],
        backgroundColor: ["#ffcc00", "#ff9900", "#ff6600", "#66cc33", "#3399ff"],
        hoverBackgroundColor: ["#ffdd33", "#ffbb33", "#ff7744", "#77cc44", "#66aaff"],
      }
    ]
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-green-600">Your Daily Progress</h1>
          <p className="text-center text-gray-500">Review your tracked entries and stay on track!</p>

          {loading ? (
            <div className="mt-8 text-center">Loading...</div>
          ) : error ? (
            <div className="mt-8 text-center text-red-500">{error}</div>
          ) : queryStatus === "pending" ? (
            <div className="p-6 mt-8 bg-yellow-100 rounded-lg shadow-md">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon icon={faUtensils} className="text-4xl text-yellow-600" />
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-yellow-600">Your Request is Pending</h2>
                    <p className="text-gray-700">
                      Your query is currently being reviewed. Please wait while we process it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : trackData ? (
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center text-green-600">Your Progress</h2>

                {/* Pie chart */}
                <div className=" flex justify-center mt-6" style={{ width: "500px", margin: "0 auto" }}>
                <Pie data={chartData} width={10} height={10} />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
                  <div>
                    <p>
                      Breakfast: <strong>{progressData.breakfast}%</strong>
                    </p>
                    <p>
                      Lunch: <strong>{progressData.lunch}%</strong>
                    </p>
                    <p>
                      Dinner: <strong>{progressData.dinner}%</strong>
                    </p>
                  </div>
                  <div>
                    <p>
                      Exercise: <strong>{progressData.exercise}%</strong>
                    </p>
                    <p>
                      Water Intake: <strong>{progressData.water_intake}%</strong>
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p>
                    Overall Progress: <strong>{progressData.overall_progress}%</strong>
                  </p>
                </div>
              </div>

              {/* Summary Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-center text-gray-700">Summary</h2>
                <div className="flex justify-around mt-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-green-600">Days Followed</h3>
                    <p className="text-xl">
                      {trackData.diet_followed_for_days} / {trackData.plan_duration}
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-blue-600">Plan Duration</h3>
                    <p className="text-xl">{trackData.plan_duration} days</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 text-center">No progress data available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackPage;
