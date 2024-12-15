import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "../styles.css";
import "./HomePage.css";
import "../components/PixelCanvas"; // Import the PixelCanvas component
import Footer from "../components/FooterGame"; 
const HomePage = () => {
  const navigate = useNavigate(); // React Router navigation function

  const pixelAnimationConfigs = [
    { gap: 9, speed: 30, colors: "#6a0dad, #4b0082, #9370db" },
    { gap: 8, speed: 20, colors: "#ffd700, #ffa500, #ff69b4" },
    { gap: 10, speed: 15, colors: "#fef08a, #fde047, #eab308" },
    { gap: 7, speed: 25, colors: "#e57373, #ff8a80, #ff5252" },
  ];

  const cards = [
    { text: "Discover", image: "/assets/discover.png", route: "/all" },
    { text: "Create RAK", image: "/assets/createrak.png", route: "/create-rak" },
    { text: "Leaderboard", image: "/assets/leaderboard.png", route: "/leaderboard" },
    { text: "Profile", image: "/assets/profile.png", route: "/profile" },
    { text: "Earn Points", image: "/assets/Earn.png", route: "/earn-points" },
    { text: "My Raks", image: "/assets/myraks.png", route: "/my-raks" },
    { text: "Pay it forward", image: "/assets/pif.png", route: "/pif" },
    { text: "About", image: "/assets/logolarge.png", route: "/about" },
    { text: "Contact Us", image: "/assets/contact.png", route: "/contact" },
  ];

  return (
    <div>
<div className="hero-section">
    <div className="hero-content">
        <h1 className="hero-title">YOURA<br></br>Your Aura</h1>
        <p className="hero-description">Spread kindness, expand your aura!</p>
    </div>
    <div className="hero-overlay"></div>
</div>


      {/* Main Section with Cards */}
      <main className="homepage">
        {cards.map((card, index) => (
          <button
            key={index}
            className="card"
            style={{ "--active-color": pixelAnimationConfigs[index % pixelAnimationConfigs.length].colors.split(",")[0] }}
            onClick={() => navigate(card.route)} // Navigate to the corresponding page
          >
            <pixel-canvas
              data-gap={pixelAnimationConfigs[index % pixelAnimationConfigs.length].gap}
              data-speed={pixelAnimationConfigs[index % pixelAnimationConfigs.length].speed}
              data-colors={pixelAnimationConfigs[index % pixelAnimationConfigs.length].colors}
            ></pixel-canvas>
            <img src={card.image} alt={`${card.text} Icon`} className="card-image" />
            <span className="card-text">{card.text}</span>
          </button>
        ))}
      </main>
      <Footer /> {/* Include Footer here */}
    </div>
  );
};

export default HomePage;
