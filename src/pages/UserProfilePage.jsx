import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const UserProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${API_URL}/users/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleImageUpload = (event) => {
    console.log("Image uploaded:", event.target.files[0]);
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-profile-page">
      <h1 className="page-title">User Profile</h1>
      {profileData && (
        <div className="profile-container">
          {/* Section 1: Username and Display Picture */}
          <div className="profile-header">
            <div className="user-info">
              <h2 className="username">{profileData.user.username}</h2>
              <p className="email">{profileData.user.email}</p>
            </div>
            <div className="image-upload">
              <label htmlFor="upload-image" className="upload-label">
                Upload Display Picture
              </label>
              <input
                id="upload-image"
                type="file"
                onChange={handleImageUpload}
                className="upload-input"
              />
            </div>
          </div>

          {/* Section 2: Current Level and Badge */}
          <div
            className="current-level"
            style={{ backgroundColor: profileData.aura_color }}
          >
            <h3 className="level-title">
              Current Level: {profileData.aura_level}
            </h3>
            <p className="badge-title">Badge: {profileData.aura_sub_level}</p>
            <img
              src="/path/to/current-badge-image.png" // Replace with actual badge image URL
              alt="Current Badge"
              className="current-badge"
            />
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
              <strong>Points from Claiming:</strong>{" "}
              {profileData.points_from_claiming} (
              {profileData.points_from_claiming_percentage.toFixed(2)}%)
            </p>
            <p className="stat">
              <strong>Points from Pay It Forward:</strong>{" "}
              {profileData.points_from_pay_it_forward} (
              {profileData.points_from_pay_it_forward_percentage.toFixed(2)}%)
            </p>
            <p className="stat">
              <strong>Points from Offers:</strong>{" "}
              {profileData.points_from_offers} (
              {profileData.points_from_offers_percentage.toFixed(2)}%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
