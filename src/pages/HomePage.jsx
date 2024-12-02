import React, { useState, useEffect } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // Update `isMobile` on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [buttons] = useState([
    {
      id: 1,
      label: "Start a RAK",
      gridPosition: "2 / 1 / span 2 / span 2",
      isCompass: true, // Indicate this is a compass item
    },
    { id: 2, label: "Claim a RAK", image: "/images/claim-rak.png", gridPosition: "2 / 3" },
    { id: 3, label: "My Aura", image: "/images/my-aura.png", gridPosition: "2 / 4" },
    { id: 4, label: "Pay It Forward", image: "/images/pay-forward.png", gridPosition: "3 / 3" },
    { id: 5, label: "Leaderboard", image: "/images/leaderboard.png", gridPosition: "3 / 4" },
    { id: 6, label: "Explore", image: "/images/explore.png", gridPosition: "4 / 1 / span 1 / span 4" },
  ]);

  const handleClick = (e, id) => {
    const ripple = document.createElement("div");
    ripple.className = "animation";
    e.target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    console.log(`Button ${id} clicked!`);
  };

  return (
    <div className="homepage-grid">
      {buttons.map((button) => (
        <div
          key={button.id}
          className="button"
          style={!isMobile ? { gridArea: button.gridPosition } : undefined}
          onClick={(e) => handleClick(e, button.id)}
        >
          {button.isCompass ? (
            <div className="compass">
              <img src="src/assets/compass-base.png" alt="Compass Base" className="compass-base" />
              <img src="src/assets/compass-top.png" alt="Compass Top" className="compass-top" />
            </div>
          ) : (
            <>
              <img src={button.image} alt={button.label} />
              <p>{button.label}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
