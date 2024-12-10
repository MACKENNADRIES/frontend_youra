import React, { useState } from "react";
import styles from "./ClaimModal.module.css";

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
      const response = await fetch(`${API_URL}/rak/rak/${rakId}/claim/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ comment, anonymous }),
      });

      if (response.ok) {
        const updatedRAK = await response.json();
        onClaimSuccess(updatedRAK);
        setComment("");
        onClose();
      } else {
        console.error("Failed to claim RAK");
      }
    } catch (error) {
      console.error("Error claiming RAK:", error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Claim RAK</h2>
        <textarea
          className={styles.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment"
        />
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className={styles.checkbox}
          />
          Claim anonymously
        </label>
        <button className={styles.button} onClick={handleClaim}>
          Claim
        </button>
        <button className={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ClaimModal;
