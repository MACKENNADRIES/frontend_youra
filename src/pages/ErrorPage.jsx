import React, { useEffect } from "react";
import "./ErrorPage.css";

const ErrorPage = () => {
    useEffect(() => {
        const pixelContainer = document.querySelector(".pixel-container");
    
        const createPixel = () => {
            const pixel = document.createElement("div");
            pixel.className = "pixel";
    
            // Randomize starting position
            pixel.style.left = `${Math.random() * 100}vw`;
    
            pixelContainer.appendChild(pixel);
    
            // Stop animation and make the pixel "settle" after it finishes
            pixel.addEventListener("animationend", () => {
                pixel.style.animation = "none"; // Stop further animation
                pixel.style.transform = "translateY(calc(100vh - 10px))"; // Settle at bottom
            });
        };
    
        // Generate pixels every 500ms (adjustable for more or fewer pixels)
        const interval = setInterval(createPixel, 500);
    
        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
    

    return (
        <div className="error-page">
            <div className="error-content">
                <h1 className="game-over">Game Over</h1>
                <h2 className="error-code">404 Not Found</h2>
                <p className="error-message">
                    This isn’t the plane you were seeking—your aura awaits elsewhere.
                </p>
                <button className="home-button" onClick={() => (window.location.href = "/home")}>
                    Find it
                </button>
                <div className="pixel-container"></div>
            </div>
        </div>
    );
};

export default ErrorPage;
