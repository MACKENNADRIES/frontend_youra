import React, { useEffect } from "react";
import "../styles.css"; // Updated styles for the home page
import "./HomePage.css";

function HomePage() {
    useEffect(() => {
        const canvas = document.getElementById("background-canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let time = 0;

        const drawFlowingWaves = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 3; i++) {
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, `rgba(222, 176, 255, 0.05)`); // Lower opacity
                gradient.addColorStop(0.5, `rgba(166, 118, 173, 0.3)`);
                gradient.addColorStop(1, `rgba(122, 87, 173, 0.7)`);

                ctx.fillStyle = gradient;

                const amplitude = 80 + i * 20;
                const frequency = 0.002 + i * 0.001;
                const yOffset = canvas.height / 3 + i * 60;

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

    const navigateToPage = (page) => {
        console.log(`Navigating to ${page}`); // Replace with actual navigation logic
    };

    return (
        <div className="home-page">
            {/* Background canvas */}
            <canvas id="background-canvas"></canvas>

            {/* Box container */}
            <div className="box-container">
                {["Page 1", "Page 2", "Page 3", "Page 4", "Page 5"].map((page, index) => (
                    <div key={index} className={`box box-${index + 1}`} onClick={() => navigateToPage(page)}>
                        <div className="box-content">
                            <h3>{page}</h3>
                            <img src={`/path-to-animation-${index + 1}.gif`} alt={`${page} animation`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
