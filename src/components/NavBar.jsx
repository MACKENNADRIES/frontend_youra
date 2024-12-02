import React from "react";
import { Outlet } from "react-router-dom";

function Navbar() {
    return (
        <div>
            {/* Navbar content */}
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/rak/1">RAK Details</a></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default Navbar;
