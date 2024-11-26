import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from './assets/images/basil-583816_1920.jpg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("30", data);

      if (data.Status === 200) {
        localStorage.setItem("user_id", data.Data.user_id);
        localStorage.setItem("first_name", data.Data.first_name);

        if (data.Data.user_role === "dietitian") {
          navigate("/dietitian");
        } else if (data.Data.is_profile_set === true) {
          console.log("40",data.Data.is_profile_set)
          navigate("/userquery");
        } else {
          navigate("/profile");
        }
      } else {
        setError(data.Message || "Incorrect username or password. Please try again.");
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

      {/* Login Form */}
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg bg-opacity-90">
        <h2 className="text-2xl font-bold text-center text-green-600">Welcome Back!</h2>
        <p className="mb-6 text-center text-gray-500">Login to continue</p>

        {/* Show error message */}
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
