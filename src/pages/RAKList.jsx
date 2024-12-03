import React, { useState, useEffect } from "react";
import { getRAKs } from "../api/get-raks"; // Import the API function

const RAKList = () => {
  const [raks, setRaks] = useState([]); // State to store fetched RAKs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Random Acts of Kindness</h1>
      <ul>
        {raks.map((rak) => (
          <li key={rak.id}>
            <h2>{rak.title}</h2>
            <p>{rak.description}</p>
            <p>Type: {rak.rak_type}</p>
            <p>Action: {rak.action}</p>
            <p>Status: {rak.status}</p>
            <p>Aura Points: {rak.aura_points_value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RAKList;
