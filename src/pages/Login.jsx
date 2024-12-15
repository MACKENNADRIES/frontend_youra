import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../components/PixelCanvas";
import { useAuth } from "../components/AuthContext";

const API_URL = import.meta.env.VITE_API_URL; // Base API URL from environment variables

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login function from AuthContext
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (formData.username && formData.password) {
      try {
        const response = await fetch(`${API_URL}/token-auth/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          login(data.token, { userId: data.user_id, username: data.username }); // Use AuthContext login function
          setSuccessMessage("Logged in successfully!");
          navigate("/home"); // Redirect to the home page
        } else {
          const errorData = await response.json();
          setError(
            errorData.non_field_errors
              ? errorData.non_field_errors[0]
              : "Invalid username or password."
          );
        }
      } catch (error) {
        setError("Network error: Unable to login. Please try again later.");
        console.error("Login error:", error);
      }
    } else {
      setError("Please enter both username and password.");
    }
  };

  // Handle registration (unchanged)
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (formData.username && formData.email && formData.password) {
      try {
        const response = await fetch(`${API_URL}/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSuccessMessage("Account created successfully!");
          setIsRegistering(false); // Switch back to login view
          console.log("User registered:", data);
        } else {
          const errorData = await response.json();
          setError(
            errorData.detail || "An error occurred while creating the account."
          );
        }
      } catch (error) {
        setError("Network error: Unable to register. Please try again later.");
        console.error("Registration error:", error);
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="logo">
          <img
            src="/assets/starslogo.png"
            alt="Logo Stars"
            className="logo-stars"
          />
          <img
            src="/assets/outerlogo.png"
            alt="Logo Outer Ring"
            className="logo-outer"
          />
          <img
            src="/assets/innerlogo.png"
            alt="Logo Inner Ring"
            className="logo-inner"
          />
        </div>
        <div className="auth-form">
          <h2>{isRegistering ? "Register" : "YOURA"}</h2>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {isRegistering && (
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">{isRegistering ? "Register" : "Login"}</button>
          </form>
          <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Back to Login" : "Create Account"}
          </button>
        </div>
      </div>
      <pixel-canvas
        data-gap="20"
        data-speed="15"
        data-colors="#6a0dad, #ff4500, #ffd700, #87ceeb"
      ></pixel-canvas>
    </div>
  );
};

export default LoginPage;
