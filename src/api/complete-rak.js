const API_URL = import.meta.env.VITE_API_URL; 

export const completeRAKApiCall = async (rakId) => {
    try {
      const response = await fetch(`${API_URL}/rak/rak/${rakId}/status/`, { 
        method: "POST",  // Assuming POST method for completing the RAK
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ "status":"completed" }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to complete RAK");
      }
  
      return response.json(); // Return the updated RAK data
    } catch (error) {
      console.error("Error completing RAK:", error);
      throw error;
    }
  };
  