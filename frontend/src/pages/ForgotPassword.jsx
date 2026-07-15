import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/auth.css";


const ForgotPassword = () => {

    const navigate = useNavigate();


    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const response = await api.post(
                "/forgot-password",
                {
                    email
                }
            );


            setMessage(response.data.message);



            // Store email for reset page
            localStorage.setItem(
                "resetEmail",
                email
            );


            setTimeout(() => {

                navigate("/reset-password");

            }, 1000);



        } catch(error) {


            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
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
                    Forgot Password
                </h2>



                <input

                    type="email"

                    placeholder="Enter Email"

                    value={email}

                    onChange={(e)=>
                        setEmail(e.target.value)
                    }

                />



                <button type="submit">

                    Send OTP

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


export default ForgotPassword;