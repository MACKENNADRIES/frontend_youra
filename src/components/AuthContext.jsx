import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null); // Store token
  const [user, setUser] = useState(null); // Store user details

  // Function to handle login and store the token
  const login = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
    localStorage.setItem("authToken", token); // Persist token if needed
  };

  // Function to handle logout
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
