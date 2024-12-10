const API_URL = import.meta.env.VITE_API_URL;

export const getPostedRAKs = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await fetch(`${API_URL}/rak/my-posted-raks/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // Add the token to the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching posted RAKs:", err);
    throw err;
  }
};
