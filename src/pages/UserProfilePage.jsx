import React from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";

const UserProfilePage = () => {
  const { id } = useParams(); // Extract 'id' from URL

  return (
    <div>
      <UserProfile id={id} /> {/* Pass 'id' to UserProfile */}
    </div>
  );
};

export default UserProfilePage;
