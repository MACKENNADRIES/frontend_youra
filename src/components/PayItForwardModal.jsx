import React, { useState } from "react";
import styles from "./ClaimModal.module.css"; // Reuse the same CSS

const API_URL = import.meta.env.VITE_API_URL;

const PayItForwardModal = ({ isOpen, onClose, rakId, onPayItForwardSuccess }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privateRak, setPrivateRak] = useState(false);
  const [action, setAction] = useState("Claim this offer");
  const [auraPointsValue, setAuraPointsValue] = useState(10);
  const [anonymousRak, setAnonymousRak] = useState(false);
  const [allowCollaborators, setAllowCollaborators] = useState(false);

  const handlePayItForward = async () => {
    if (!title || !description) {
      alert("Please provide a title and description for the Pay It Forward.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/rak/rak/${rakId}/pay-it-forward/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          description,
          private: privateRak,
          rak_type: "offer", // Always set to "offer"
          action,
          aura_points_value: auraPointsValue,
          anonymous_rak: anonymousRak,
          allow_collaborators: allowCollaborators,
        }),
      });

      if (response.ok) {
        const updatedRAK = await response.json();
        onPayItForwardSuccess(updatedRAK);
        setTitle("");
        setDescription("");
        setPrivateRak(false);
        setAnonymousRak(false);
        setAllowCollaborators(false);
        setAuraPointsValue(10);
        onClose();
      } else {
        console.error("Failed to create Pay It Forward.");
      }
    } catch (error) {
      console.error("Error creating Pay It Forward:", error);
    }
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 30) {
      setTitle(e.target.value);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Pay It Forward</h2>
        <input
          className={styles.textarea}
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title (max 30 characters)"
        />
        <p className={styles.charLimit}>
          {title.length}/30 characters
        </p>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
        />
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={privateRak}
            onChange={(e) => setPrivateRak(e.target.checked)}
            className={styles.checkbox}
          />
          Make this RAK private
        </label>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={anonymousRak}
            onChange={(e) => setAnonymousRak(e.target.checked)}
            className={styles.checkbox}
          />
          Post anonymously
        </label>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={allowCollaborators}
            onChange={(e) => setAllowCollaborators(e.target.checked)}
            className={styles.checkbox}
          />
          Allow collaborators
        </label>
        <label className={styles.label}>
          Aura Points:
          <input
            type="number"
            value={auraPointsValue}
            onChange={(e) => setAuraPointsValue(Number(e.target.value))}
            className={styles.input}
          />
        </label>
        {/* Disabled RAK Type */}
        <label className={styles.label}>
          RAK Type: <span className={styles.disabledField}>Offer</span>
        </label>
        <button className={styles.button} onClick={handlePayItForward}>
          Pay It Forward
        </button>
        <button className={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PayItForwardModal;
