import React, { useState, useEffect, useRef } from "react";
import "./UserProfile.css"; // Assuming you have CSS for styling
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const API_URL = import.meta.env.VITE_API_URL;

const UserProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auraBadge, setAuraBadge] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // New state for uploaded image
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current) return;

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/users/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProfileData(data);
        hasFetchedData.current = true;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const loadBadgeImage = async () => {
      if (!profileData) return;

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

      const auraPoints = profileData.aura_points;

      for (let { range, level } of auraLevels) {
        if (auraPoints >= range[0] && auraPoints <= range[1]) {
          try {
            const image = await import(
              `../assets/${level.toLowerCase().replace(" ", "-")}.png`
            );
            setAuraBadge(image.default);
          } catch (error) {
            console.error(`Error loading image for ${level}:`, error);
            setAuraBadge("/assets/default-badge.png");
          }
          break;
        }
      }
    };

    loadBadgeImage();
  }, [profileData]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result); // Update state with the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile-page">
      <h1 className="page-title">User Profile</h1>
      {profileData && (
        <div className="profile-container">
<div className="profile-header">
  <div className="user-info">
    <h2 className="username">{profileData.user.username}</h2>
    <p className="email">{profileData.user.email}</p>
  </div>
  <div
    className="profile-picture-container"
    style={{ "--glow-color": profileData?.aura_color }}
  >
    <img
      className="profile-picture"
      src={uploadedImage || profileData.profile_picture_url || "default-profile.png"}
      alt="User Profile"
    />
  </div>
  <div className="image-upload">
    <label htmlFor="upload-image" className="upload-label">
      Upload
    </label>
    <input
      id="upload-image"
      type="file"
      onChange={handleImageUpload}
      className="upload-input"
      accept="image/*"
    />
  </div>
</div>


          {/* Section 2: Current Level and Badge */}
          <div className="current-level">
            <h3 className="level-title">{profileData.aura_level}</h3>
            <p className="badge-title"></p>
            {auraBadge ? (
              <img
                src={auraBadge}
                alt={`${profileData.aura_level} Badge`}
                className="current-badge"
              />
            ) : (
              <p>Loading badge...</p>
            )}
          </div>

          {/* Section 3: Earned Badges */}
          <div className="earned-badges">
            <h3 className="section-title">Past Badges</h3>
            <div className="badges-container">
              {profileData.badges?.length > 0 ? (
                profileData.badges.map((badge, index) => (
                  <img
                    key={index}
                    src={badge.imageUrl}
                    alt={`Badge ${index + 1}`}
                    className="badge-image"
                  />
                ))
              ) : (
                <p className="no-badges">No badges earned yet.</p>
              )}
            </div>
          </div>

          {/* Section 4: RAK Statistics */}
          <div className="rak-statistics">
            <h3 className="section-title">RAK Statistics</h3>
            <p className="stat">
              <strong>Total Aura Points:</strong> {profileData.aura_points}
            </p>
            <p className="stat">
              <strong>Points from Claiming:</strong> {profileData.points_from_claiming || 0} (
              {(profileData.points_from_claiming_percentage || 0).toFixed(2)}%)
            </p>
            <p className="stat">
              <strong>Points from Pay It Forward:</strong>{" "}
              {profileData.points_from_pay_it_forward} (
              {profileData.points_from_pay_it_forward_percentage.toFixed(2)}%)
            </p>
            <p className="stat">
              <strong>Points from Offers:</strong> {profileData.points_from_offers} (
              {profileData.points_from_offers_percentage.toFixed(2)}%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
