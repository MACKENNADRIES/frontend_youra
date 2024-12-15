import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const location = useLocation();

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back(); // Navigate to the previous page
        } else {
            window.location.href = "/home"; // Fallback to the home page
        }
    };

    return (
        <div>
            {/* 8-bit styled Navbar */}
            <nav className="navbar">
                <ul className="navbar-list">
                    <li>
                        <a
                            href="/home"
                            className={`navbar-link ${
                                location.pathname === "/home" ? "active" : ""
                            }`}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/discover"
                            className={`navbar-link ${
                                location.pathname === "/discover" ? "active" : ""
                            }`}
                        >
                            Discover
                        </a>
                    </li>
                    <li>
                        <a
                            href="/create"
                            className={`navbar-link ${
                                location.pathname === "/create" ? "active" : ""
                            }`}
                        >
                            Create
                        </a>
                    </li>
                    <li>
                        <a
                            href="/profile"
                            className={`navbar-link ${
                                location.pathname === "/profile" ? "active" : ""
                            }`}
                        >
                            Profile
                        </a>
                    </li>
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
