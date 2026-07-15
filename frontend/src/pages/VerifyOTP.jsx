import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/auth.css";


const VerifyOTP = () => {

    const navigate = useNavigate();


    const [otp, setOtp] = useState("");

    const [message, setMessage] = useState("");



    const email = localStorage.getItem("verifyEmail");



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const response = await api.post(
                "/verify-otp",
                {
                    email,
                    otp
                }
            );


            setMessage(response.data.message);



            setTimeout(() => {

                localStorage.removeItem("verifyEmail");

                navigate("/login");

            }, 1000);



        } catch(error) {


            setMessage(
                error.response?.data?.message ||
                "OTP verification failed"
            );

        }

    };



    const resendOTP = async () => {

        try {

            const response = await api.post(
                "/resend-otp",
                {
                    email
                }
            );


            setMessage(response.data.message);


        } catch(error) {

            setMessage(
                error.response?.data?.message ||
                "Unable to resend OTP"
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
                    Verify OTP
                </h2>


                <p>
                    OTP sent to {email}
                </p>



                <input

                    type="text"

                    placeholder="Enter OTP"

                    value={otp}

                    onChange={(e)=>
                        setOtp(e.target.value)
                    }

                />



                <button type="submit">
                    Verify
                </button>



                <button
                    type="button"
                    onClick={resendOTP}
                >
                    Resend OTP
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


export default VerifyOTP;