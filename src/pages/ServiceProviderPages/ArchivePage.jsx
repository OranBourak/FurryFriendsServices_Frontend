import React, {useEffect, useState} from "react";
import {Table, Alert, Button, ButtonGroup, Row, Col} from "react-bootstrap";
import "../../styles/ServiceProviderStyles/archive.css";
import moment from "moment"; // Import moment.js

const initialAppointments = [
    {
        id: 1,
        clientName: "John Doe",
        phoneNumber: "123-456-7890",
        appointmentType: "Consultation",
        date: "2020-09-10",
        time: "09:00 AM",
        status: "completed",
    },
    {
        id: 2,
        clientName: "Jane Smith",
        phoneNumber: "987-654-3210",
        appointmentType: "Follow-up",
        date: "2020-09-15",
        time: "02:00 PM",
        status: "completed",
    },
    {
        id: 3,
        clientName: "Alice Johnson",
        phoneNumber: "555-123-4567",
        appointmentType: "Check-up",
        date: "2020-09-20",
        time: "10:00 AM",
        status: "canceled",
    },
    {
        id: 4,
        clientName: "Bob Brown",
        phoneNumber: "555-987-6543",
        appointmentType: "Consultation",
        date: "2020-09-25",
        time: "03:00 PM",
        status: "canceled",
    },
    {
        id: 5,
        clientName: "John Doe",
        phoneNumber: "123-456-7890",
        appointmentType: "Consultation",
        date: "2021-09-10",
        time: "10:00 AM",
        status: "completed",
    },
    {
        id: 6,
        clientName: "John Doe",
        phoneNumber: "123-456-7890",
        appointmentType: "Consultation",
        date: "2021-08-10",
        time: "10:00 AM",
        status: "completed",
    },
    // Add more appointments here...
];
const Archive = () => {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [activeButton, setActiveButton] = useState("All");
    const [filteredAppointments, setFilteredAppointments] = useState(
        initialAppointments,
    );

    useEffect(() => {
        const today = moment();
        const filteredAppointments = appointments.filter((appointment) => {
            const appointmentDate = moment(
                `${appointment.date} ${appointment.time}`,
                "YYYY-MM-DD hh:mm A",
            );
            return appointmentDate.isBefore(today, "day");
        });

        const sortedAppointments = filteredAppointments.sort((a, b) => {
            const timestampA = moment(
                `${a.date} ${a.time}`,
                "YYYY-MM-DD hh:mm A",
            ).valueOf();
            const timestampB = moment(
                `${b.date} ${b.time}`,
                "YYYY-MM-DD hh:mm A",
            ).valueOf();
            return timestampA - timestampB;
        }).reverse();

        setAppointments(sortedAppointments);
    }, []);

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
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map((appointment, index) => (
                        <tr key={appointment.id}>
                            <td>{index + 1}</td>
                            <td>{appointment.clientName}</td>
                            <td>{appointment.phoneNumber}</td>
                            <td>{appointment.appointmentType}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td
                                className={`status-cell ${
                                    appointment.status === "completed" ? "completed" : "canceled"
                                }`}
                            >
                                {appointment.status[0].toUpperCase() +
                    appointment.status.slice(1)}
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
            {appointments.length > 0 ? (
                <>
                    <Alert dismissible variant="info">
              Below is a list of past appointments, sorted in ascending order
              based on the date and time. This means that the closest appointment
              to the current date and time appears first in the list.
                    </Alert>
                    {renderAppointmentsTable()}
                </>
            ) : (
                <h3 className="table-mt-3 mt-3">No appointments yet!</h3>
            )}
        </div>
    );
};

export default Archive;
