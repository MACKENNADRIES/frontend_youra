import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import LoginPage from "./Login.jsx";
import HomePage from "./HomePage.jsx";
import RAKDetailsPage from "./RAKDetailsPage.jsx";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // List of routes where the Navbar should not appear
  const noNavbarRoutes = ["/", "/home"];

  return (
    <>
      {/* Render Navbar only if the current route is not in noNavbarRoutes */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Public Login Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Home Page */}
        <Route path="/home" element={<HomePage />} />

        {/* RAK Details Page */}
        <Route path="/rak/:id" element={<RAKDetailsPage />} />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
