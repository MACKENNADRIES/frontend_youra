// import React, { useEffect, useState } from "react";

// const UserProfile = ({ id }) => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`https://youra-ddaa03c13e4e.herokuapp.com/users/profile/${id}/`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile.");
//         }
//         const data = await response.json();
//         setProfileData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchUserProfile();
//     }
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="profile-container">
//       <h1>{profileData.user.username}</h1>
//       <p>Email: {profileData.user.email}</p>
//       <p>Aura Points: {profileData.aura_points}</p>
//       <p>Level: {profileData.aura_level}</p>
//       <p>Color: {profileData.aura_color}</p>
//       <div>
//         <h3>Breakdown:</h3>
//         <p>Claiming: {profileData.points_from_claiming_percentage}%</p>
//         <p>Pay It Forward: {profileData.points_from_pay_it_forward_percentage}%</p>
//         <p>Offers: {profileData.points_from_offers_percentage}%</p>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
