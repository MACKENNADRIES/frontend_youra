// src/api/authApi.js
export const login = async (username, password) => {
    const response = await fetch("https://youra-ddaa03c13e4e.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error("Login failed");
    }
  
    return await response.json(); // Assuming the response includes user details
  };
  
  export const fetchUserProfile = async (id) => {
    const response = await fetch(`https://youra-ddaa03c13e4e.herokuapp.com/users/profile/${id}/`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
  
    return await response.json();
  };
  