import React, { useEffect, useRef, useState } from "react";
import "./AboutPage.css";

const AboutPage = () => {
    const runnerRef = useRef(null); // Reference for the runner
    const featuredRef = useRef(null); // Reference for the featured section
    const [runnerPosition, setRunnerPosition] = useState(0); // State for runner's position
    const [isFacingRight, setIsFacingRight] = useState(true); // State to track direction
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

  useEffect(() => {
    const starContainer = document.querySelector(".stars");
    const numberOfStars = 50;

    // Create stars
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.width = `${Math.random() * 3 + 1}px`; // Random size between 1px and 3px
      star.style.height = star.style.width; // Make it circular
      star.style.top = `${Math.random() * 100}%`; // Random position vertically
      star.style.left = `${Math.random() * 100}%`; // Random position horizontally
      star.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random animation duration
      starContainer.appendChild(star);
    }
  }, []);

  useEffect(() => {
    // Set the initial runner image
    const runner = runnerRef.current;
    if (runner) {
      runner.style.backgroundImage = `url(${runnerImages[frameIndex]})`;
    }
  }, [frameIndex, runnerImages]);

  // Function to handle runner movement
  const moveRunner = (direction) => {
    const runner = runnerRef.current;
    const featuredSection = featuredRef.current;

    // Get the width of the featured section
    const sectionWidth = featuredSection.offsetWidth;

    // Immediately flip the runner if direction changes
    if ((direction === "right" && !isFacingRight) || (direction === "left" && isFacingRight)) {
      setIsFacingRight(direction === "right");
      const scaleX = direction === "right" ? 1 : -1;
      runner.style.transform += ` scaleX(${scaleX})`; // Update scaleX
    }

    // Update the runner's position
    setRunnerPosition((prevPosition) => {
      let newPosition = prevPosition + (direction === "right" ? 20 : -20);

      // Clamp the position to stay within the bounds of the section
      newPosition = Math.max(0, Math.min(newPosition, sectionWidth - 60)); // 60 = runner width

      // Update the horizontal movement (translateX)
      const transform = `translateX(${newPosition}px) scaleX(${isFacingRight ? 1 : -1})`;
      runner.style.transform = transform;

      // Update the runner image frame to simulate running animation
      setFrameIndex((prevFrameIndex) => (prevFrameIndex + 1) % runnerImages.length);

      return newPosition;
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
        <div className="stars"></div>
        <h3>Featured Section</h3>
        <p>This long rectangle showcases important information or a feature highlight.</p>
        {/* Runner animation */}
        <div ref={runnerRef} className="runner"></div>
      </section>

      {/* Controls below the featured section */}
      <div className="runner-controls">
        <button onClick={() => moveRunner("left")} className="control-button">
          ← Move Left
        </button>
        <button onClick={() => moveRunner("right")} className="control-button">
          Move Right →
        </button>
      </div>

      {/* Grid layout */}
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
