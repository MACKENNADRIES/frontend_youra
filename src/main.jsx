import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Login.jsx";
import RAKDetailsPage from "./pages/RAKDetailsPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import Navbar from "./components/NavBar.jsx";

const router = createBrowserRouter([
    {        path: "/",
        element: <Navbar />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/rak/:id", element: <RAKDetailsPage /> },
            { path: "/leaderboard", element: <LeaderboardPage /> },
            { path: "/profile", element: <UserProfilePage /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
