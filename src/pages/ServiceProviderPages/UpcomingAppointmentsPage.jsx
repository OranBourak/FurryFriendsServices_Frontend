import React, {useEffect, useState} from "react";
import {Table, Alert} from "react-bootstrap";
import "../../styles/ServiceProviderStyles/upcomingAps.css";
import {useAuth} from "../../context/AuthContext.jsx";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {isAfter, format} from "date-fns";
import {message, Skeleton} from "antd";


const UpcomingAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {loggedIn, userData} = useAuth();

    if (!loggedIn) {
        return <Navigate to="/" />;
    } else if (userData.userType !== "serviceProvider") {
        return <Navigate to="/error"/>;
    }

    const getAppointments = async () => {
        if (loggedIn) {
            try {
                setIsLoading(true);
                const response = await axios.get(`/serviceProvider/getAppointments/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Replace 'userToken' with the actual user token
                    },
                });
                const apps = response.data.appointments;
                const today = new Date();
                const filteredAppointments = apps.filter((appointment) => {
                    const app = new Date(appointment.date);
                    app.setMinutes(app.getMinutes() - 180);
                    return isAfter(app, today);
                });
                setAppointments(filteredAppointments);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                message.error({

                    content: `Error deleting appointment: ${error.response.data.error}`,

                    style: {yIndex: 1000, fontSize: "24px"},

                }, 2);
            };
        }
    };
    useEffect(() => {
        getAppointments();
    }, []); // This effect runs only once on component mount


    return (
        <>
            {isLoading ? (
                <Skeleton active />
            ) : (
                appointments.length === 0 ? (
                    <h1>No appointments scheduled yet!</h1>
                ) : (
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
                                <th>Duration</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={appointment._id}>
                                    <td>{index + 1}</td>
                                    <td>{appointment.clientId.name}</td>
                                    <td>{appointment.clientId.phone}</td>
                                    <td>{appointment.appointmentType.name}</td>
                                    <td>{format(new Date(appointment.date), "yyyy-MM-dd")}</td>
                                    <td>{format(new Date(appointment.date).setMinutes(new Date(appointment.date).getMinutes()-180), "HH:mm")}</td>
                                    <td>{`${appointment.duration} Hours`}</td>
                                    <td
                                        className={`status-cell ${
                                            appointment.status === "Upcoming" ? "upcoming" : "canceled"
                                        }`}
                                    >
                                        {appointment.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table></>
                )
            )}
        </>
    );
};

export default UpcomingAppointments;
