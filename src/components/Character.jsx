import React from 'react';

const Character = ({ isJumping, position }) => {
  return (
    <div
      className="character"
      style={{
        position: 'absolute',
        bottom: isJumping ? '100px' : '0',
        left: `${position}px`,
        transition: 'bottom 0.5s',
      }}
    >
      {/* You can use an img or div with a pixelated background */}
      <img src="pixel-girl.png" alt="Character" />
    </div>
  );
};

export default Character;
