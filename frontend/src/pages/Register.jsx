import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const response = await api.post("/register", formData);

            setMessage(response.data.message);

            localStorage.setItem(
                "verifyEmail",
                formData.email
            );

            setTimeout(() => {
                navigate("/verify-otp");
            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <h2>Create Account</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Create Account"}
                </button>

                {message && <p>{message}</p>}

                <p className="auth-switch">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
};

export default Register;
