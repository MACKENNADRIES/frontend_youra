import React, { useState, useEffect, useRef } from "react";
import { getLeaderboard } from "../api/get-leaderboard"; // Import the API call
import "./leaderboard.css"; // Import the CSS file for 8-bit styling

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]); // State to store leaderboard data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const characterRef = useRef(null);

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
  }, []); // Only run on mount

  // Start the animation once data is fetched
  useEffect(() => {
    if (!loading && !error && characterRef.current) {
      characterRef.current.classList.add('run-animation');
    }
  }, [loading, error]); // When loading or error state changes

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="leaderboard-wrapper">
      <div className="animation-container">
        <div className="platform-left">
          <img src="src/assets/jumpplatform.png" alt="Left Platform" />
        </div>
        <div className="platform-middle">
          <img src="src/assets/jumpplatform.png" alt="Middle Platform" />
        </div>
        <div className="platform-right">
          <img src="src/assets/jumpplatform.png" alt="Right Platform" />
        </div>
        <div className="character" ref={characterRef}>
          <img src="src/assets/run1.png" alt="Character Running" className="character-image" />
        </div>
      </div>
      <div className="leaderboard-container">
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Aura Points</th>
              <th>Aura Level</th> {/* Add Aura Level column */}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr
                key={index}
                className={index === 0 ? "rank-1" : ""} // Add 'rank-1' class for the top player
              >
                <td>{index + 1}</td>
                <td>{user.user.username}</td> {/* Access username inside the user object */}
                <td>{user.aura_points}</td>
                <td>{user.aura_level}</td> {/* Access Aura Level */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
