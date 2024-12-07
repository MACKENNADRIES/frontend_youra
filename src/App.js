import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import LoginPage from "./Login.jsx";
import HomePage from "./HomePage.jsx";
import RAKDetailsPage from "./RAKDetailsPage.jsx";
import RAKList from "./RAKList.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/rak/:id" element={<RAKDetailsPage />} />
        <Route path="/all" element={<RAKList />} />
      </Routes>
    </Router>
  );
};

export default App;
