import React, { useEffect, useRef, useState } from 'react';
import './animationContainer.module.css';

// Dust Component (for landing effect)
const Dust = ({ position, jumpHeight }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position}%`,
        bottom: `${jumpHeight}%`,
        width: '20px',
        height: '20px',
        backgroundColor: 'rgba(150, 150, 150, 0.5)',
        borderRadius: '50%',
        animation: 'dustAnimation 0.5s ease-out',
        zIndex: 1,
      }}
    />
  );
};

// Character Component
const Character = ({ position, jumpHeight, characterFrame }) => {
  const characterImages = [
    "src/assets/run1.png",  // Frame 1
    "src/assets/run2.png",  // Frame 2
    "src/assets/run3.png",  // Frame 3
  ];

  return (
    <img
      src={characterImages[characterFrame]}
      alt="Character"
      className="character"
      style={{
        left: `${position}%`,
        bottom: `${jumpHeight}%`,
      }}
    />
  );
};

const AnimationContainer = () => {
  const [characterPosition, setCharacterPosition] = useState(-10); // Start off-screen to the left
  const [jumpHeight, setJumpHeight] = useState(0); // Vertical position
  const [platformIndex, setPlatformIndex] = useState(0); // To keep track of which platform the character is on
  const [characterFrame, setCharacterFrame] = useState(0); // To track the current running animation frame
  const [dustEffect, setDustEffect] = useState(null); // To trigger dust effect
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width for responsiveness
  const platformHeights = useRef([0, 0, 0]); // Heights of platforms

  // Platform positions (dynamic as per screen size)
  const platforms = [
    { position: windowWidth * 0.55, bottom: 2, id: 0 }, // Left platform
    { position: windowWidth * 0.75, bottom: 7, id: 1 }, // Middle platform
    { position: windowWidth * 0.94, bottom: 10, id: 2 }, // Right platform
  ];

  const speed = windowWidth / 35; // Dynamic speed for horizontal movement based on screen width
  const jumpSpeed = 25; // Speed for vertical movement, adjust for jump height speed

  // Handle window resizing for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set platform heights dynamically after the components are mounted
  useEffect(() => {
    platforms.forEach((platform, index) => {
      platformHeights.current[index] = platform.bottom; // Set to predefined bottom positions
    });
  }, [windowWidth]); // Recalculate when window resizes

  // Jumping animation logic with dust effect
  useEffect(() => {
    let currentLeft = -10; // Start off-screen
    let currentBottom = 0;
    let platformIndex = 0; // Platform index tracker
    let jumpPhase = 0; // To track the current phase of the jump (up or down)
    let jumpStartHeight = 0; // Starting height of the jump
    let landingHeight = 0; // Height of the platform where character lands
    let moveTimer;

    const runAndJump = () => {
      moveTimer = setInterval(() => {
        // Moving horizontally
        if (currentLeft < platforms[platformIndex].position - 10) {
          currentLeft += speed; // Move towards the first platform
        } else if (currentLeft >= platforms[platformIndex].position - 10 && currentLeft < platforms[platformIndex].position + 10) {
          // Pause before jumping
          setCharacterFrame(0); // Character paused
          if (currentLeft >= platforms[platformIndex].position) {
            jumpStartHeight = platformHeights.current[platformIndex];
            jumpPhase = 0; // Start jump
            setPlatformIndex(platformIndex + 1); // Move to next platform
            setDustEffect({ position: currentLeft, height: jumpStartHeight });
            clearInterval(moveTimer);
            return; // Pause the running while preparing to jump
          }
        }

        setCharacterPosition(currentLeft); // Update position
        setCharacterFrame((prevFrame) => (prevFrame + 1) % 3); // Running animation
      }, 20); // Adjust the interval to make it slower
    };

    // Jump arc for the character (parabolic jump)
    const jumpCharacter = () => {
      let jumpPhaseTimer = setInterval(() => {
        if (jumpPhase === 0) {
          // Going up
          currentBottom += jumpSpeed;
          if (currentBottom >= jumpStartHeight + 20) { // Peak of jump
            jumpPhase = 1; // Start falling
          }
        } else {
          // Going down
          currentBottom -= jumpSpeed;
          if (currentBottom <= jumpStartHeight) {
            // Landing on the platform
            setJumpHeight(currentBottom);
            setCharacterPosition(currentLeft);
            setDustEffect({ position: currentLeft, height: jumpStartHeight });
            clearInterval(jumpPhaseTimer);
            runAndJump(); // Continue running after landing
          }
        }
        setJumpHeight(currentBottom);
      }, 20); // Jump animation speed
    };

    runAndJump(); // Start the initial running and jumping cycle

    return () => clearInterval(moveTimer); // Cleanup intervals on unmount
  }, [platformIndex, windowWidth]); // Dependencies for resizing

  return (
    <div className="animation-container">
      <div className="platform-left">
        <img src="src/assets/jumpplatform.png" alt="Left Platform" />
      </div>
      <div className="platform-middle">
        <img src="src/assets/jumpplatform.png" alt="Middle Platform" />
      </div>
      <div className="platform-right">
        <img src="src/assets/jumpplatform.png" alt="Right Platform" />
      </div>
      {dustEffect && <Dust position={dustEffect.position} jumpHeight={dustEffect.height} />}
      <Character position={characterPosition} jumpHeight={jumpHeight} characterFrame={characterFrame} />
    </div>
  );
};

export default AnimationContainer;
