import React, { useState, useEffect } from "react";
import { getRAKs } from "../api/get-raks"; // Import the API function
import "./RAKList.css"; // Import the CSS file for 8-bit styling
import "../components/PixelCanvas"; // Import the PixelCanvas component

const RAKList = () => {
  const [raks, setRaks] = useState([]); // State to store fetched RAKs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [auraData, setAuraData] = useState({}); // State to store aura data

  useEffect(() => {
    const fetchRAKs = async () => {
      try {
        const data = await getRAKs(); // Use the centralized API function
        setRaks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRAKs();
  }, []); // Empty dependency array ensures this runs once

  // Load aura data asynchronously for each RAK
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
              const image = await import(`../assets/${level.toLowerCase().replace(' ', '-')}.png`);
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
  }, [raks]); // This useEffect depends on 'raks', so it will re-run when 'raks' changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="app">
      <section className="container nes-container with-title">
        <h2 className="title">Random Acts of Kindness</h2>
        {raks.length > 0 ? (
          <ul className="rak-list">
            {raks.map((rak) => {
              const aura = auraData[rak.id]; // Get the aura data for each RAK
              return (
                <li key={rak.id} className="rak-item">
  <div className="rak-header-box">
    <div className="rak-header">
      <div className="rak-badge">
        {aura && aura.badgeImage && (
          <img
            src={aura.badgeImage}
            alt={`${aura.level} Badge`}
            className="badge-img"
          />
        )}
        {aura && <p className="rak-level">{aura.level}</p>}
      </div>
      <p className="rak-username">Posted by: {rak.username}</p>
    </div>
  </div>
  <h3 className="rak-title">{rak.title}</h3>
  <p className="rak-description">{rak.description}</p>
  <p className="rak-type">Type: {rak.rak_type}</p>
  <p className="rak-action">Action: {rak.action}</p>
  <p className="rak-status">Status: {rak.status}</p>
  <p className="rak-aura-points">Aura Points: {rak.aura_points_value}</p>
</li>

              );
            })}
          </ul>
        ) : (
          <p>No RAKs available.</p>
        )}
      </section>
      <pixel-canvas
        data-gap="20"
        data-speed="15"
        data-colors="#6a0dad, #ff4500, #ffd700, #87ceeb"
      ></pixel-canvas>
    </div>
  );
};

export default RAKList;
