import React, { useState } from "react";
import "./ClaimModal.css"; // Ensure your styles are here

const API_URL = import.meta.env.VITE_API_URL;

const ClaimModal = ({ isOpen, onClose, rakId, onClaimSuccess }) => {
  if (!isOpen) return null;

  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleClaim = async () => {
    if (!comment) {
      alert("Please add a comment to claim the RAK");
      return;
    }
  
    try {
      // Use rakId instead of selectedRakId
      const response = await fetch(`${API_URL}/rak/rak/${rakId}/claim/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,

        },
        body: JSON.stringify({ comment }), // Send the comment in the request body
      });
      
  
      if (response.ok) {
        const updatedRAK = await response.json(); // Get the updated RAK data
        onClaimSuccess(updatedRAK); // Pass the updated RAK to the parent
        setComment(""); // Clear the comment input
        onClose(); // Close the modal after successful claim
      } else {
        console.error("Failed to claim RAK");
      }
    } catch (error) {
      console.error("Error claiming RAK:", error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Claim RAK</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment"
        />
        <label>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          Claim anonymously
        </label>
        <button onClick={handleClaim}>Claim</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ClaimModal;
