import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null; // OR a loader like <div>Loading...</div>

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}
export default PrivateRoute;