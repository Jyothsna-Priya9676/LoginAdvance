import { useState } from "react";
import { useNavigate } from "react-router-dom";

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



    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const response = await api.post(
                "/register",
                formData
            );


            setMessage(response.data.message);


            // Save email for OTP page
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

        }

    };



    return (

        <div className="auth-container">


            <form 
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <h2>
                    Create Account
                </h2>



                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />



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
                    Register
                </button>



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


export default Register;