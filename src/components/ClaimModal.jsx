import React, { useState } from "react";
import "./ClaimModal.css"; // Ensure your styles are here

const ClaimModal = ({ isOpen, onClose, rakId, onClaimSuccess }) => {
  if (!isOpen) return null;

  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleClaim = async () => {
    if (!comment) {
      alert("Please add a comment to claim the RAK.");
      return;
    }

    try {
      const response = await fetch(`/rak/${rakId}/claim/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          comment,
          anonymous_claimant: anonymous,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to claim the RAK.");
      }

      const updatedRAK = await response.json();
      onClaimSuccess(updatedRAK); // Notify parent component of successful claim
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error claiming RAK:", error);
    }
  };

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
