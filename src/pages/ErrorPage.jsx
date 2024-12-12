import React, { useEffect } from "react";
import "./ErrorPage.css";

const ErrorPage = () => {
    useEffect(() => {
        const pixelContainer = document.querySelector(".pixel-container");
        const stack = []; // Keeps track of stacked pixels' heights

        const createPixel = () => {
            const pixel = document.createElement("div");
            pixel.className = "pixel";

            // Assign random properties using CSS variables
            const randomRotation = Math.random() * 360; // Random rotation in degrees
            const randomXShift = Math.random() * 100 - 50; // Horizontal shift (-50px to +50px)
            const randomDuration = 4 + Math.random() * 2; // Animation duration (4-6 seconds)

            // Set CSS variables for rotation and fall duration
            pixel.style.setProperty("--rotation", `${randomRotation}deg`);
            pixel.style.setProperty("--x-shift", `${randomXShift}px`);
            pixel.style.setProperty("--fall-duration", `${randomDuration}s`);

            // Randomize starting position
            pixel.style.left = `${Math.random() * 100}vw`;

            // Add pixel to the container
            pixelContainer.appendChild(pixel);

            // Handle pixel stacking after animation ends
            pixel.addEventListener("animationend", () => {
                // Stop the fall animation by removing it
                pixel.style.animation = "none"; 

                // Calculate the column the pixel lands in based on its X position
                const pixelWidth = pixel.offsetWidth;
                const pixelLeft = pixel.offsetLeft;

                // Find the column index based on the pixel's horizontal position
                const columnIndex = Math.floor(pixelLeft / pixelWidth);

                // Calculate the new stacking height for this column
                const stackHeight = stack[columnIndex] || 0;

                // Apply the smooth transition for stacking the pixel
                pixel.style.transition = `transform ${randomDuration}s ease-out`; // Use the fall duration for stacking
                pixel.style.transform = `translateY(calc(100vh - ${stackHeight + pixelWidth}px))`;

                // Update the stack height for the column
                stack[columnIndex] = stackHeight + pixelWidth;
            });
        };

        // Generate pixels every 500ms
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
