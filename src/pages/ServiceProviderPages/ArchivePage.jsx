/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import {Table, Alert, Button, ButtonGroup, Row, Col} from "react-bootstrap";
import "../../styles/ServiceProviderStyles/archive.css";
import {isBefore, format} from "date-fns";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";


const Archive = () => {
    const {loggedIn, userData} = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [activeButton, setActiveButton] = useState("All");
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
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
                    console.log(appointment.date);
                    const app = new Date(appointment.date);
                    app.setMinutes(app.getMinutes() - 180);
                    console.log(app, today);
                    return isBefore(app, today);
                });
                setAppointments(filteredAppointments);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect( () => {
        getData();
    }, []);

    useEffect(() => {
        setFilteredAppointments(appointments);
    }, [appointments]);


    const filterAppointments = (status) => {
        if (status === "All") {
            setFilteredAppointments(appointments);
        } else {
            const filtered = appointments.filter(
                (appointment) => appointment.status.toLowerCase() === status.toLowerCase(),
            );
            setFilteredAppointments(filtered);
        }
    };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        filterAppointments(buttonName);
    };

    const renderAppointmentsTable = () => {
        return (
            <Table striped bordered hover responsive className="custom-table text-center">
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
                    {filteredAppointments.map((appointment, index) => (
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
                                    appointment.status === "Completed" ? "completed" : "canceled"
                                }`}
                            >
                                {appointment.status}
                            </td>
                        </tr>
                    ))}

                </tbody>

            </Table>
        );
    };
    const renderNavigationButtons = () => {
        const navigationButtons = ["All", "Completed", "Canceled"];

        return (
            <ButtonGroup aria-label="Navigation" className="table-mb-3 mb-3">
                {navigationButtons.map((status) => (
                    <Button
                        key={status}
                        variant={activeButton === status ? "primary" : "secondary"}
                        onClick={() => handleButtonClick(status)}
                    >
                        {status}
                    </Button>
                ))}
            </ButtonGroup>
        );
    };

    return (
        <div className="table-container container">
            <Row>
                <Col>
                    <h1 className="table-mt-3 table-mb-4 mt-3 mb-4">Appointment Archive</h1>
                </Col>
            </Row>
            <Row>
                <Col>{renderNavigationButtons()}</Col>
            </Row>
            {!isLoading ? (
                <>
                    {filteredAppointments.length === 0 ? (
                        <h3 className="table-mt-3 mt-3">No appointments scheduled yet!</h3>

                    ) : (
                        <>
                            <Alert dismissible variant="info">
                Below is a list of past appointments, sorted in ascending order
                based on the date and time. This means that the closest appointment
                to the current date and time appears first in the list.
                            </Alert>
                            {renderAppointmentsTable()}
                        </>
                    )}
                </>
            ) : (
            // Conditional rendering when appointments are empty
                <h3 className="table-mt-3 mt-3">Loading appointments...</h3>
            )}
        </div>
    );
};

export default Archive;
