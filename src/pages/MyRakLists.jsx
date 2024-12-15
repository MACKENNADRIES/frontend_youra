import React, { useState, useEffect } from "react";
import { getRAKs } from "../api/get-my-claimed-raks"; // API function for claimed RAKs
import { getPostedRAKs } from "../api/get-my-posted-raks"; // API function for posted RAKs
import "./RAKList.css"; // CSS for 8-bit styling
import "../components/PixelCanvas"; // PixelCanvas component
import ClaimModal from "../components/ClaimModal"; // ClaimModal component
import { completeRAKApiCall } from "../api/complete-rak";

const RAKList = () => {
  const [raks, setRaks] = useState([]); // Store RAKs
  const [filteredRaks, setFilteredRaks] = useState([]); // Filtered RAKs
  const [filter, setFilter] = useState("claimed"); // Default filter
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [auraData, setAuraData] = useState({}); // Aura data
  const [showClaimModal, setShowClaimModal] = useState(false); // ClaimModal visibility
  const [selectedRakId, setSelectedRakId] = useState(null); // Selected RAK ID

  useEffect(() => {
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

    fetchRAKs();
  }, [filter]); // Refetch RAKs when the filter changes

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
              auraDataObj[rak.id] = { level, badgeImage: null };
            }
            break;
          }
        }
      }

      setAuraData(auraDataObj);
    };

    if (raks.length > 0) {
      loadAuraData();
    }
  }, [raks]);

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
                        {rak.claimed_by_username ? (
                          <span>Claimed by {rak.claimed_by_username}</span>
                        ) : (
                          <span>Unclaimed</span>
                        )}
                      </p>
                      <p className="rak-aura-points">
                        Aura Points: {rak.aura_points_value}
                      </p>
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
          onClaimSuccess={() => setFilter(filter)} // Refresh data after claiming
        />
      )}
    </div>
  );
};

export default RAKList;
