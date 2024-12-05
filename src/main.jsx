import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import CreateRAKPage from "./pages/CreateRAKPage.jsx";
import Login from "./pages/Login.jsx";
import RAKDetailsPage from "./pages/RAKDetailsPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RAKList from "./pages/RAKList.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        // element: <Navbar />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/home", element: <HomePage /> },
            { path: "/rak/:id", element: <RAKDetailsPage /> },
            { path: "/rak/leaderboard", element: <LeaderboardPage /> },
            { path: "/profile", element: <UserProfilePage /> },
            { path: "/create-rak", element: <CreateRAKPage /> },
            { path: "/all", element: <RAKList /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider> {/* Wrap everything with AuthProvider */}
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
