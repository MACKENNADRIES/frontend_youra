// BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.module.css"; // Import the CSS for styling

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Go back to the previous page
    } else {
      navigate("/"); // Fallback to home if no history
    }
  };

  return (
    <button className="back-button" onClick={handleBack}>
      ← Back
    </button>
  );
};

export default BackButton;
