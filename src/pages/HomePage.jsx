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
    { text: "Discover", image: "src/assets/discover.png", route: "/discover" },
    { text: "Create RAK", image: "src/assets/createrak.png", route: "/create-rak" },
    { text: "Leaderboard", image: "src/assets/leaderboard.png", route: "/leaderboard" },
    { text: "Profile", image: "src/assets/profile.png", route: "/profile" },
    { text: "Earn Points", image: "src/assets/Earn.png", route: "/" },
    { text: "My Raks", image: "src/assets/myraks.png", route: "/create-rak" },
    { text: "psy it forward", image: "src/assets/pif.png", route: "/leaderboard" },
    { text: "ABout", image: "src/assets/logolarge.png", route: "/profile" },
    { text: "Contact Us", image: "src/assets/contact.png", route: "/profile" },
  ];

  return (
    <div>
<div class="hero-section">
    <div class="hero-content">
        <h1 class="hero-title">YOURA<br></br>Your Aura</h1>
        <p class="hero-description">Spread kindness, expand your aura!</p>
    </div>
    <div class="hero-overlay"></div>
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
