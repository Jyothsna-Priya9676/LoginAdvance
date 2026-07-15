import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/navbar.css";


const Navbar = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();


    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };


    return (

        <nav className="navbar">

            <div className="logo">
                <Link to="/">
                    AuthApp
                </Link>
            </div>



            <div className="nav-links">


                {
                    user ? (

                        <>

                            <Link to="/profile">
                                Profile
                            </Link>


                            <button onClick={handleLogout}>
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link to="/login">
                                Login
                            </Link>


                            <Link to="/register">
                                Register
                            </Link>

                        </>

                    )

                }


            </div>


        </nav>

    );

};


export default Navbar;