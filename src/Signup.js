import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader"; // Ensure Loader is implemented or imported correctly
import bgImage from './assets/images/istockphoto-868604108-1024x1024.jpg';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!isEmailValid(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!isPasswordValid(password)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/auth/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up.");
      }

      const data = await response.json();
      localStorage.setItem("user_id", data.Data.user_id);
      setSuccess("Signup successful! OTP sent to your email.");
      setShowOtpModal(true);
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid OTP.");
      }

      const data = await response.json();
      setSuccess("OTP verified successfully! Redirecting to login...");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      console.error("OTP verification error:", err.message);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-sm"
        style={{
          backgroundImage:  `url(${bgImage})`,
        }}
      ></div>

      {/* Show Loader */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loader />
        </div>
      )}

      {/* Signup Form */}
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg bg-opacity-90">
        <h2 className="text-2xl font-bold text-center text-green-600">Create an Account</h2>
        <p className="mb-6 text-center text-gray-500">Join the journey to better health!</p>

        {error && (
          <p className="p-2 mb-4 text-sm text-center text-red-500 bg-red-100 rounded-md">
            {error}
          </p>
        )}

        {success && (
          <p className="p-2 mb-4 text-sm text-center text-green-500 bg-green-100 rounded-md">
            {success}
          </p>
        )}

        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded-lg shadow-lg w-96">
            <h3 className="mb-4 text-xl font-semibold text-green-600">Enter OTP</h3>
            <p className="mb-4 text-gray-500">An OTP has been sent to your email. Please enter it below:</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowOtpModal(false)}
                className="px-4 py-2 mr-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleOtpSubmit}
                className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
