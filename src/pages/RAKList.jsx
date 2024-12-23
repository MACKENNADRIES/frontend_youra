import React, { useState, useEffect } from "react";
import { getRAKs } from "../api/get-raks"; // Import the API function
import "./RAKList.css"; // Import the CSS file for 8-bit styling
import "../components/PixelCanvas"; // Import the PixelCanvas component (kept as per your request)
import ClaimModal from "../components/ClaimModal"; // Import the ClaimModal component
// Import badge images for aura levels
import InitiatorBadge from "../assets/initiator.png";
import SustainerBadge from "../assets/sustainer.png";
import VisionaryBadge from "../assets/visionary.png";
import CreatorBadge from "../assets/creator.png";
import InnovatorBadge from "../assets/innovator.png";
import AcceleratorBadge from "../assets/accelerator.png";
import TransformerBadge from "../assets/transformer.png";
import HealerBadge from "../assets/healer.png";
import OrchestratorBadge from "../assets/orchestrator.png";
import HarmoniserBadge from "../assets/harmoniser.png";


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
        const data = await getRAKs(); // Use the centralized API function
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
    const loadAuraData = () => {
      const auraLevels = [
        { range: [0, 100], level: "Initiator", badgeImage: InitiatorBadge },
        { range: [101, 200], level: "Sustainer", badgeImage: SustainerBadge },
        { range: [201, 300], level: "Visionary", badgeImage: VisionaryBadge },
        { range: [301, 400], level: "Creator", badgeImage: CreatorBadge },
        { range: [401, 500], level: "Innovator", badgeImage: InnovatorBadge },
        { range: [501, 600], level: "Accelerator", badgeImage: AcceleratorBadge },
        { range: [601, 700], level: "Transformer", badgeImage: TransformerBadge },
        { range: [701, 800], level: "Healer", badgeImage: HealerBadge },
        { range: [801, 900], level: "Orchestrator", badgeImage: OrchestratorBadge },
        { range: [901, 10000], level: "Harmoniser", badgeImage: HarmoniserBadge },
      ];
  
      const auraDataObj = {};
      for (let rak of raks) {
        const { aura_points_value } = rak;
        for (let { range, level, badgeImage } of auraLevels) {
          if (aura_points_value >= range[0] && aura_points_value <= range[1]) {
            auraDataObj[rak.id] = { level, badgeImage }; // Use pre-imported image
            break; // Exit loop once the correct level is found
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
    {rak.claims && rak.claims.length > 0 ? (
      <span className="rak-claimed">
        Claimed by{" "}
        {rak.claims[0].anonymous_claimant
          ? "Anonymous"
          : rak.claims[0].claimer_username}
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