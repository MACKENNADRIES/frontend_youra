import React, { useState, useEffect } from "react";
import "../styles.css"; // Ensure this includes your updated styles.
import "./Login.css";

function LoginPage() {
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
                body: JSON.stringify(formData),
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

    useEffect(() => {
        const canvas = document.getElementById("background-canvas");
        const ctx = canvas.getContext("2d");
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        let circlePositions = [0, 0.2, 0.4]; // Positions for three circles on each side
    
        function drawCurves() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            const lineData = [
                // Left side lines
                { startX: 50, startY: 0, cp1X: canvas.width / 4, cp1Y: canvas.height / 3, cp2X: canvas.width / 5, cp2Y: canvas.height / 1.5, endX: 0, endY: canvas.height },
                { startX: 100, startY: 0, cp1X: canvas.width / 3.5, cp1Y: canvas.height / 3.2, cp2X: canvas.width / 4, cp2Y: canvas.height / 1.3, endX: 0, endY: canvas.height },
                { startX: 150, startY: 0, cp1X: canvas.width / 3, cp1Y: canvas.height / 3.5, cp2X: canvas.width / 3, cp2Y: canvas.height / 1.2, endX: 0, endY: canvas.height },
    
                // Right side lines
                { startX: canvas.width - 50, startY: 0, cp1X: canvas.width * 0.75, cp1Y: canvas.height / 3, cp2X: canvas.width * 0.8, cp2Y: canvas.height / 1.5, endX: canvas.width, endY: canvas.height },
                { startX: canvas.width - 100, startY: 0, cp1X: canvas.width * 0.7, cp1Y: canvas.height / 3.2, cp2X: canvas.width * 0.75, cp2Y: canvas.height / 1.3, endX: canvas.width, endY: canvas.height },
                { startX: canvas.width - 150, startY: 0, cp1X: canvas.width * 0.65, cp1Y: canvas.height / 3.5, cp2X: canvas.width * 0.7, cp2Y: canvas.height / 1.2, endX: canvas.width, endY: canvas.height },
            ];
    
            lineData.forEach((line, index) => {
                drawDynamicBezierCurve(
                    ctx,
                    line.startX,
                    line.startY,
                    line.cp1X,
                    line.cp1Y,
                    line.cp2X,
                    line.cp2Y,
                    line.endX,
                    line.endY,
                    circlePositions[index % 3] // Three circles shared for left and right lines
                );
            });
        }
    
        function drawDynamicBezierCurve(ctx, startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, t) {
            // Create a gradient for the line
            const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
            gradient.addColorStop(0, "rgba(128, 0, 128, 1)"); // Purple
            gradient.addColorStop(t, "rgba(255, 20, 147, 1)"); // Pink
            gradient.addColorStop(1, "rgba(128, 0, 128, 1)"); // Purple
    
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
    
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
            ctx.stroke();
    
            drawGlowingCircle(ctx, startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, t);
        }
    
        function drawGlowingCircle(ctx, startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, t) {
            const x = calculateBezierPoint(t, startX, cp1X, cp2X, endX);
            const y = calculateBezierPoint(t, startY, cp1Y, cp2Y, endY);
    
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
            gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
            gradient.addColorStop(0.5, "rgba(255, 20, 147, 0.7)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = gradient;
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
        }
    
        function calculateBezierPoint(t, p0, p1, p2, p3) {
            return Math.pow(1 - t, 3) * p0 +
                3 * Math.pow(1 - t, 2) * t * p1 +
                3 * (1 - t) * Math.pow(t, 2) * p2 +
                Math.pow(t, 3) * p3;
        }
    
        function animate() {
            for (let i = 0; i < circlePositions.length; i++) {
                circlePositions[i] += 0.005 + i * 0.002; // Different speeds for each circle
                if (circlePositions[i] > 1) circlePositions[i] = 0; // Reset position
            }
    
            drawCurves();
            requestAnimationFrame(animate);
        }
    
        drawCurves();
        animate();
    
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawCurves();
        };
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    
    if (isLoggedIn) {
        return (
            <div className="auth-container">
                <h1>Welcome, {formData.username || "User"}!</h1>
            </div>
        );
    }

    return (
        <div className="login-page">
            {/* Background Canvas */}
            <canvas id="background-canvas"></canvas>

            {/* Animated Logo */}
            <div className="logo">
                <img src="src/assets/starslogo.png" alt="Logo Stars" className="logo-stars" />
                <img src="src/assets/outerlogo.png" alt="Logo Outer Ring" className="logo-outer" />
                <img src="src/assets/innerlogo.png" alt="Logo Inner Ring" className="logo-inner" />
            </div>

            {/* Login/Register Form */}
            <div className="auth-form">
                <h2>{isRegistering ? "Register" : "Login"}</h2>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                {!isRegistering ? (
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
        </div>
    );
}

export default LoginPage;
