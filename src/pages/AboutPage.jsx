import React, { useEffect, useRef, useState } from "react";
import "./AboutPage.css";


const AboutPage = () => {
  const runnerRef = useRef(null); // Reference for the runner
  const featuredRef = useRef(null); // Reference for the featured section
  const [runnerPosition, setRunnerPosition] = useState(0); // State for runner's position
  const [isFacingRight, setIsFacingRight] = useState(true); // State to track direction
  const [revealedWaypoints, setRevealedWaypoints] = useState([]); // Store revealed waypoints

  const [isAuraOpen, setIsAuraOpen] = useState(false);

const toggleAuraLevels = () => {
  setIsAuraOpen(!isAuraOpen);
};

  const runnerImages = [
    "/assets/run1.png",
    "/assets/run2.png",
    "/assets/run3.png",
    "/assets/run2.png",
    "/assets/run1.png",
    "/assets/run2.png",
    "/assets/run3.png",
  ];
  const [frameIndex, setFrameIndex] = useState(0); // Track current image frame

  // Waypoints configuration
  const waypoints = [
    { 
      position: 90, 
      content: "Create Random Acts of Kindness", 
      effect: "pop", 
      image: "/assets/createrak.png" 
    },
    { 
      position: 280, 
      content: "Offer kindness to somoene in need", 
      effect: "pop", 
      image: "/assets/offer.png"
    },
    { 
      position: 480, 
      content: "Request kindness when you need help", 
      effect: "pop", 
      image: "/assets/speechbubble.png" 
    },
    { 
      position: 690, 
      content: "Track claims and progress", 
      effect: "pop", 
      image: "/assets/stat-icon.png" 
    },
    { 
      position: 840, 
      content: "Earn points!", 
      effect: "glow", 
      image: "/assets/leaderboard.png" 
    },
    { 
      position: 980, 
      content: "Grow your aura", 
      effect: "glow", 
      image: "/assets/Harmoniser.png" 
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
// Add Arrow Key Navigation
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      moveRunner("left");
    } else if (e.key === "ArrowRight") {
      moveRunner("right");
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []); // Empty dependency array ensures this runs only once

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
          !revealedWaypoints.some((wp) => wp.position === waypoint.position) // Avoid retriggering
      );
  
      if (currentWaypoint) {
        setRevealedWaypoints((prevWaypoints) => [...prevWaypoints, currentWaypoint]); // Add waypoint to revealed list
      }
  
      return clampedPosition;
    });
  };

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About</h1>
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
    <img src="/assets/jumpplatform.png" alt="platform 1" className="bg-image bg1" />
    <img src="/assets/jumpplatform.png" alt="platform 2" className="bg-image bg2" />
    <img src="/assets/jumpplatform.png" alt="platform 3" className="bg-image bg3" />
  </div>
        <div className="stars"></div>

{/* Render Revealed Waypoints */}
{revealedWaypoints.map((waypoint) => (
  <div
    key={waypoint.position}
    className={`waypoint-popup ${waypoint.effect || ""}`}
    style={{
      left: `${waypoint.position}px`, // Fixed at its trigger position
      transform: "translateX(-50%)",
    }}
  >
    <p>{waypoint.content}</p>
    <img src={waypoint.image} alt={waypoint.content} />
  </div>
))}


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
          image: "/assets/initiator.png",
        },
        {
          level: 2,
          name: "Sustainer",
          points: "101 - 200",
          description: "You maintain positive energy and kindness.",
          image: "/assets/sustainer.png",
        },
        {
          level: 3,
          name: "Visionary",
          points: "201 - 300",
          description: "You inspire others with your forward-thinking acts.",
          image: "/assets/visionary.png",
        },
        {
          level: 4,
          name: "Creator",
          points: "301 - 400",
          description: "You actively create opportunities for kindness.",
          image: "/assets/creator.png",
        },
        {
          level: 5,
          name: "Innovator",
          points: "401 - 500",
          description: "You bring new ideas to promote kindness.",
          image: "/assets/innovator.png",
        },
        {
          level: 6,
          name: "Accelerator",
          points: "501 - 600",
          description: "You accelerate positivity in your community.",
          image: "/assets/accelerator.png",
        },
        {
          level: 7,
          name: "Transformer",
          points: "601 - 700",
          description: "You transform the lives of those around you.",
          image: "/assets/transformer.png",
        },
        {
          level: 8,
          name: "Healer",
          points: "701 - 800",
          description: "You bring peace and healing to others.",
          image: "/assets/healer.png",
        },
        {
          level: 9,
          name: "Orchestrator",
          points: "801 - 900",
          description: "You lead efforts to spread kindness.",
          image: "/assets/orchestrator.png",
        },
        {
          level: 10,
          name: "Harmoniser",
          points: "901 - 1000",
          description: "You bring balance and harmony to the world.",
          image: "/assets/harmoniser.png",
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
