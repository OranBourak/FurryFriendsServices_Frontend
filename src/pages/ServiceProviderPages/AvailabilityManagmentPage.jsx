import React from "react";
import MeetingCalendar from "../../components/ServiceProviderComponents/MeetingCalendar.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";

/**
 * Availability Managment page component.
 * @return {React.Component} - The Availability Managment component.
 */
function AvailabilityManagmentPage() {
    const {loggedIn, userData} = useAuth();
    // Redirect if not logged in
    if (!loggedIn) {
        return <Navigate to="/" />;
    }

    // Redirect if user type is not serviceProvider
    if (userData.userType !== "serviceProvider") {
        return <Navigate to="/error" />;
    }
    return (
        <>
            <MeetingCalendar />
        </>
    );
}

export default AvailabilityManagmentPage;
