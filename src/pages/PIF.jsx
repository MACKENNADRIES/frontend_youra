import React, { useState, useEffect } from "react";
import { getCompletedRequestRAKs } from "../api/get-pay-it-forward"; // Import the updated API function
import "./RAKList.css"; // Import the CSS file for 8-bit styling
import "../components/PixelCanvas"; // Import the PixelCanvas component (kept as per your request)
import ClaimModal from "../components/ClaimModal"; // Import the ClaimModal component
import PayItForwardModal from "../components/PayItForwardModal"; // Import the PayItForwardModal component

const RAKList = () => {
  const [raks, setRaks] = useState([]); // State to store fetched RAKs
  const [sortedRaks, setSortedRaks] = useState([]); // State for sorted RAKs
  const [sortOrder, setSortOrder] = useState("latest"); // Sorting state for completed RAKs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [auraData, setAuraData] = useState({}); // State to store aura data
  const [showClaimModal, setShowClaimModal] = useState(false); // To control ClaimModal visibility
  const [showPayItForwardModal, setShowPayItForwardModal] = useState(false); // To control PayItForwardModal visibility
  const [selectedRakId, setSelectedRakId] = useState(null); // Store the RAK ID being claimed or paid forward

  const handlePayItForwardClick = (rakId) => {
    console.log(`Pay it Forward clicked for RAK ID: ${rakId}`);
    setSelectedRakId(rakId);
    setShowPayItForwardModal(true);
  };

  const handlePayItForwardSuccess = (updatedRAK) => {
    console.log("Pay it Forward created successfully:", updatedRAK);
    setShowPayItForwardModal(false);
  };

  useEffect(() => {
    const fetchRAKs = async () => {
      try {
        const data = await getCompletedRequestRAKs(); // Use the updated API function for completed requests
        setRaks(data);
        setSortedRaks(data); // Initialize sorted RAKs with all RAKs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRAKs();
  }, []); // Empty dependency array ensures this runs once

  useEffect(() => {
    const sortRAKs = (raksList) => {
      if (sortOrder === "latest") {
        return [...raksList].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (sortOrder === "oldest") {
        return [...raksList].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }
      return raksList;
    };

    setSortedRaks(sortRAKs(raks));
  }, [sortOrder, raks]);

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

        {/* Sort Option */}
        <div className="filter-container"> {/* Retaining the same CSS class */}
          <label htmlFor="sortOrder">Sort by:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">Latest Completed</option>
            <option value="oldest">Oldest Completed</option>
          </select>
        </div>

        {/* RAK List */}
        {sortedRaks.length > 0 ? (
          <ul className="rak-list">
            {sortedRaks.map((rak) => {
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
                      <p className="rak-aura-points">
                        Aura Points: {rak.aura_points_value}
                      </p>
                      {rak.status === "completed" && (
                        <button
                          className="claim-button"
                          onClick={() =>
                            !rak.is_paid_forward && handlePayItForwardClick(rak.id)
                          }
                          disabled={rak.is_paid_forward} // Disable if already paid forward
                        >
                          {rak.is_paid_forward ? "Paid Forward" : "Pay it Forward"}
                        </button>
                      )}
                    </div>
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

      {/* Pay It Forward Modal */}
      <PayItForwardModal
        isOpen={showPayItForwardModal}
        onClose={() => setShowPayItForwardModal(false)}
        rakId={selectedRakId}
        onPayItForwardSuccess={handlePayItForwardSuccess} // Pass success handler
      />

      {/* Pixel Canvas (Kept as per original structure) */}
      <div className="pixel-canvas-container">
        <pixel-canvas></pixel-canvas> {/* Your pixel canvas component goes here */}
      </div>
    </div>
  );
};

export default RAKList;
