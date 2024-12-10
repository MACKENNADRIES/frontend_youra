import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import CreateRAKPage from "./pages/CreateRAKPage.jsx";
import Login from "./pages/Login.jsx";
import RAKDetailsPage from "./pages/RAKDetailsPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import Navbar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import RAKList from "./pages/RAKList.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ContactPage from './pages/ContactPage.jsx';
import MyRaks from './pages/MyRakLists.jsx';



// Layout for pages WITH Navbar
const NavbarLayout = () => {
    return (
        <div>
            <Navbar />
        </div>
    );
};

// Layout for pages WITHOUT Navbar
const NoNavbarLayout = () => {
    return (
        <div>
            {/* Only render the child content */}
            <Outlet />
        </div>
    );
};

// Router Configuration
const router = createBrowserRouter([
    {
        path: "/",
        element: <NoNavbarLayout />, // Layout without Navbar
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/home", element: <HomePage /> },
        ],
    },
    {
        path: "/",
        element: <NavbarLayout />, // Layout with Navbar
        errorElement: <ErrorPage />,
        children: [
            { path: "/rak/:id", element: <RAKDetailsPage /> },
            { path: "/leaderboard", element: <LeaderboardPage /> },
            {
                path: "/profile", // Dynamic route for user profile with 'id'
                element: <UserProfilePage />,
            },
            { path: "/create-rak", element: <CreateRAKPage /> },
            { path: "/all", element: <RAKList /> },
            { path: "/my-raks",element: <MyRaks/>},
            { path: "/contact", element: <ContactPage /> },
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
