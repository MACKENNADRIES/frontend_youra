export const completeRAKApiCall = async (rakId) => {
    try {
      const response = await fetch(`/api/raks/${rakId}/complete`, { 
        method: "POST",  // Assuming POST method for completing the RAK
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
  