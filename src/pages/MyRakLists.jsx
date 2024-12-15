import React, { useState, useEffect } from "react";
import { getRAKs } from "../api/get-my-claimed-raks"; // API function for claimed RAKs
import { getPostedRAKs } from "../api/get-my-posted-raks"; // API function for posted RAKs
import "./RAKList.css"; // CSS for 8-bit styling
import "../components/PixelCanvas"; // PixelCanvas component
import ClaimModal from "../components/ClaimModal"; // ClaimModal component
import { completeRAKApiCall } from "../api/complete-rak";

// Import badge images for aura levels
import InitiatorBadge from "./assets/initiator.png";
import SustainerBadge from "./assets/sustainer.png";
import VisionaryBadge from "./assets/visionary.png";
import CreatorBadge from "./assets/creator.png";
import InnovatorBadge from "./assets/innovator.png";
import AcceleratorBadge from "./assets/accelerator.png";
import TransformerBadge from "./assets/transformer.png";
import HealerBadge from "./assets/healer.png";
import OrchestratorBadge from "./assets/orchestrator.png";
import HarmoniserBadge from "./assets/harmoniser.png";

const RAKList = () => {
  const [raks, setRaks] = useState([]); // Store RAKs
  const [filteredRaks, setFilteredRaks] = useState([]); // Filtered RAKs
  const [filter, setFilter] = useState("claimed"); // Default filter
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [auraData, setAuraData] = useState({}); // Aura data
  const [showClaimModal, setShowClaimModal] = useState(false); // ClaimModal visibility
  const [selectedRakId, setSelectedRakId] = useState(null); // Selected RAK ID

  // Get the current logged-in user from localStorage
  var user = localStorage.getItem("user");
  user = JSON.parse(user);

  const fetchRAKs = async () => {
    try {
      setLoading(true);
      let data = [];

      if (filter === "my-posted") {
        data = await getPostedRAKs(); // Fetch posted RAKs
      } else {
        data = await getRAKs(); // Fetch claimed RAKs
      }

      setRaks(data);
      setFilteredRaks(data); // Initialize filtered RAKs
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRAKs();
  }, [filter]); // Refetch RAKs when the filter changes

  useEffect(() => {
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
          auraDataObj[rak.id] = { level, badgeImage };
          break; // Exit loop once the level is found
        }
      }
    }

    setAuraData(auraDataObj);
  }, [raks]);

  const handleCompleteButtonClick = async (rakId) => {
    try {
      const updatedRAK = await completeRAKApiCall(rakId); // API call to complete the RAK
      fetchRAKs(); // Refetch the RAKs after completing one
      setRaks((prevRaks) =>
        prevRaks.map((rak) =>
          rak.id === updatedRAK.id ? { ...rak, status: updatedRAK.status } : rak
        )
      );

      // Update the filtered list to reflect the changes
      setFilteredRaks((prevFilteredRaks) =>
        prevFilteredRaks.map((rak) =>
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
        <h2 className="title">My Random Acts of Kindness</h2>
        <h3 className="description">
          These are RAKs you have claimed or posted.
        </h3>

        {/* Filter Dropdown */}
        <div className="filter-container">
          <label htmlFor="filter">Filter by:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="claimed">Claimed by me</option>
            <option value="my-posted">Created by me</option>
          </select>
        </div>

        {/* RAK List */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : filteredRaks.length > 0 ? (
          <ul className="rak-list">
            {filteredRaks.map((rak) => {
              const aura = auraData[rak.id];
              const showRestrictedMessage =
                rak.rak_type === "request" &&
                rak.created_by_username !== user.username;

              // Get the first claim or display a message if there are no claims
              const claim = rak.claims.length > 0 ? rak.claims[0] : null;

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
                        Status: <span>{rak.status}</span>
                      </p>
                      <p className="rak-claim-status">
                        Claim Status:{" "}
                        {claim ? (
                          <span>Claimed by {claim.claimer_username}</span>
                        ) : (
                          <span>Unclaimed</span>
                        )}
                      </p>
                      <p className="rak-aura-points">
                        Aura Points: {rak.aura_points_value}
                      </p>
                    </div>
                    {showRestrictedMessage && (
                      <p className="restricted-message">
                      </p>
                    )}
                    {!showRestrictedMessage && rak.status === "in progress" && (
                      <button
                        className="claim-button"
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
          onClaimSuccess={() => setFilter(filter)} // Refresh data after claiming
        />
      )}
    </div>
  );
};

export default RAKList;
