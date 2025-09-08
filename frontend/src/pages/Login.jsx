import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // we'll add some extra CSS here
// import dotenv from 'dotenv'
// dotenv.config();
const vercel_login_url= process.env.REACT_APP_LOGIN;
const GoogleLogin_url="http://localhost:5000/api/sign-in/google";
const login_url = process.env.NODE_ENV === ('production' || 'development')?vercel_login_url:"http://localhost:5000/api/sign-in";


export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch((login_url ), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        alert("Enter valid credentials");
      } else {
        localStorage.setItem("UserEmail", credentials.email);
        localStorage.setItem("authToken", result.authToken);
        navigate("/");
      }
    } catch (error) {
      alert("Failed to fetch. Please check if the server is running.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4 fw-bold">Welcome Back 👋</h2>
        <p className="text-center text-muted mb-4">
          Login to continue to <strong>Tasty Track</strong>
        </p>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100 mb-3">
            Login
          </button>

          {/* Signup link */}
          <p className="text-center">
            New here?{" "}
            <Link to="/createUser" className="text-decoration-none fw-bold">
              Create an account
            </Link>
          </p>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Google login */}
        <div className="text-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const response = await fetch(GoogleLogin_url, {
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
                  alert("Google login failed");
                }
              } catch (error) {
                alert("Google login error");
              }
            }}
            onError={() => alert("Google login failed")}
          />
        </div>
      </div>
    </div>
  );
}
