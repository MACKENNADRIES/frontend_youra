import React, { useEffect, useRef, useState } from "react";
import "./AboutPage.css";


const AboutPage = () => {
  const runnerRef = useRef(null); // Reference for the runner
  const featuredRef = useRef(null); // Reference for the featured section
  const [runnerPosition, setRunnerPosition] = useState(0); // State for runner's position
  const [isFacingRight, setIsFacingRight] = useState(true); // State to track direction
  const [activeWaypoint, setActiveWaypoint] = useState(null); // Currently active waypoint

  const [isAuraOpen, setIsAuraOpen] = useState(false);

const toggleAuraLevels = () => {
  setIsAuraOpen(!isAuraOpen);
};

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
      position: 50, 
      content: "Welcome to YOURA", 
      effect: "pop", 
      image: "src/assets/pixelLogo.png" // Replace with the actual path to your image
    },
    { 
      position: 150, 
      content: "Create a Random Act of Kindness", 
      effect: "pop", 
      image: "src/assets/createrak.png" 
    },
    { 
      position: 250, 
      content: "Offer kindness to someone in need", 
      effect: "pop", 
      image: "src/assets/offer.png"
    },
    { 
      position: 300, 
      content: "Request kindness when you need help", 
      effect: "pop", 
      image: "src/assets/speechbubble.png" 
    },
    { 
      position: 400, 
      content: "Track claims and progress", 
      effect: "pop", 
      image: "src/assets/stat-icon.png" 
    },
    { 
      position: 500, 
      content: "Earn points!", 
      effect: "glow", 
      image: "src/assets/leaderboard.png" 
    },
    { 
      position: 750, 
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
      </header>

      <section className="about-content">
        <div className="about-text">
          <p>
            Our mission is to make the world a better place through small acts
            of kindness. We believe that every little bit counts and that helping
            each other can create a ripple effect of positivity.
<br></br>
<br></br>
            Want to learn about the YOURA journey? Explore below...
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
          <h3>How can you make a difference with YOURA?</h3>
          <p>Imagine a world where kindness spreads like ripples in a pond—one small act creating waves of positivity that touch countless lives. <br></br> <br></br> That’s the power of a Random Act of Kindness (RAK). Whether it's offering a helping hand, sharing an encouraging word, or simply listening to someone in need, these small, selfless actions have the potential to spark something extraordinary.

But kindness doesn’t just transform the world around you—it transforms you. Each act of kindness adds a little glow to your Aura, a representation of your positivity, empathy, and impact on others. <br></br> <br></br>As you embark on your kindness journey, your Aura grows brighter and more powerful with every compassionate action. It’s not just about what you give; it’s about how you inspire, heal, and connect with others.

With YOURA, your Aura becomes a visual story of your kindness. </p>
      <section className="aura-levels">
  <div className="aura-header">
    <button className="aura-toggle" onClick={toggleAuraLevels}>
      {isAuraOpen ? "Hide Aura Levels" : "Explore Aura Levels"}
    </button>
  </div>
  {isAuraOpen && (
    <ul className="aura-list">
      {[
        {
          level: 1,
          name: "Initiator",
          points: "0 - 100",
          description: "The beginning of your kindness journey.",
          image: "src/assets/initiator.png",
        },
        {
          level: 2,
          name: "Sustainer",
          points: "101 - 200",
          description: "You maintain positive energy and kindness.",
          image: "src/assets/sustainer.png",
        },
        {
          level: 3,
          name: "Visionary",
          points: "201 - 300",
          description: "You inspire others with your forward-thinking acts.",
          image: "src/assets/visionary.png",
        },
        {
          level: 4,
          name: "Creator",
          points: "301 - 400",
          description: "You actively create opportunities for kindness.",
          image: "src/assets/creator.png",
        },
        {
          level: 5,
          name: "Innovator",
          points: "401 - 500",
          description: "You bring new ideas to promote kindness.",
          image: "src/assets/Innovator.png",
        },
        {
          level: 6,
          name: "Accelerator",
          points: "501 - 600",
          description: "You accelerate positivity in your community.",
          image: "src/assets/accelerator.png",
        },
        {
          level: 7,
          name: "Transformer",
          points: "601 - 700",
          description: "You transform the lives of those around you.",
          image: "src/assets/transformer.png",
        },
        {
          level: 8,
          name: "Healer",
          points: "701 - 800",
          description: "You bring peace and healing to others.",
          image: "src/assets/healer.png",
        },
        {
          level: 9,
          name: "Orchestrator",
          points: "801 - 900",
          description: "You lead efforts to spread kindness.",
          image: "src/assets/orchestrator.png",
        },
        {
          level: 10,
          name: "Harmoniser",
          points: "901 - 1000",
          description: "You bring balance and harmony to the world.",
          image: "src/assets/harmoniser.png",
        },
      ].map((level) => (
        <li key={level.level} className="aura-item">
          <img
            src={level.image}
            alt={`Level ${level.level} - ${level.name}`}
            className="aura-image"
          />
          <div className="aura-info">
            <h4>Level {level.level}: {level.name}</h4>
            <p>{level.description}</p>
            <p className="aura-points">Points: {level.points}</p>
          </div>
        </li>
      ))}
    </ul>
  )}
</section>
</div>

</section>



    </div>
  );
};

export default AboutPage;
