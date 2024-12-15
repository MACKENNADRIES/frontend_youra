import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRakPage.css";
import { toast, ToastContainer } from "react-toastify"; // Import toast and container
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

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
    const [formFadeOut, setFormFadeOut] = useState(false); // New state to trigger fade-out
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [formBoxStyle, setFormBoxStyle] = useState({}); // Tracks form-box dimensions

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
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/rak/rak/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error creating RAK:", errorData);
                toast.error(`Failed to create RAK: ${errorData.detail || "Unknown error"}`);
                return;
            }

            toast.success("RAK successfully created!"); // Show success toast
            setTimeout(() => {
                navigate("/home"); // Navigate after showing the toast
            }, 1000); // Delay to allow toast to display
        } catch (error) {
            console.error("Error submitting the form:", error);
            toast.error("An error occurred while creating the RAK.");
        }
    };

    return (
        <div className="create-rak-page">
            {/* ToastContainer for showing toasts */}
            <ToastContainer position="top-center" />
            {/* Form Container */}
            <div className="form-container" ref={formRef}>
            {/* Independent Form Box */}
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

                <div className={`header-bar ${formFadeOut ? 'form-fading' : ''}`}>
    Create a Random Act of Kindness
</div>

<form
    className={`create-rak-form ${formFadeOut ? 'form-fading' : ''}`}
    onSubmit={handleSubmit}
>                <input
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
                        placeholder="What do you need?"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="aura_points_value"
                        value={formData.aura_points_value}
                        placeholder="Aura Points"
                        onChange={handleChange}
                        min="1"
                        max="10"
                    />
                    <div className="checkbox-container">
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
                    <label>
    <input
        type="checkbox"
        name="allow_collaborators"
        checked={formData.allow_collaborators}
        onChange={handleChange}
    />
    Allow Collaborators
</label>
                    </div>
                    <button type="submit">Create RAK</button>
                </form>
            </div>
        </div>
    );
};

export default CreateRAKPage;
