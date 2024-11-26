import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faDumbbell} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const QueryStatus = () => {
  const navigate= useNavigate()
    const [responses, setResponses] = useState({
      breakfast: null,
      lunch: null,
      dinner: null,
      exercise: null,
      water_intake: null,
    });
    const [loading, setLoading] = useState(false);
    const [currentDay, setCurrentDay] = useState(1);
  
    const handleToggle = (key, value) => {
      setResponses({
        ...responses,
        [key]: value,
      });
    };  

  const handleSubmitResponses = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    setLoading(true);

    try {
        const payload = {
          user_id: userId,
          breakfast: responses.breakfast === 100 ? "yes" : "no",
          lunch: responses.lunch === 100 ? "yes" : "no",
          dinner: responses.dinner === 100 ? "yes" : "no",
          water_intake: responses.water_intake === 100 ? "yes" : "no",
          exercise: responses.exercise === 100 ? "yes" : "no",
        };
        console.log("41",payload)
  
        const response = await fetch("http://127.0.0.1:8000/user/diet-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log(response)
  
        if (response.ok) {
          alert("Responses submitted successfully!");
          setResponses({
            breakfast: null,
            lunch: null,
            dinner: null,
            exercise: null,
            water_intake: null,
            
          });
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Failed to submit responses.");
        }
      } catch (error) {
        console.error("Error submitting responses:", error);
        alert("An error occurred while submitting your responses.");
      } finally {
        setLoading(false);
        navigate('/trackingDiet')
      }
    };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-100">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl font-semibold text-green-600 animate-bounce">
            Submitting your responses...
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="py-8 text-center bg-green-500 shadow-lg">
            <h1 className="text-4xl font-extrabold text-white">
              Day {currentDay} - Track Your Activities
            </h1>
            <p className="mt-2 text-lg text-green-100">
              Answer "Yes" or "No" for today's activities.
            </p>
          </header>

          {/* Main Content */}
          <div className="container px-4 py-8 mx-auto md:px-8 ">
            <form onSubmit={handleSubmitResponses} className="space-y-8">
              {/* Breakfast */}
              <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg">
                <h3 className="flex items-center text-xl font-semibold text-green-600">
                  <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                  Breakfast
                </h3>
                <div className="flex mt-4 space-x-4">
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.breakfast === 100
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('breakfast', 100)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.breakfast === 0
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('breakfast', 0)}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Lunch */}
              <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg">
                <h3 className="flex items-center text-xl font-semibold text-green-600">
                  <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                  Lunch
                </h3>
                <div className="flex mt-4 space-x-4">
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.lunch === 100
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('lunch', 100)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.lunch === 0
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('lunch', 0)}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Dinner */}
              <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg">
                <h3 className="flex items-center text-xl font-semibold text-green-600">
                  <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                  Dinner
                </h3>
                <div className="flex mt-4 space-x-4">
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.dinner === 100
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('dinner', 100)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.dinner === 0
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('dinner', 0)}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Exercise */}
              <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg">
                <h3 className="flex items-center text-xl font-semibold text-green-600">
                  <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
                  Exercise
                </h3>
                <div className="flex mt-4 space-x-4">
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.exercise === 100
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('exercise', 100)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.exercise === 0
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('exercise', 0)}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg">
                <h3 className="flex items-center text-xl font-semibold text-green-600">
                  <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
                  Water Intake
                </h3>
                <div className="flex mt-4 space-x-4">
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.water_intake === 100
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('water_intake', 100)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      responses.water_intake === 0
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleToggle('water_intake', 0)}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 text-white transition bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
              >
                Submit Your Responses
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default QueryStatus;
