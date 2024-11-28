import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RAKDetailsPage() {
    const { id } = useParams(); // Extract the RAK ID from the URL
    const [rakDetails, setRakDetails] = useState(null); // State to hold RAK details
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    // Fetch the RAK details from your backend or API
    useEffect(() => {
        async function fetchRAKDetails() {
            try {
                const response = await fetch(`/api/raks/${id}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch RAK details.");
                }
                const data = await response.json();
                setRakDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRAKDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!rakDetails) {
        return <p>No details found for this RAK.</p>;
    }

    return (
        <div>
            <h1>RAK Details</h1>
            <p><strong>ID:</strong> {rakDetails.id}</p>
            <p><strong>Title:</strong> {rakDetails.title}</p>
            <p><strong>Description:</strong> {rakDetails.description}</p>
            <p><strong>Status:</strong> {rakDetails.status}</p>
            <p><strong>Creator:</strong> {rakDetails.creator}</p>
            {/* Add more fields as needed */}
        </div>
    );
}

export default RAKDetailsPage;
