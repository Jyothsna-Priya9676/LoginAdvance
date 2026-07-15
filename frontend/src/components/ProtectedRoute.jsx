import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {

    const { user, loading } = useAuth();


    // Wait until checking authentication
    if (loading) {
        return (
            <h2>
                Loading...
            </h2>
        );
    }


    // If user exists, show page
    // Otherwise redirect to login
    return user ? children : <Navigate to="/login" />;

};


export default ProtectedRoute;