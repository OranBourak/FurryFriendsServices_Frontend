/* eslint-disable no-unused-vars */
import React from "react";
import MeetingCalendar from "../../components/ServiceProviderComponents/MeetingCalendar.jsx";
import "../../styles/ServiceProviderStyles/availabilityManagment.css";
import "../../styles/ServiceProviderStyles/MeetingCalendar.css";
import {useAuth} from "../../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

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
            <div className="availability-managment-centered-el">
                <div className="calendar-color-map-container">
                    <Accordion Accordion defaultActiveKey={["0"]} alwaysOpen className="accordion-border">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="accordion-header">
                                <h1 className="button-color-map-title-margin">Time Buttons Color Map</h1>
                            </Accordion.Header>
                            <Accordion.Body className="accordion-body-bg-color">
                                <ul className="list-unstyled">
                                    <li className="d-flex align-items-center mb-4">
                                        <button disabled={true} className="time-button time-deselected availability-managment-button">
                                            10:00
                                        </button>
                                        <p className="text-center">Available time slot</p>
                                    </li>
                                    <li className="d-flex align-items-center mb-4">
                                        <button disabled={true} className="time-button time-selected availability-managment-button">
                                            10:00
                                        </button>
                                        <p className="text-center">Selected time slot for blocking</p>
                                    </li>
                                    <li className="d-flex align-items-center mb-4">
                                        <button disabled={true} className="time-button time-blocked availability-managment-button">
                                            10:00
                                        </button>
                                        <p className="text-center">Blocked time slot</p>
                                    </li>
                                    <li className="d-flex align-items-center mb-4">
                                        <button disabled={true} className="time-button time-booked availability-managment-button">
                                            10:00
                                        </button>
                                        <p className="text-center">Booked time slot</p>
                                    </li>
                                    <li className="d-flex align-items-center mb-4">
                                        <button disabled={true} className="time-button time-between-selected availability-managment-button">
                                            10:00
                                        </button>
                                        <p className="text-center">Time slot that will be blocked because it falls within the selected red hours</p>
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
            <MeetingCalendar />
        </>
    );
}

export default AvailabilityManagmentPage;
