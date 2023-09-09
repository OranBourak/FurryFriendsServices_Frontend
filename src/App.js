/* eslint-disable linebreak-style */
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "./components/ServiceProviderComponents/NavbarCustom.jsx";
import RegisterPage from "./pages/ServiceProviderPages/RegisterPage.jsx";
import LoginPage from "./pages/ServiceProviderPages/LoginPage.jsx";
import {useState} from "react";
import LoginAlert from "./components/ServiceProviderComponents/LoginAlert.jsx";
import Home from "./pages/ServiceProviderPages/HomePage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import SPProfilePage from "./pages/ServiceProviderPages/SPProfilePage.jsx";
import Dashboard from "./pages/ServiceProviderPages/DashboardPage.jsx";
import PassRecoveryPage from "./pages/ServiceProviderPages/PassRecoveryPage.jsx";
import TypeManagmentPage from "./pages/ServiceProviderPages/TypeManagmentPage.jsx";
import UpcomingAppointmentsPage from "./pages/ServiceProviderPages/UpcomingAppointmentsPage.jsx";
import AvailabilityManagmentPage from "./pages/ServiceProviderPages/AvailabilityManagmentPage.jsx";
import ArchivePage from "./pages/ServiceProviderPages/ArchivePage.jsx";
import AppointmentManagmentPage from "./pages/ServiceProviderPages/AppointmentManagmentPage.jsx";
import ClientRegistrationForm from "./components/client_components/ClientRegistrationForm.jsx";
import ClientDashboardPage from "./pages/ClientPages/ClientDashboardPage.jsx";
import SearchServicePage from "./pages/ClientPages/SearchServicePage.jsx";
<<<<<<< HEAD
import ErrorPage from "./pages/ServiceProviderPages/ErrorPage.jsx";
=======
import ProviderProfilePage from "./pages/ClientPages/ProviderProfilePage.jsx";
>>>>>>> 8b3ad96fa981d3138568713788c5b5012f617080

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
                <Route path="/provider-signup" element={<RegisterPage/>} />
                <Route path="/profile" element={<SPProfilePage/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/pass-recovery" element={<PassRecoveryPage/>} />
                <Route path="/type-managment" element={<TypeManagmentPage/>} />
                <Route path="/upcoming-appointments" element={<UpcomingAppointmentsPage/>} />
                <Route path="/availability-managment" element={<AvailabilityManagmentPage/>} />
                <Route path="/archive" element={<ArchivePage/>} />
                <Route path="/appointment-managment" element={<AppointmentManagmentPage/>} />
                <Route path="/clientSignup" element={<ClientRegistrationForm/>} />
                <Route path="/client-dash-board" element={<ClientDashboardPage/>} />
                <Route path="/Search-service" element={<SearchServicePage/>} />
<<<<<<< HEAD
                <Route path="/error" element={<ErrorPage/>} />
=======
                <Route path="/provider-profile/:id" element={<ProviderProfilePage />} />
>>>>>>> 8b3ad96fa981d3138568713788c5b5012f617080
            </Routes>
        </>
    );
};
export default App;
