import React, { useState } from "react";
import "../styles.css";

function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const url = `${import.meta.env.VITE_API_URL}/users/`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        // Simulated login
        if (formData.email === "user@example.com" && formData.password === "password123") {
            setSuccessMessage("Logged in successfully!");
            setIsLoggedIn(true);
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
                body: JSON.stringify({
                    ...formData,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(`User ${data.username} created successfully!`);
                setIsLoggedIn(true);
            } else {
                const errorData = await response.json();
                setError(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    if (isLoggedIn) {
        return (
            <div>
                <h1>Welcome, {formData.username || "User"}!</h1>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <h2>{isRegistering ? "Register" : "Login"}</h2>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            {!isRegistering ? (
                // Login Form
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <button type="button" onClick={() => setIsRegistering(true)}>
                        Register
                    </button>
                </form>
            ) : (
                // Register Form
                <form onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="first_name">First Name:</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name:</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Register Now</button>
                    <button type="button" onClick={() => setIsRegistering(false)}>
                        Remembered my login
                    </button>
                </form>
            )}
        </div>
    );
}

export default HomePage;
