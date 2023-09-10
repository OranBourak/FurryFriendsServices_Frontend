import React, {useEffect, useState} from "react";
import {Table, Alert} from "react-bootstrap";
import "../../styles/ServiceProviderStyles/upcomingAps.css";
import moment from "moment"; // Import moment.js
import {useAuth} from "../../context/AuthContext.jsx";
import axios from "axios";
import {Navigate} from "react-router-dom";

// const initialAppointments = [
//     {
//         id: 1,
//         clientName: "John Doe",
//         phoneNumber: "123-456-7890",
//         appointmentType: "Consultation",
//         date: "2023-09-10",
//         time: "09:00 AM",
//     },
//     {
//         id: 2,
//         clientName: "Jane Smith",
//         phoneNumber: "987-654-3210",
//         appointmentType: "Follow-up",
//         date: "2023-09-15",
//         time: "02:00 PM",
//     },
//     {
//         id: 3,
//         clientName: "Alice Johnson",
//         phoneNumber: "555-123-4567",
//         appointmentType: "Check-up",
//         date: "2023-09-20",
//         time: "10:00 AM",
//     },
//     {
//         id: 4,
//         clientName: "Bob Brown",
//         phoneNumber: "555-987-6543",
//         appointmentType: "Consultation",
//         date: "2023-09-25",
//         time: "03:00 PM",
//     },
//     {
//         id: 5,
//         clientName: "John Doe",
//         phoneNumber: "123-456-7890",
//         appointmentType: "Consultation",
//         date: "2023-09-10",
//         time: "10:00 AM",
//     },
//     {
//         id: 6,
//         clientName: "John Doe",
//         phoneNumber: "123-456-7890",
//         appointmentType: "Consultation",
//         date: "2023-08-10",
//         time: "10:00 AM",
//     },
//     // Add more appointments here...
// ];

const UpcomingAppointments = () => {
    const {loggedIn, userData} = useAuth();
    const [appointments, setAppointments] = useState();

    const getAppointments = async () => {
        if (loggedIn) {
            try {
                const response = await axios.get(`/serviceProvider/get/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Replace 'userToken' with the actual user token
                    },
                });
                const {appointments} = response.data;
                setAppointments(appointments.populate());
            } catch (error) {
                console.error(error);
            };
        }
    };
    useEffect(async () => {
        try {
            await getAppointments();
        } catch (error) {
            console.error(error);
        }
        if (appointments) {
        // Filter appointments that are on or after today
            const today = moment();
            const filteredAppointments = appointments.filter((appointment) => {
                const appointmentDate = moment(`${appointment.date} ${appointment.time}`, "YYYY-MM-DD hh:mm A");
                return appointmentDate.isSameOrAfter(today, "day"); // Check if appointment is on or after today
            });

            // Sort the filtered appointments based on a combined timestamp (date + time)
            const sortedAppointments = filteredAppointments.sort((a, b) => {
                const timestampA = moment(`${a.date} ${a.time}`, "YYYY-MM-DD hh:mm A").valueOf();
                const timestampB = moment(`${b.date} ${b.time}`, "YYYY-MM-DD hh:mm A").valueOf();

                return timestampA - timestampB;
            });
            setAppointments(sortedAppointments);
        }
    }, []); // This effect runs only once on component mount


    if (!loggedIn) {
        // Redirect to the login page or another protected route
        return <Navigate to="/login" />;
    } else if (userData.userType !== "serviceProvider") {
        return <Navigate to="/error"/>;
    }

    return (
        <>
            {appointments.length > 0 ? (
                <><Alert dismissible>
                    Below is a list of upcoming appointments, sorted in ascending order
                    based on the date and time. This means that the closest appointment to
                    the current date and time appears first in the list.
                </Alert><Table striped bordered hover responsive className="custom-table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Client Name</th>
                            <th>Phone Number</th>
                            <th>Appointment Type</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id}>
                                <td>{index + 1}</td>
                                <td>{appointment.clientName}</td>
                                <td>{appointment.phoneNumber}</td>
                                <td>{appointment.appointmentType}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table></>
            ) : (
                <h1>No appointments scheduled yet!</h1>
            )}
        </>
    );
};

export default UpcomingAppointments;
