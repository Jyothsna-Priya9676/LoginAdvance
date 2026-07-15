import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/auth.css";


const ResetPassword = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: localStorage.getItem("resetEmail") || "",
        otp: "",
        newPassword: "",
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
                "/reset-password",
                formData
            );


            setMessage(response.data.message);



            setTimeout(() => {

                localStorage.removeItem("resetEmail");

                navigate("/login");

            }, 1000);



        } catch(error) {


            setMessage(
                error.response?.data?.message ||
                "Password reset failed"
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
                    Reset Password
                </h2>



                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={formData.email}

                    onChange={handleChange}

                />



                <input

                    type="text"

                    name="otp"

                    placeholder="Enter OTP"

                    value={formData.otp}

                    onChange={handleChange}

                />



                <input

                    type="password"

                    name="newPassword"

                    placeholder="New Password"

                    value={formData.newPassword}

                    onChange={handleChange}

                />



                <button type="submit">

                    Reset Password

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


export default ResetPassword;