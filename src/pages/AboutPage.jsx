import React, { useEffect, useRef } from "react";
import "./AboutPage.css";

const AboutPage = () => {
  const runnerRef = useRef(null); // Reference for the runner

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

    const featuredSection = document.querySelector(".long-rectangle");
    const runner = runnerRef.current;
    const runnerImages = [
      "src/assets/run1.png",
      "src/assets/run2.png",
      "src/assets/run3.png",
      "src/assets/run2.png",
      "src/assets/run1.png",
    ];
    let frameIndex = 0;

    const updateRunnerAnimation = () => {
      if (runner) {
        runner.style.backgroundImage = `url(${runnerImages[frameIndex]})`;
        frameIndex = (frameIndex + 1) % runnerImages.length; // Loop through images
      }
    };

    const runnerInterval = setInterval(updateRunnerAnimation, 150); // Switch every 150ms

    const handleScroll = () => {
      const rect = featuredSection.getBoundingClientRect();
      const runnerWidth = runner.offsetWidth;

      // Calculate how far the runner should move based on scroll
      const scrollProgress = Math.min(
        Math.max(0, window.scrollY - rect.top + window.innerHeight / 2),
        rect.height
      );

      // Move the runner proportionally along the bottom of the featured section
      runner.style.transform = `translateX(${
        (scrollProgress / rect.height) * (featuredSection.offsetWidth - runnerWidth)
      }px)`;

      // Pause the animation when scrolling stops
      if (scrollProgress >= 0 && scrollProgress < rect.height) {
        runner.style.animationPlayState = "running";
      } else {
        runner.style.animationPlayState = "paused";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(runnerInterval); // Clear interval on unmount
    };
  }, []); // Empty dependency array ensures this runs once after the initial render

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
      <section className="long-rectangle">
        <div className="stars"></div>
        <h3>Featured Section</h3>
        <p>
          This long rectangle showcases important information or a feature highlight.
        </p>
        {/* Runner animation */}
        <div ref={runnerRef} className="runner"></div>
      </section>

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
