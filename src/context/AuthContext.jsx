// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { login, fetchUserProfile } from "../api/authApi"; // Import API functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store authenticated user state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await login(username, password); // Call login API
      setUser(userData); // Save user data in context
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const profileData = await fetchUserProfile(id); // Call profile API
      setUser(profileData); // Save profile data in context
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, loadUserProfile, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
