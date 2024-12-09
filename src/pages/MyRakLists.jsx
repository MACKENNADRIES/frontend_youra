import React, { useState, useEffect } from "react";
import { getRAKs } from "../api/get-my-raks"; // Updated API function import
import { getPostedRAKs } from "../api/get-my-posted-raks"; // New API function import
import "./RAKList.css"; // Import the CSS file for 8-bit styling
import "../components/PixelCanvas"; // Import the PixelCanvas component (kept as per your request)
import ClaimModal from "../components/ClaimModal"; // Import the ClaimModal component
import { completeRAKApiCall } from "../api/complete-rak";

const RAKList = () => {
  const [raks, setRaks] = useState([]); // State to store fetched RAKs
  const [filteredRaks, setFilteredRaks] = useState([]); // State for filtered RAKs
  const [filter, setFilter] = useState("all"); // Filter state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [auraData, setAuraData] = useState({}); // State to store aura data
  const [showClaimModal, setShowClaimModal] = useState(false); // To control modal visibility
  const [selectedRakId, setSelectedRakId] = useState(null); // Store the RAK ID being claimed

  useEffect(() => {
    const fetchRAKs = async () => {
      try {
        let data = [];
        if (filter === "my-posted") {
          data = await getPostedRAKs(); // Use the new API function to get posted RAKs
        } else {
          data = await getRAKs(); // Use the existing API function to get claimed RAKs
        }
        setRaks(data);
        setFilteredRaks(data); // Initialize filtered RAKs with fetched RAKs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRAKs();
  }, [filter]); // Re-fetch whenever the filter changes

  useEffect(() => {
    const loadAuraData = async () => {
      const auraLevels = [
        { range: [0, 100], level: "Initiator" },
        { range: [101, 200], level: "Sustainer" },
        { range: [201, 300], level: "Visionary" },
        { range: [301, 400], level: "Creator" },
        { range: [401, 500], level: "Innovator" },
        { range: [501, 600], level: "Accelerator" },
        { range: [601, 700], level: "Transformer" },
        { range: [701, 800], level: "Healer" },
        { range: [801, 900], level: "Orchestrator" },
        { range: [901, 10000], level: "Harmonizer" },
      ];

      const auraDataObj = {};
      for (let rak of raks) {
        const { aura_points_value } = rak;
        for (let i = 0; i < auraLevels.length; i++) {
          const { range, level } = auraLevels[i];
          if (aura_points_value >= range[0] && aura_points_value <= range[1]) {
            try {
              const image = await import(
                `../assets/${level.toLowerCase().replace(" ", "-")}.png`
              );
              auraDataObj[rak.id] = { level, badgeImage: image.default };
            } catch (error) {
              console.error(`Error loading image for ${level}:`, error);
              auraDataObj[rak.id] = { level, badgeImage: null }; // Fallback if image fails to load
            }
            break; // Once the correct level is found, stop checking further levels
          }
        }
      }

      setAuraData(auraDataObj); // Update auraData with loaded data
    };

    if (raks.length > 0) {
      loadAuraData(); // Load aura data only after RAKs are fetched
    }
  }, [raks]);

  useEffect(() => {
    if (filter === "claimed") {
      setFilteredRaks(raks);
    } else if (filter === "unclaimed") {
      setFilteredRaks(raks.filter((rak) => rak.status === "open"));
    } else if (filter === "request") {
      setFilteredRaks(raks.filter((rak) => rak.rak_type === "request"));
    } else if (filter === "offer") {
      setFilteredRaks(raks.filter((rak) => rak.rak_type === "offer"));
    }
  }, [filter, raks]);

  const handleCompleteButtonClick = async (rakId) => {
    try {
      const updatedRAK = await completeRAKApiCall(rakId);
      setRaks((prevRaks) =>
        prevRaks.map((rak) =>
          rak.id === updatedRAK.id ? { ...rak, status: updatedRAK.status } : rak
        )
      );
    } catch (err) {
      console.error("Error completing RAK:", err);
    }
  };

  return (
    <div id="app">
      <section className="container nes-container with-title">
        <h2 className="title"> My Random Acts of Kindness</h2>
        <h3 className="description">These are RAKs you have claimed or posted. </h3>
        
        {/* Filter Dropdown */}
        <div className="filter-container">
          <label htmlFor="filter">Filter by:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="claimed">Claimed</option>
            <option value="unclaimed">Unclaimed</option>
            <option value="request">Request</option>
            <option value="offer">Offer</option>
            <option value="my-posted">Created by me</option> {/* New filter option */}
          </select>
        </div>

        {/* RAK List */}
        {filteredRaks.length > 0 ? (
          <ul className="rak-list">
            {filteredRaks.map((rak) => {
              const aura = auraData[rak.id]; // Get the aura data for each RAK
              return (
                <li key={rak.id} className="rak-item">
                  <div className="rak-header">
                    {aura && aura.badgeImage && (
                      <div className="rak-badge">
                        <img
                          src={aura.badgeImage}
                          alt={`${aura.level} Badge`}
                          className="badge-img"
                        />
                        <p className="rak-level">{aura.level}</p>
                      </div>
                    )}
                    <p className="rak-username">{rak.created_by_username}</p>
                  </div>
                  <div className="rak-content">
                    <h3 className="rak-title">{rak.title}</h3>
                    <p className="rak-description">{rak.description}</p>
                    <div className="rak-details">
                      <p className="rak-status">
                        Status:{" "}
                        {rak.status === "open" && (
                          <span className="rak-open">Open</span>
                        )}
                        {rak.status === "claimed" && (
                          <span className="rak-claimed">Claimed</span>
                        )}
                        {rak.status === "in progress" && (
                          <span className="rak-in-progress">In Progress</span>
                        )}
                        {rak.status === "completed" && (
                          <span className="rak-completed">Completed</span>
                        )}
                      </p>
                      <p className="rak-claim-status">
                        Claim Status:{" "}
                        {rak.claimed_by_username ? (
                          <span className="rak-claimed">
                            Claimed by {rak.claimed_by_username}
                          </span>
                        ) : (
                          <span className="rak-unclaimed">Unclaimed</span>
                        )}
                      </p>
                      <p className="rak-aura-points">
                        Aura Points: {rak.aura_points_value}
                      </p>
                      {rak.collaborators && rak.collaborators.length > 0 && (
                        <p className="rak-collaborators">
                          Collaborators:{" "}
                          {rak.collaborators
                            .map((collaborator) => collaborator.username)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                    {rak.status === "in progress" && (
                      <button
                        className="complete-button"
                        onClick={() => handleCompleteButtonClick(rak.id)}
                      >
                        Complete Me
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No RAKs found.</p>
        )}
      </section>

      {showClaimModal && (
        <ClaimModal
          rakId={selectedRakId}
          onClose={() => setShowClaimModal(false)}
          onClaimSuccess={handleClaimSuccess}
        />
      )}
    </div>
  );
};

export default RAKList;
