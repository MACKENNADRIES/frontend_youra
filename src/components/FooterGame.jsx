import React, { useEffect } from 'react'; // Import useEffect
import './footer.css'; // Import your CSS file

const Footer = () => {
  useEffect(() => {
    const starContainer = document.querySelector('.stars');
    const numberOfStars = 50; // Number of stars you want to generate

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.width = `${Math.random() * 3 + 1}px`; // Random size between 1px and 3px
      star.style.height = star.style.width; // Make it circular
      star.style.top = `${Math.random() * 100}%`; // Random position vertically
      star.style.left = `${Math.random() * 100}%`; // Random position horizontally
      star.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random animation duration
      starContainer.appendChild(star);
    }
  }, []); // Empty dependency array ensures this runs once after the initial render

  return (
    <div className="page-content">
      <div className="footer">
        <div className="stars"></div> {/* Container for stars */}
        
        {/* First Platform */}
        <div className="platform platform-1">
          <img src="src/assets/jumpplatform.png" alt="Platform" />
        </div>
        
        {/* Second Platform */}
        <div className="platform platform-2">
          <img src="src/assets/jumpplatform.png" alt="Platform" />
        </div>

        {/* Third Platform */}
        <div className="platform platform-3">
          <img src="src/assets/jumpplatform.png" alt="Platform" />
        </div>

        {/* Doodle */}
        <div className="doodle">
          <img src="src/assets/doodler-left.png" alt="Doodle" />
        </div>

        {/* Healthbar */}
        <img src="src/assets/healthbar.png" alt="Healthbar" className="healthbar" />
        
        <div className="footer-text">
          <span className="footer-text--youra">YOURA</span> <br></br>
          <span className="footer-text--rest">. Spread Kindness, Grow Your Aura. &copy; 2024</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
