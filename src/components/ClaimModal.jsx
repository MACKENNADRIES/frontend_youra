// src/components/ClaimModal.jsx
import React, { useState } from 'react';
import './ClaimModal.css'; // Ensure your styles are here

const ClaimModal = ({ isOpen, onClose, onClaim, comment, setComment }) => {
  if (!isOpen) return null; // Don't render modal if not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Claim the RAK</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment"
        />
        <button onClick={() => onClaim(comment)}>Claim</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ClaimModal;
