import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Navbar"; // Adjust the path as per your project structure
import HomePage from "./HomePage";
import RAKDetailsPage from "./RAKDetailsPage";

function App() {
    // Define all routes here
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar />, // Navbar wraps the routed pages
            children: [
                { path: "/", element: <HomePage /> }, // Home Page Route
                { path: "/rak/:id", element: <RAKDetailsPage /> }, // RAK Details Route
            ],
        },
    ]);

    return (
        // Use RouterProvider to connect the router to the app
        <RouterProvider router={router} />
    );
}

export default App;
