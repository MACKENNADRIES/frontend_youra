import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../api/get-leaderboard"; // Import the API call

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]); // State to store leaderboard data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(); // Call the API function
        setLeaderboard(data); // Store data in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchLeaderboard();
  }, []); // Run once on component mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Aura Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.aura_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
