import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../components/PixelCanvas";
const API_URL = import.meta.env.VITE_API_URL; 


const LoginPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
            username: formData.username, // Ensure the username field is used
            password: formData.password,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
  
          // Update your auth state here
          setAuthToken(data.token); // Save the token in a state (e.g., React Context or global state)
          setUser({
            userId: data.user_id,
            username: data.username,
          }); // Save user information if needed
  
          setSuccessMessage("Logged in successfully!");
          navigate("/home"); // Redirect to home or dashboard
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
          setIsRegistering(false);
          console.log("User registered:", data); // Optional: Log the response
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
          <img src="src/assets/starslogo.png" alt="Logo Stars" className="logo-stars" />
          <img src="src/assets/outerlogo.png" alt="Logo Outer Ring" className="logo-outer" />
          <img src="src/assets/innerlogo.png" alt="Logo Inner Ring" className="logo-inner" />
        </div>
        <div className="auth-form">
          <h2>{isRegistering ? "Register" : "YOURA"}</h2>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
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
