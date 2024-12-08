import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <div>
            {/* 8-bit styled Navbar */}
            <nav className="navbar">
                <ul className="navbar-list">
                    <li><a href="/home" className="navbar-link">Home</a></li>
                    <li><a href="/discover" className="navbar-link">Discover</a></li>
                    <li><a href="/create" className="navbar-link">Create</a></li>
                    <li><a href="/profile" className="navbar-link">Profile</a></li>
                    
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default Navbar;
