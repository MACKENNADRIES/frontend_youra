import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const buttons = [
    {
      id: 1,
      label: "Start a RAK",
      gridPosition: "2 / 1 / span 2 / span 2",
      isCompass: true,
      link: "/rak/all-raks",
      content: (
        <div className="compass">
          <img
            src="src/assets/compass-base.png"
            alt="Compass Base"
            className="compass-base"
          />
          <img
            src="src/assets/compass-top.png"
            alt="Compass Top"
            className="compass-top"
          />
          <h2 className="button-heading">DISCOVER</h2>
          <p className="button-description">
            Curious about the kindness around you? Explore Random Acts of
            Kindness happening in your community...
          </p>
        </div>
      ),
    },
    {
      id: 2,
      label: "Claim a RAK",
      gridPosition: "2 / 3",
      content: (
        <>
          <h2 className="button-heading">REQUEST</h2>
          <div className="lotus-container">
            <img
              src="src/assets/lotus-top.png"
              alt="Lotus Top"
              className="lotus-top"
            />
            <img
              src="src/assets/lotus-bottom1.png"
              alt="Lotus Bottom 1"
              className="lotus-bottom1"
            />
            <img
              src="src/assets/lotus-bottom2.png"
              alt="Lotus Bottom 2"
              className="lotus-bottom2"
            />
            <p className="button-description">
              Do you need a Random Act of Kindness?
            </p>
          </div>
        </>
      ),
    },
    {
      id: 3,
      label: "My Aura",
      gridPosition: "2 / 4",
      link: "/create-rak",
      content: (
        <div className="hands-container">
          <img
            src="src/assets/hands-outer.png"
            alt="Hands Outer"
            className="hands-outer"
          />
          <img
            src="src/assets/hands-inner.png"
            alt="Hands Inner"
            className="hands-inner"
          />
          <p className="button-description">
            Give someone a Random Act of Kindness
          </p>
        </div>
      ),
    },
    {
      id: 4,
      label: "Pay It Forward",
      gridPosition: "3 / 3",
      content: (
        <div className="crown-container">
          <img
            src="src/assets/crown-top.png"
            alt="Crown Top"
            className="crown-top"
          />
          <img
            src="src/assets/crown-bottom.png"
            alt="Crown Bottom"
            className="crown-bottom"
          />
          <p className="button-description">Whose aura is growing</p>
        </div>
      ),
    },
    {
      id: 5,
      label: "Leaderboard",
      gridPosition: "3 / 4",
      content: (
        <Link to="/leaderboard" className="button">
          <div className="profile-container">
            <img
              src="src/assets/profile-outer.png"
              alt="Profile Outer"
              className="profile-outer"
            />
            <img
              src="src/assets/profile-inner.png"
              alt="Profile Inner"
              className="profile-inner"
            />
            <p className="button-description">Explore your aura</p>
          </div>
        </Link>
      ),
    },    
    {
      id: 6,
      label: "Explore",
      gridPosition: "4 / 1 / span 1 / span 4",
      content: (
        <div className="logo">
          <img
            src="src/assets/starslogo.png"
            alt="Logo Stars"
            className="logo-stars"
          />
          <img
            src="src/assets/outerlogo.png"
            alt="Logo Outer"
            className="logo-outer"
          />
          <img
            src="src/assets/innerlogo.png"
            alt="Logo Inner"
            className="logo-inner"
          />
        </div>
      ),
    },
  ];

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
      {buttons.map((button) =>
        button.link ? (
          <Link
            key={button.id}
            to={button.link}
            className="button"
            id={`button-${button.id}`}
            style={!isMobile ? { gridArea: button.gridPosition } : undefined}
          >
            {button.content}
          </Link>
        ) : (
          <div
            key={button.id}
            className="button"
            id={`button-${button.id}`}
            style={!isMobile ? { gridArea: button.gridPosition } : undefined}
            onClick={(e) => handleClick(e, button.id)}
          >
            {button.content}
          </div>
        )
      )}
    </div>
  );
};

export default HomePage;
