const API_URL = import.meta.env.VITE_API_URL;

export const getRAKs = async () => {
  try {
    const response = await fetch(`${API_URL}/rak/all/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching RAKs:", err);
    throw err;
  }
};
