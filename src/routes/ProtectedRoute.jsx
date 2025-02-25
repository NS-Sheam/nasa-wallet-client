import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoute = ({ roles }) => {
    const { user } = useAppSelector((state) => state.auth);

    // If the user is not logged in, redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If the user's role is not allowed, redirect to the appropriate dashboard
    if (roles.length && !roles.includes(user.role)) {
        switch (user.role) {
            case "customer":
                return <Navigate to="/dashboard" />;
            case "agent":
                return <Navigate to="/agent/dashboard" />;
            case "admin":
                return <Navigate to="/admin/dashboard" />;
            default:
                return <Navigate to="/login" />;
        }
    }

    // If the user's role is allowed, render the nested routes
    return <Outlet />;
};

export default ProtectedRoute;