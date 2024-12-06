import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRakPage.css";

const API_URL = import.meta.env.VITE_API_URL;

const CreateRAKPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        rak_type: "",
        action: "",
        aura_points_value: 10,
        private: false,
        anonymous_rak: false,
        collaborators: [], // New field for collaborators
    });

    const [collaboratorInput, setCollaboratorInput] = useState("");
    const [dotsState, setDotsState] = useState(""); // Default: dots visible and settling
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [formBoxStyle, setFormBoxStyle] = useState({}); // Tracks form-box dimensions

    useEffect(() => {
        // Dynamically adjust the box to match the form size and position
        const updateBoxSize = () => {
            if (formRef.current) {
                const rect = formRef.current.getBoundingClientRect();
                setFormBoxStyle({
                    // width: `${rect.width}px`,
                    // height: `${rect.height}px`,
                    // top: `${rect.top}px`,
                    // left: `${rect.left}px`,
                    // position: "absolute", // Ensures alignment
                });
            }
        };

        updateBoxSize(); // Initial size update
        window.addEventListener("resize", updateBoxSize); // Update on resize
        return () => window.removeEventListener("resize", updateBoxSize);
    }, []);

    // useEffect(() => {
    //     // Trigger dots to hide after settling
    //     const timeout = setTimeout(() => setDotsState("dots-hidden"), 2000); // Matches dotSettle duration
    //     return () => clearTimeout(timeout); // Cleanup timeout on unmount
    // }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleCollaboratorInputChange = (e) => {
        setCollaboratorInput(e.target.value);
    };

    const handleAddCollaborator = () => {
        if (collaboratorInput.trim() && !formData.collaborators.includes(collaboratorInput)) {
            setFormData({
                ...formData,
                collaborators: [...formData.collaborators, collaboratorInput.trim()],
            });
            setCollaboratorInput("");
        }
    };

    const handleRemoveCollaborator = (collaborator) => {
        setFormData({
            ...formData,
            collaborators: formData.collaborators.filter((c) => c !== collaborator),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("authToken");

            const response = await fetch(`${API_URL}/rak/`, {
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
                // setDotsState("dots-hidden");
                navigate("/home");
            }, 3000); // Matches dotFallOff duration
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred while creating the RAK.");
        }
    };

    return (
        <div className="create-rak-page">
            {/* Form Container */}
            <div className="form-container" ref={formRef}>
            {/* Independent Form Box */}
            <div className="form-box"></div>
                {/* Dots Container */}
                <div className={`rectangle ${dotsState}`}>
                    {Array.from({ length: 600 }, (_, i) => (
                        <span 
                            key={i} 
                            className="dot" 
                            style={{ 
                                animationDuration: `${0.1 + Math.random() * 1}s`, // Random speed: 0.1s to 1s
                                animationDelay: `${Math.random() * 1.5}s` // Staggered delay: 0-3s
                            }} 
                        ></span>
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

                    {/* Collaborators Section */}
                    <div className="collaborators-section">
                        <h3>Allow Collaborators</h3>
                        <input
                            type="text"
                            value={collaboratorInput}
                            placeholder="Add Collaborator (e.g., username)"
                            onChange={handleCollaboratorInputChange}
                        />
                        <button type="button" onClick={handleAddCollaborator}>
                            Add
                        </button>
                        <ul>
                            {formData.collaborators.map((collaborator, index) => (
                                <li key={index}>
                                    {collaborator}{" "}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCollaborator(collaborator)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button type="submit">Create RAK</button>
                </form>
            </div>
        </div>
    );
};

export default CreateRAKPage;
