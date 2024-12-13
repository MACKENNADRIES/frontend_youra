import React, { useEffect, useRef, useState } from "react";
import "./AboutPage.css";


const AboutPage = () => {
  const runnerRef = useRef(null); // Reference for the runner
  const featuredRef = useRef(null); // Reference for the featured section
  const [runnerPosition, setRunnerPosition] = useState(0); // State for runner's position
  const [isFacingRight, setIsFacingRight] = useState(true); // State to track direction
  const [activeWaypoint, setActiveWaypoint] = useState(null); // Currently active waypoint

  const runnerImages = [
    "src/assets/run1.png",
    "src/assets/run2.png",
    "src/assets/run3.png",
    "src/assets/run2.png",
    "src/assets/run1.png",
    "src/assets/run2.png",
    "src/assets/run3.png",
  ];
  const [frameIndex, setFrameIndex] = useState(0); // Track current image frame

  // Waypoints configuration
  const waypoints = [
    { 
      position: 100, 
      content: "Welcome to YOURA", 
      effect: "pop", 
      image: "src/assets/pixelLogo.png" // Replace with the actual path to your image
    },
    { 
      position: 250, 
      content: "Create a Random Act of Kindness", 
      effect: "pop", 
      image: "src/assets/createrak.png" 
    },
    { 
      position: 300, 
      content: "Offer kindness to someone in need", 
      effect: "pop", 
      image: "src/assets/offer.png"
    },
    { 
      position: 450, 
      content: "Request kindness when you need help", 
      effect: "pop", 
      image: "src/assets/speechbubble.png" 
    },
    { 
      position: 550, 
      content: "Track claims and progress", 
      effect: "pop", 
      image: "src/assets/stat-icon.png" 
    },
    { 
      position: 700, 
      content: "Earn points!", 
      effect: "glow", 
      image: "src/assets/leaderboard.png" 
    },
    { 
      position: 900, 
      content: "Spread kindness and grow your aura", 
      effect: "glow", 
      image: "src/assets/harmoniser.png" 
    },
  ];
  
  // Add stars in the background
  useEffect(() => {
    const starContainer = document.querySelector(".stars");
    const numberOfStars = 50;

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;
      starContainer.appendChild(star);
    }
  }, []);

  // Update runner image frame
  useEffect(() => {
    const runner = runnerRef.current;
    if (runner) {
      runner.style.backgroundImage = `url(${runnerImages[frameIndex]})`;
    }
  }, [frameIndex, runnerImages]);

  const moveRunner = (direction) => {
    const runner = runnerRef.current;
    const featureBounds = featuredRef.current.getBoundingClientRect(); // Get feature box bounds
    const featureLeft = featureBounds.left;
    const featureRight = featureBounds.right;

    setRunnerPosition((prevPosition) => {
      const step = direction === "right" ? 20 : -20;
      let newPosition = prevPosition + step;

      // Clamp the runner position within the feature box
      const clampedPosition = Math.max(
        featureLeft,
        Math.min(featureRight - 60, newPosition) // 60 = runner width
      );

      // Update runner's position and direction
      runner.style.transform = `translateX(${clampedPosition - featureLeft}px) scaleX(${direction === "right" ? 1 : -1})`;
      setIsFacingRight(direction === "right");

      // Update frame index for running animation
      setFrameIndex((prevFrameIndex) => (prevFrameIndex + 1) % runnerImages.length);

      // Trigger waypoint visibility
      const currentWaypoint = waypoints.find(
        (waypoint) =>
          Math.abs(clampedPosition - (featureLeft + waypoint.position)) < 20 && // Trigger waypoint within range
          (!activeWaypoint || activeWaypoint.position !== waypoint.position) // Avoid retriggering
      );

      if (currentWaypoint) {
        setActiveWaypoint(currentWaypoint);

        // Remove the waypoint after 5 seconds
        setTimeout(() => {
          setActiveWaypoint(null);
        }, 5000);
      }

      return clampedPosition;
    });
  };

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Learn more about our app and what we do.</p>
      </header>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make the world a better place through small acts
            of kindness. We believe that every little bit counts and that helping
            each other can create a ripple effect of positivity.
          </p>
        </div>
      </section>

      {/* Long rectangle section */}
      <section ref={featuredRef} className="long-rectangle">
      <div className="background-images">
    <img src="src/assets/jumpplatform.png" alt="platform 1" className="bg-image bg1" />
    <img src="/src/assets/jumpplatform.png" alt="platform 2" className="bg-image bg2" />
    <img src="src/assets/jumpplatform.png" alt="platform 3" className="bg-image bg3" />
  </div>
        <div className="stars"></div>

        {/* Render Active Waypoint */}
        {activeWaypoint && (
          <div
            className={`waypoint-popup ${activeWaypoint.effect || ""}`}
            style={{
              left: `${activeWaypoint.position}px`, // Fixed at its trigger position
              transform: "translateX(-50%)",
            }}
          >
            <p>{activeWaypoint.content}</p>
            <img src={activeWaypoint.image} alt={activeWaypoint.content} />
          </div>
        )}

        {/* Runner animation */}
        <div ref={runnerRef} className="runner"></div>
      </section>

      {/* Controls below the featured section */}
      <div className="runner-controls">
        <button
          onMouseDown={() => moveRunner("left")}
          className="control-button"
        >
          ← Move Left
        </button>
        <button
          onMouseDown={() => moveRunner("right")}
          className="control-button"
        >
          Move Right →
        </button>
      </div>

      <section className="additional-grid">
        <div className="grid-item large">
          <h3>Big Grid Item</h3>
          <p>This item spans multiple rows and columns.</p>
        </div>
        <div className="grid-item">
          <h3>Square Item</h3>
          <p>Small square grid item.</p>
        </div>
        <div className="grid-item">
          <h3>Long Item</h3>
          <p>This item spans across more columns.</p>
        </div>
        <div className="grid-item">
          <h3>Another Square</h3>
          <p>Another small square grid item.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
