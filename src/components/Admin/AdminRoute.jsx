import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

    return isAuthenticated ? children : <Navigate to="/admin" />;
};

export default AdminRoute;
