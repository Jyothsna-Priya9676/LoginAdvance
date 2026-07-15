// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// function AuthProvider({ children }) {

//     const [user, setUser] = useState(null);

//     const [accessToken, setAccessToken] = useState("");

//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     return (

//         <AuthContext.Provider
//             value={{

//                 user,
//                 setUser,

//                 accessToken,
//                 setAccessToken,

//                 isLoggedIn,
//                 setIsLoggedIn

//             }}
//         >

//             {children}

//         </AuthContext.Provider>

//     );

// }

// export default AuthProvider;


import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);



    // Check user when application starts
    useEffect(() => {

        checkUser();

    }, []);



    // Get logged-in user profile
  const checkUser = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

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

        console.log(error);

        setUser(null);

    } finally {

        setLoading(false);

    }

};
    // Logout
    const login = async (email, password) => {

    const response = await api.post(
        "/login",
        {
            email,
            password,
        }
    );

    const token = response.data.token;

    localStorage.setItem("token", token);

    await checkUser();

    return response.data;

};
    const logout = async () => {

        try {

            await api.post("/logout");

        }

        catch(error){

            console.log(error);

        }


        localStorage.removeItem("token");

        setUser(null);

    };



    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};



// Custom hook
export const useAuth = () => {

    return useContext(AuthContext);

};