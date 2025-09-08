import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css"; // shared styles for login/signup
// import dotenv from 'dotenv'
// dotenv.config();

const vercel_signup_url = process.env.REACT_APP_SIGNUP;
const local_signup_url = process.env.NODE_ENV==='production'? vercel_signup_url:"http://localhost:5000/api/sign-up";
const google_signup_url = "http://localhost:5000/api/sign-up/google";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    Geolocation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isValid = () => {
    if (!credentials.name || credentials.name.length < 5) {
      alert("Name must be at least 5 characters long.");
      return false;
    }
    if (!credentials.email.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (credentials.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setIsLoading(true);
    try {
      const response = await fetch(((local_signup_url || vercel_signup_url)), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const resData = await response.json();
      setIsLoading(false);

      if (response.ok && resData.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        const errorMsg = resData.errors
          ? resData.errors.map((err) => err.msg).join(", ")
          : "Enter valid credentials";
        alert(errorMsg);
      }
    } catch (error) {
      setIsLoading(false);
      alert("Failed to fetch. Please check if the server is running.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center vh-100">
      <div className="auth-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Sign up and start using <strong>Tasty Track</strong>
        </p>

        <form onSubmit={HandleSubmit}>
          {/* Name */}
          <div className="form-group mb-3 position-relative">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              className="form-control ps-5"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group mb-3 position-relative">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              className="form-control ps-5"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group mb-3 position-relative">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control ps-5 pe-5"
              placeholder="Create a password"
              value={credentials.password}
              onChange={onChange}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Address */}
          <div className="form-group mb-3 position-relative">
            <FaHome className="input-icon" />
            <input
              type="text"
              name="Geolocation"
              className="form-control ps-5"
              placeholder="Enter your address"
              value={credentials.Geolocation}
              onChange={onChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-success w-100 mb-3"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Sign Up"}
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none fw-bold">
              Login
            </Link>
          </p>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Google sign-up */}
        <div className="text-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const response = await fetch(google_signup_url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    token: credentialResponse.credential,
                  }),
                });
                const result = await response.json();
                if (result.success) {
                  localStorage.setItem("UserEmail", result.email);
                  localStorage.setItem("authToken", result.authToken);
                  navigate("/");
                } else {
                  alert("Google sign-up failed");
                }
              } catch (error) {
                alert("Google sign-up error");
              }
            }}
            onError={() => alert("Google sign-up failed")}
          />
        </div>
      </div>
    </div>
  );
}
