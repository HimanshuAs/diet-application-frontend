import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faGlassWater, faCalendarDay } from "@fortawesome/free-solid-svg-icons";

const TrackPage = () => {
  const [trackData, setTrackData] = useState([]); // Track data entries
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
        const response = await fetch(`http://127.0.0.1:8000/user/track-details/${userId}`);
        const data = await response.json();

        if (data.Status === 200) {
          setTrackData(data.entries); // Set the tracking data when resolved
        } else {
          setError("Failed to fetch tracking details.");
        }
      } catch (err) {
        setError("An error occurred while fetching tracking details.");
      }
    };

    fetchQueryStatus();
  }, []);

  return (
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
                  <p className="text-gray-700">Your query is currently being reviewed. Please wait while we process it.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {trackData.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-lg shadow-md ${
                  entry.rating.lunch === 0 || entry.rating.dinner === 0 ? "bg-red-100" : "bg-white"
                }`}
              >
                <FontAwesomeIcon
                  icon={faCalendarDay}
                  className="text-2xl text-green-500"
                />
                <div className="w-full ml-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">Day {entry.dayNumber}</h3>
                    <p
                      className={`${
                        entry.rating.lunch === 0 || entry.rating.dinner === 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {entry.rating.lunch === 0 || entry.rating.dinner === 0 ? "Missed Entry" : "Completed"}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-2 text-gray-700">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faUtensils}
                        className="text-yellow-500"
                      />
                      <span>
                        Lunch: <strong>{entry.rating.lunch || "0"} / 5</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faUtensils}
                        className="text-orange-500"
                      />
                      <span>
                        Dinner: <strong>{entry.rating.dinner || "0"} / 5</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faGlassWater}
                        className="text-blue-500"
                      />
                      <span>
                        Water Intake: <strong>{entry.rating.waterIntake || "0"} / 5</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Section */}
        {!loading && !error && queryStatus !== "pending" && trackData.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-700">Summary</h2>
            <div className="flex justify-around mt-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-green-600">Days Completed</h3>
                <p className="text-xl">{trackData.filter((e) => e.rating.lunch !== 0).length}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-blue-600">Average Water Intake</h3>
                <p className="text-xl">
                  {(
                    trackData.reduce((sum, e) => sum + (e.rating.waterIntake || 0), 0) /
                    trackData.length
                  ).toFixed(1)}{" "}
                  L
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackPage;
