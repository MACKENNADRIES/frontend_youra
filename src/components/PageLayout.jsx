import React from "react";
import BackButton from "./BackButton"; // The reusable back button
import "./PageLayout.module.css"; // Optional: Add styling for the layout

const PageLayout = ({ children }) => {
    return (
        <div className="page-layout">
            <BackButton /> {/* BackButton appears consistently across pages */}
            <div className="page-content">{children}</div>
        </div>
    );
};

export default PageLayout;
