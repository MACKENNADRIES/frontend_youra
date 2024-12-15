import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back(); // Navigate to the previous page
        } else {
            window.location.href = "/home"; // Fallback to the home page
        }
    };

    return (
        <div>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li><a href="/home" className="navbar-link">Home</a></li>
                    <li><a href="/all" className="navbar-link">Discover</a></li>
                    <li><a href="/create" className="navbar-link">Create</a></li>
                    <li><a href="/profile" className="navbar-link">Profile</a></li>
                    <li>
                        <a
                            href="#"
                            className="navbar-link"
                            onClick={(e) => {
                                e.preventDefault();
                                handleBack();
                            }}
                        >
                            Back
                        </a>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default Navbar;
