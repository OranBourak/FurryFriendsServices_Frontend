import React, {useState} from "react";
import {Button, Card, Container, Row, Col} from "react-bootstrap";
import "../../styles/ClientStyles/Appointments.css";
/**
 *
 * @return {React.Component} Appointment component for client
 */
function Appointments() {
    const [appointments, setAppointments] = useState([
        // Sample data
        {id: 1, date: new Date(2023, 8, 15, 14, 0), description: "Dentist Appointment"},
        {id: 2, date: new Date(2023, 8, 17, 10, 30), description: "Meeting with Lawyer"},
        {id: 3, date: new Date(2023, 8, 10, 12, 0), description: "Haircut"},
    ]);

    const cancelAppointment = (id) => {
        setAppointments(appointments.filter((appointment) => appointment.id !== id));
    };

    const currentDate = new Date();

    return (
        <Container className="appointments-container">
            <Row>
                <Col md={6}>
                    <h2>Upcoming Appointments</h2>
                    {appointments.filter((appointment) => appointment.date >= currentDate).map((appointment) => (
                        <Card key={appointment.id} className="mb-3">
                            <Card.Body>
                                <Card.Text>
                                    {appointment.date.toLocaleString()} - {appointment.description}
                                </Card.Text>
                                <Button variant="danger" onClick={() => cancelAppointment(appointment.id)}>Cancel</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
                <Col md={6}>
                    <h2>Past Appointments</h2>
                    {appointments.filter((appointment) => appointment.date < currentDate).map((appointment) => (
                        <Card key={appointment.id} className="mb-3">
                            <Card.Body>
                                <Card.Text>
                                    {appointment.date.toLocaleString()} - {appointment.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default Appointments;
