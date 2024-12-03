const API_URL = import.meta.env.VITE_API_URL; 

export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${API_URL}/leaderboard/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    throw err;
  }
};
