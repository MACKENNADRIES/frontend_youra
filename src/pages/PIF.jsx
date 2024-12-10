import React, { useState, useEffect } from "react";
import { getCompletedRequestRAKs } from "../api/get-pay-it-forward"; // Import the updated API function
import "./RAKList.css"; // Import the CSS file for 8-bit styling
import "../components/PixelCanvas"; // Import the PixelCanvas component (kept as per your request)
import ClaimModal from "../components/ClaimModal"; // Import the ClaimModal component

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
        const data = await getCompletedRequestRAKs(); // Use the updated API function for completed requests
        setRaks(data);
        setFilteredRaks(data); // Initialize filtered RAKs with all RAKs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRAKs();
  }, []); // Empty dependency array ensures this runs once

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
    if (filter === "all") {
      setFilteredRaks(raks);
    } else if (filter === "claimed") {
      setFilteredRaks(raks.filter((rak) => rak.status === "in progress"));
    } else if (filter === "unclaimed") {
      setFilteredRaks(raks.filter((rak) => rak.status === "open"));
    } else if (filter === "request") {
      setFilteredRaks(raks.filter((rak) => rak.rak_type === "request"));
    } else if (filter === "offer") {
      setFilteredRaks(raks.filter((rak) => rak.rak_type === "offer"));
    }
  }, [filter, raks]);

  const handleClaimButtonClick = (rakId) => {
    console.log("Claiming RAK with ID:", rakId); // Add log to check
    setSelectedRakId(rakId);
    setShowClaimModal(true);
  };

  // Update the list of RAKs when a claim is successful
  const handleClaimSuccess = (updatedRAK) => {
    setRaks((prevRaks) =>
      prevRaks.map((rak) =>
        rak.id === updatedRAK.id
          ? {
              ...rak,
              status: updatedRAK.status,
              claimed_by_username: updatedRAK.claimed_by_username,
            }
          : rak
      )
    );
    setShowClaimModal(false); // Close the modal after a successful claim
  };

  return (
    <div id="app">
      <section className="container nes-container with-title">
        <h2 className="title">Random Acts of Kindness</h2>
        
        {/* Filter Dropdown */}
        <div className="filter-container">
          <label htmlFor="filter">Filter by:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="claimed">Claimed</option>
            <option value="unclaimed">Unclaimed</option>
            <option value="request">Request</option>
            <option value="offer">Offer</option>
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

                    {/* Conditional Claim Button */}
                    {rak.status === "open" && !rak.claimed_by_username ? (
                      <button
                        className="claim-button"
                        onClick={() => handleClaimButtonClick(rak.id)}
                      >
                        Claim
                      </button>
                    ) : (
                      <button className="claim-button" disabled>
                        {rak.status === "claimed"
                          ? "Already Claimed"
                          : rak.status === "in progress"
                          ? "In Progress"
                          : "Completed"}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No RAKs available.</p>
        )}
      </section>

      {/* Claim Modal */}
      <ClaimModal
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        rakId={selectedRakId}
        onClaimSuccess={handleClaimSuccess} // Pass handleClaimSuccess to the modal
      />

      {/* Pixel Canvas (Kept as per original structure) */}
      <div className="pixel-canvas-container">
        <pixel-canvas></pixel-canvas> {/* Your pixel canvas component goes here */}
      </div>
    </div>
  );
};

export default RAKList;
