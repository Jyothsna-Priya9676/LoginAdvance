// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import api from "../services/api";

// import "../styles/auth.css";


// const ResetPassword = () => {

//     const navigate = useNavigate();


//     const [formData, setFormData] = useState({
//         email: localStorage.getItem("resetEmail") || "",
//         otp: "",
//         newPassword: "",
//     });


//     const [message, setMessage] = useState("");



//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });

//     };



//     const handleSubmit = async (e) => {

//         e.preventDefault();


//         try {

//             const response = await api.post(
//                 "/reset-password",
//                 formData
//             );


//             setMessage(response.data.message);



//             setTimeout(() => {

//                 localStorage.removeItem("resetEmail");

//                 navigate("/login");

//             }, 1000);



//         } catch(error) {


//             setMessage(
//                 error.response?.data?.message ||
//                 "Password reset failed"
//             );

//         }

//     };



//     return (

//         <div className="auth-container">


//             <form
//                 className="auth-form"
//                 onSubmit={handleSubmit}
//             >


//                 <h2>
//                     Reset Password
//                 </h2>



//                 <input

//                     type="email"

//                     name="email"

//                     placeholder="Email"

//                     value={formData.email}

//                     onChange={handleChange}

//                 />



//                 <input

//                     type="text"

//                     name="otp"

//                     placeholder="Enter OTP"

//                     value={formData.otp}

//                     onChange={handleChange}

//                 />



//                 <input

//                     type="password"

//                     name="newPassword"

//                     placeholder="New Password"

//                     value={formData.newPassword}

//                     onChange={handleChange}

//                 />



//                 <button type="submit">

//                     Reset Password

//                 </button>



//                 {
//                     message &&
//                     <p>
//                         {message}
//                     </p>
//                 }


//             </form>


//         </div>

//     );

// };


// export default ResetPassword;











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