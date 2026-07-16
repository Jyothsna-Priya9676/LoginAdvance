import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/auth.css";

const Profile = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [message, setMessage] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data.user);

            } catch (error) {

                setMessage(
                    error.response?.data?.message ||
                    "Failed to Load Profile"
                );

            }

        };

        fetchProfile();

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    if (!user) {

        return (
            <div className="auth-container">

                <div className="auth-form">

                    <h2>Loading...</h2>

                    {message && <p>{message}</p>}

                </div>

            </div>
        );

    }

    return (

        <div className="auth-container">

            <div className="auth-form">

                <h2>Profile</h2>

                <p>
                    <strong>Name:</strong> {user.name}
                </p>

                <p>
                    <strong>Email:</strong> {user.email}
                </p>

                <p>
                    <strong>Verified:</strong>{" "}
                    {user.isVerified ? "Yes" : "No"}
                </p>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>

    );

};

export default Profile;