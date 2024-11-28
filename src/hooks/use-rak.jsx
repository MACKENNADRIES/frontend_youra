import { useState, useEffect } from "react";
import getRAK from "../api/get-rak"; // Adjust the path based on your file structure

/**
 * Custom hook to fetch and manage the state of a specific RAK
 * @param {string} rakId - The ID of the RAK to fetch
 * @returns {Object} - An object containing the RAK data, loading state, and error state
 */
export default function useRAK(rakId) {
  const [rak, setRak] = useState(null); // State for the fetched RAK data
  const [isLoading, setIsLoading] = useState(true); // State for the loading indicator
  const [error, setError] = useState(null); // State for handling errors

useEffect(() => {
    // If no rakId is provided, don't attempt to fetch data
    if (!rakId) {
        setIsLoading(false);
        setRak(null);
        setError(new Error("No RAK ID provided."));
        return;
    }

    // Fetch the RAK data from the backend
    setIsLoading(true); // Set loading to true before making the API call
    getRAK(rakId)
        .then((data) => {
            setRak(data); // Update the rak state with the fetched data
            setError(null); // Clear any previous errors
        })
        .catch((err) => {
            setError(err); // Set the error state if the fetch fails
            setRak(null); // Clear the rak state
        })
        .finally(() => {
            setIsLoading(false); // Stop the loading indicator
    });
  }, [rakId]); // Re-run the effect whenever the rakId changes

  // Return the RAK data, loading state, and error state
    return { rak, isLoading, error };
}
