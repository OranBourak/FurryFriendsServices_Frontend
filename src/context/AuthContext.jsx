// Create a context to manage the authentication state
import React, {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth=()=> {
    return useContext(AuthContext);
};

const storedUser = localStorage.getItem("user");
const initialAuthState = storedUser ? JSON.parse(storedUser) : null;

export const AuthProvider=({children}) => {
    const [loggedIn, setLoggedIn] = useState(storedUser);
    const [userData, setUserData] = useState(initialAuthState);


    const login = (name, token, email, id, userType) => {
        const user = {
            id,
            name,
            token,
            userType,
            email,
        };
        localStorage.setItem("user", JSON.stringify(user)); // Example: Set a user in localStorage
        setUserData(user);
        console.log(userData);
        setLoggedIn(true);
    };

    const logout = () => {
    // Perform logout logic here
        localStorage.removeItem("user"); // Example: Remove user from localStorage
        setUserData(null); // Clear user data
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{loggedIn, login, logout, userData}}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
