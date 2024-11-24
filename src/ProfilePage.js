import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaWeightHanging, FaRuler, FaTransgender } from 'react-icons/fa';
import bgImage from './assets/images/smoothie-3697014_1920.jpg';
import { useNavigate } from "react-router-dom";

 

const ProfileSetupPage = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    weight: '',
    height: '',
    gender: ''
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    age: '',
    weight: '',
    height: '',
    gender: ''
  });

  const [loading, setLoading] = useState(false);  // To show loading state while API call is in progress
  const [success, setSuccess] = useState(false);  // To show success message when profile is saved
  const [apiError, setApiError] = useState('');  // To store API error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name || !/^[A-Za-z]+$/.test(formData.first_name)) {
      newErrors.first_name = 'First Name is required and should only contain letters';
    }

    if (!formData.last_name || !/^[A-Za-z]+$/.test(formData.last_name)) {
      newErrors.last_name = 'Last Name is required and should only contain letters';
    }

    if (!formData.age || formData.age <= 5 || isNaN(formData.age)) {
      newErrors.age = 'Age must be greater than 5 years';
    }

    if (!formData.weight || formData.weight <= 0 || isNaN(formData.weight)) {
      newErrors.weight = 'Weight must be a positive number';
    }

    if (!formData.height || formData.height <= 0 || isNaN(formData.height)) {
      newErrors.height = 'Height must be a positive number';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setLoading(true); // Set loading to true while the API call is in progress

    if (validateForm()) {
        try {
            // Get user_id from localStorage
            const userId = localStorage.getItem('user_id');
            
            if (!userId) {
              setApiError('User ID not found. Please log in again.');
              setLoading(false);
              return;
            }
    
            // Include user_id in the form data
            const dataToSubmit = {
              ...formData,
              user_id: userId
            };
            let ody= JSON.stringify(dataToSubmit)
            console.log("95",ody)
    
            // Make the API request to save profile data
            const response = await fetch('http://127.0.0.1:8000/user/profile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToSubmit),
            });
    
            const data = await response.json();
            console.log(data)

        if (data.Status===200) {
          setSuccess(true);
          setApiError('');  
          navigate('/userquery')
        } else {
          setApiError(data.Message || 'Failed to save profile. Please try again.');
          setSuccess(false);
        }
      } catch (error) {
        setApiError('An error occurred while saving your profile.');
        setSuccess(false);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    } else {
      setLoading(false); // Set loading to false if validation fails
    }
  };

  return (
    <div
      className="min-h-screen py-8 overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-green-700">Profile Setup</h2>

        {/* Show success or error message */}
        {success && <p className="mb-4 text-center text-green-600">Profile saved successfully!</p>}
        {apiError && <p className="mb-4 text-center text-red-500">{apiError}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="flex flex-col">
            <div className="flex items-center p-3 transition duration-200 border rounded-md focus-within:border-green-500">
              <FaUser className="mr-3 text-xl text-green-600" />
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full text-gray-700 bg-transparent outline-none"
              />
            </div>
            {errors.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <div className="flex items-center p-3 transition duration-200 border rounded-md focus-within:border-green-500">
              <FaUser className="mr-3 text-xl text-green-600" />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full text-gray-700 bg-transparent outline-none"
              />
            </div>
            {errors.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <div className="flex items-center p-3 transition duration-200 border rounded-md focus-within:border-green-500">
              <FaCalendarAlt className="mr-3 text-xl text-green-600" />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full text-gray-700 bg-transparent outline-none"
              />
            </div>
            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
          </div>

          {/* Weight */}
          <div className="flex flex-col">
            <div className="flex items-center p-3 transition duration-200 border rounded-md focus-within:border-green-500">
              <FaWeightHanging className="mr-3 text-xl text-green-600" />
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="w-full text-gray-700 bg-transparent outline-none"
              />
            </div>
            {errors.weight && <p className="mt-1 text-sm text-red-500">{errors.weight}</p>}
          </div>

          {/* Height */}
          <div className="flex flex-col">
            <div className="flex items-center p-3 transition duration-200 border rounded-md focus-within:border-green-500">
              <FaRuler className="mr-3 text-xl text-green-600" />
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height (cm)"
                className="w-full text-gray-700 bg-transparent outline-none"
              />
            </div>
            {errors.height && <p className="mt-1 text-sm text-red-500">{errors.height}</p>}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <div className="flex items-center p-3 transition duration-200 border rounded-md focus-within:border-green-500">
              <FaTransgender className="mr-3 text-xl text-green-600" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full text-gray-700 bg-transparent outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white transition duration-200 bg-green-600 rounded-md hover:bg-green-700"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
