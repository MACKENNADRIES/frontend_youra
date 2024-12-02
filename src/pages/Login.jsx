import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles.css"; // Ensure this includes your updated styles
import "./Login.css";

function LoginPage() {
    const navigate = useNavigate(); // Initialize navigation
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
                setIsLoggedIn(true);
                navigate("/home"); // Redirect to HomePage after registration
            } else {
                const errorData = await response.json();
                setError(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    useEffect(() => {
        const canvas = document.getElementById("background-canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let time = 0;

        const drawFlowingWaves = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the first three waves
            for (let i = 0; i < 3; i++) {
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, `rgba(222, 176, 255, 0.12)`);
                gradient.addColorStop(0.5, `rgba(166, 118, 173, 0.5)`);
                gradient.addColorStop(1, `rgba(122, 87, 173, 1)`);

                ctx.fillStyle = gradient;

                const amplitude = 100 + i * 20;
                const frequency = 0.0025 + i * 0.001;
                const yOffset = canvas.height / 3 + i * 70;

                ctx.beginPath();
                for (let x = 0; x <= canvas.width; x++) {
                    const y =
                        yOffset +
                        amplitude * Math.sin(frequency * x + time * (0.5 + i * 0.1));
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                ctx.fill();
            }

            // Draw the fourth wave
            const fourthWaveHeight = canvas.height * 0.5;
            ctx.fillStyle = `rgba(222, 176, 255, 0.9)`;
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x++) {
                const y =
                    fourthWaveHeight +
                    60 * Math.sin(0.003 * x + time * 0.3);
                ctx.lineTo(x, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();

            const fifthWaveHeight = canvas.height * 0.45;
            const radialGradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.min(canvas.width, canvas.height)
            );
            
            // Adjusting alpha values for transparency
            radialGradient.addColorStop(0, "rgba(222, 176, 255, 0.2)"); // Light purple, 30% opaque
            radialGradient.addColorStop(0.5, "rgba(122, 87, 173, 0.7)"); // Medium purple, 20% opaque
            radialGradient.addColorStop(0.8, "rgba(46, 39, 111, 0.8)");  // Darker purple, 20% opaque
            radialGradient.addColorStop(1, "rgba(14, 0, 13, 0.9)");      // Very dark purple, 10% opaque
            
            ctx.fillStyle = radialGradient;
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x++) {
                const y =
                    fifthWaveHeight +
                    80 * Math.sin(0.002 * x + time * 0.4);
                ctx.lineTo(x, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();
            

            time += 0.01;
            requestAnimationFrame(drawFlowingWaves);
        };

        drawFlowingWaves();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="login-page">
            <canvas id="background-canvas"></canvas>

            <div className="login-box">
                <div className="logo">
                    <img src="src/assets/starslogo.png" alt="Logo Stars" className="logo-stars" />
                    <img src="src/assets/outerlogo.png" alt="Logo Outer Ring" className="logo-outer" />
                    <img src="src/assets/innerlogo.png" alt="Logo Inner Ring" className="logo-inner" />
                </div>

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

