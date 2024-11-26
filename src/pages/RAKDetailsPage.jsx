import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import HomePage from "../pages/HomePage.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/rak/:id", element: <RAKDetailsPage /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
