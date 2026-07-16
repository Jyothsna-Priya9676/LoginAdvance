import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";


const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const [message, setMessage] = useState("");



    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            await login(
                formData.email,
                formData.password
            );


            setMessage("Login Successful");


            console.log("Login successful");


            navigate("/profile");


        } catch(error) {


            setMessage(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };



    return (

        <div className="auth-container">


            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >


                <h2>
                    Login
                </h2>



                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={formData.email}

                    onChange={handleChange}

                />



                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={formData.password}

                    onChange={handleChange}

                />



                <button type="submit">

                    Login

                </button>



                <Link to="/forgot-password">

                    Forgot Password?

                </Link>



                {
                    message &&
                    <p>
                        {message}
                    </p>
                }


            </form>


        </div>

    );

};


export default Login;