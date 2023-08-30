/* eslint-disable linebreak-style */
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "./components/NavbarCustom.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import {useState} from "react";
import LoginAlert from "./components/LoginAlert.jsx";
import Home from "./components/Home.jsx";
import {Routes, Route, Navigate} from "react-router-dom";

/**
 * Pet Service application
 *
 * @return {null}
 */
function App() {
    const [loggedInUserName, setLoggedInUsername] = useState("");

    const handleLogin = (user) => {
        setLoggedInUsername(user);
    };
    return (
        <>
            <NavbarCustom />
            {loggedInUserName && <Navigate to="login-alert"/>}
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
                <Route path="/login-alert" element={<LoginAlert name={loggedInUserName}/>} />
                <Route path="/signup" element={<RegisterPage/>} />
            </Routes>
        </>
    );
};
export default App;
