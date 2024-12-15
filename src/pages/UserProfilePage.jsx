import React, { useState, useEffect, useRef } from "react";
import "./UserProfile.css"; // Assuming you have CSS for styling
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// Import badge images for aura levels
import InitiatorBadge from "/assets/initiator.png";
import SustainerBadge from "/assets/sustainer.png";
import VisionaryBadge from "/assets/visionary.png";
import CreatorBadge from "/assets/creator.png";
import InnovatorBadge from "/assets/innovator.png";
import AcceleratorBadge from "/assets/accelerator.png";
import TransformerBadge from "/assets/transformer.png";
import HealerBadge from "/assets/healer.png";
import OrchestratorBadge from "/assets/orchestrator.png";
import HarmoniserBadge from "/assets/harmoniser.png";

const API_URL = import.meta.env.VITE_API_URL;

const UserProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auraBadge, setAuraBadge] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // New state for uploaded image
  const [editMode, setEditMode] = useState(false); // New state for edit mode
  const [formData, setFormData] = useState({}); // Form data for editing
  const hasFetchedData = useRef(false);
  const navigate = useNavigate(); // For logout redirection

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
        setFormData({
          username: data.user.username,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
        });
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
    const loadBadgeImage = () => {
      if (!profileData) return;
  
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
  
      const auraPoints = profileData.aura_points;
  
      for (let { range, badgeImage } of auraLevels) {
        if (auraPoints >= range[0] && auraPoints <= range[1]) {
          setAuraBadge(badgeImage); // Directly set the pre-imported badge image
          return; // Exit loop once a match is found
        }
      }
  
      // If no match is found, set a default badge
      setAuraBadge(DefaultBadge);
    };
  
    loadBadgeImage();
  }, [profileData]);
  
  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users/profile/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const updatedData = await response.json();
      setProfileData((prevData) => ({
        ...prevData,
        user: updatedData,
      }));
      setEditMode(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("profile_image", file); // 'profile_image' should match the field in your serializer

      try {
        const response = await fetch(`${API_URL}/users/profile/image-upload/`, {
          method: "PUT",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProfileData((prevData) => ({
          ...prevData,
          profile_picture_url: data.profile_picture_url, // Update the profile picture URL
        }));
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from storage
    navigate("/"); // Redirect the user to the login page
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
<div className="user-profile-page">
  <h1 className="page-title">User Profile</h1>

  {profileData && (
    <div className="profile-container">
      {/* Section 1: Profile Header */}
      <div className="profile-header">
  <div
    className="profile-picture-container"
    style={{ "--glow-color": profileData?.aura_color }}
  >
    <img
      className="profile-picture"
      src={uploadedImage || profileData.profile_image || "default-profile.png"}
      alt="User Profile"
    />
  </div>
  
  <div className="user-info">
  {editMode ? (
    <form onSubmit={handleFormSubmit} className="edit-form">
      <input
        type="text"
        name="username"
        value={formData.username || ''}
        onChange={handleInputChange}
        placeholder={formData.username ? '' : 'Enter your username'}
        required
      />
      <input
        type="text"
        name="first_name"
        value={formData.first_name || ''}
        onChange={handleInputChange}
        placeholder={formData.first_name ? '' : 'Enter your first name'}
        required
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name || ''}
        onChange={handleInputChange}
        placeholder={formData.last_name ? '' : 'Enter your last name'}
      />
      <input
        type="email"
        name="email"
        value={formData.email || ''}
        onChange={handleInputChange}
        placeholder={formData.email ? '' : 'Enter your email'}
        required
      />
      <button type="submit" className="edit-button">Save</button>
      <button type="button" onClick={handleEditToggle} className="edit-button">
        Cancel
      </button>
    </form>
) : (
  <>
    <h2 className="username">
      {profileData.user.username || 'No username provided'}
    </h2>
    <p className="name">
      {profileData.user.first_name || 'First name not provided'}
    </p>
    <p className="surname">
      {profileData.user.last_name || 'Last name not provided'}
    </p>
    <p className="email">
      {profileData.user.email || 'Email not provided'}
    </p>
  </>
)}
</div>

  {/* Button Group */}
  <div className="button-group">
    <label htmlFor="upload-image" className="upload-label">Upload Image</label>
    <input
      id="upload-image"
      type="file"
      onChange={handleImageUpload}
      className="upload-input"
      accept="image/*"
    />
    <button className="edit-button" onClick={handleEditToggle}>
      {editMode ? "Cancel" : "Edit Profile"}
    </button>
    <button onClick={handleLogout} className="logout-button">Logout</button>
  </div>
</div>


      {/* Section 2: Current Level */}
      <div className="current-level">
        <h3 className="level-title">{profileData.aura_level}</h3>
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
  <div className="stat-icon-container">
    <img src="/assets/stat-icon.png" alt="RAK Icon" className="stat-icon" />
  </div>
  <h3 className="section-title">RAK Statistics</h3>
  
  <div className="stat">
    <span>Total Aura Points:</span>
    <strong>{profileData.aura_points}</strong>
  </div>
  
  <div className="stat">
    <span>Points from Claiming:</span>
    <strong>{profileData.points_from_claiming || 0} ({(profileData.points_from_claiming_percentage || 0).toFixed(2)}%)</strong>
  </div>
  
  <div className="stat">
    <span>Points from Pay It Forward:</span>
    <strong>{profileData.points_from_pay_it_forward || 0} ({(profileData.points_from_pay_it_forward_percentage || 0).toFixed(2)}%)</strong>
  </div>
  
  <div className="stat">
    <span>Points from Offers:</span>
    <strong>{profileData.points_from_offers || 0} ({(profileData.points_from_offers_percentage || 0).toFixed(2)}%)</strong>
  </div>
</div>
</div>
  )}
</div>

  );
};

export default UserProfilePage;
