import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDrawWaves } from "../hooks/drawingWaves"; // Import the custom hook
import "../styles.css"; // Ensure this includes your updated styles
import "./Login.css";

function LoginPage() {
    const navigate = useNavigate(); // Initialize navigation
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const url = `${import.meta.env.VITE_API_URL}/users/`;

    // Use the wave animation hook
    useDrawWaves("background-canvas");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (formData.email === "user@example.com" && formData.password === "password123") {
            setSuccessMessage("Logged in successfully!");
            navigate("/home"); // Redirect to home page
        } else {
            setError("Invalid email or password.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(`User ${data.username} created successfully!`);
                navigate("/home"); // Redirect to HomePage after registration
            } else {
                const errorData = await response.json();
                setError(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="login-page">
            {/* Background Canvas */}
            <canvas id="background-canvas"></canvas>

            <div className="login-box">
                {/* Logo Section */}
                <div className="logo">
                    <img src="src/assets/starslogo.png" alt="Logo Stars" className="logo-stars" />
                    <img src="src/assets/outerlogo.png" alt="Logo Outer Ring" className="logo-outer" />
                    <img src="src/assets/innerlogo.png" alt="Logo Inner Ring" className="logo-inner" />
                </div>

                {/* Authentication Form */}
                <div className="auth-form">
                    <h2>YOURA</h2>
                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}

                    <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                        {isRegistering && (
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                required
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
                        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                            {isRegistering ? "Back to Login" : "Create Account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
