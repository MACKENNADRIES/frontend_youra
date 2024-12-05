import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../components/PixelCanvas";

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

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (formData.email === "user@example.com" && formData.password === "password123") {
      setSuccessMessage("Logged in successfully!");
      navigate("/home");
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (formData.username && formData.email && formData.password) {
      setSuccessMessage("Account created successfully!");
      setIsRegistering(false);
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
