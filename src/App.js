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
import SPProfilePage from "./components/SPProfilePage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PassRecoveryPage from "./components/PassRecoveryPage.jsx";
import TypeManagmentPage from "./components/TypeManagmentPage.jsx";
import UpcomingAppointmentsPage from "./components/UpcomingAppointmentsPage.jsx";
import AvailabilityManagmentPage from "./components/AvailabilityManagmentPage.jsx";
import ArchivePage from "./components/ArchivePage.jsx";

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
                <Route path="/profile" element={<SPProfilePage/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/pass-recovery" element={<PassRecoveryPage/>} />
                <Route path="/type-managment" element={<TypeManagmentPage/>} />
                <Route path="/upcoming-appointments" element={<UpcomingAppointmentsPage/>} />
                <Route path="/availability-managment" element={<AvailabilityManagmentPage/>} />
                <Route path="/archive" element={<ArchivePage/>} />
            </Routes>
        </>
    );
};
export default App;
