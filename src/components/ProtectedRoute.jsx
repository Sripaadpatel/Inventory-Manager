import React from "react";
import { useNavigate, useParams, Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
    const { userId } = useParams();
    const isAuthenticated = localStorage.getItem("isLoggedIn") == "true";
    const storedUserId = localStorage.getItem("userId");

    if (!isAuthenticated || storedUserId !== userId) {
        return <Navigate to="/Login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
