import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRakPage.css";

const CreateRAKPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        rak_type: "",
        action: "",
        aura_points_value: 10,
        private: false,
        anonymous_rak: false,
    });

    const [dotsState, setDotsState] = useState(""); // Default: dots visible and settling
    const navigate = useNavigate();

    // Trigger dots to hide after settling
    useEffect(() => {
        const timeout = setTimeout(() => setDotsState("dots-hidden"), 2000); // Matches dotSettle duration
        return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("authToken");

            const response = await fetch("http://localhost:8000/rak/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error creating RAK:", errorData);
                alert(`Failed to create RAK: ${errorData.detail || "Unknown error"}`);
                return;
            }

            const responseData = await response.json();
            console.log("RAK created successfully:", responseData);

            // Trigger dots falling animation
            setDotsState("dots-falling");

            // Reset dots to hidden after falling animation finishes
            setTimeout(() => {
                setDotsState("dots-hidden");
                navigate("/home");
            }, 3000); // Matches dotFallOff duration
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred while creating the RAK.");
        }
    };

    return (
        <div className="create-rak-page">
            <div className="form-container">
                {/* Dots Container */}
                <div className={`rectangle ${dotsState}`}>
                    {Array.from({ length: 220 }, (_, i) => (
                        <span key={i} className="dot"></span>
                    ))}
                </div>

                <div className="header-bar">Create a Random Act of Kindness</div>
                {/* Form */}
                <form className="create-rak-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Title"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        placeholder="Description"
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="rak_type"
                        value={formData.rak_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="offer">Offer</option>
                        <option value="request">Request</option>
                    </select>
                    <input
                        type="text"
                        name="action"
                        value={formData.action}
                        placeholder="Action Required"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="aura_points_value"
                        value={formData.aura_points_value}
                        placeholder="Aura Points Value"
                        onChange={handleChange}
                        min="1"
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="private"
                            checked={formData.private}
                            onChange={handleChange}
                        />
                        Private
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="anonymous_rak"
                            checked={formData.anonymous_rak}
                            onChange={handleChange}
                        />
                        Post Anonymously
                    </label>
                    <button type="submit">Create RAK</button>
                </form>
            </div>
        </div>
    );
};

export default CreateRAKPage;
