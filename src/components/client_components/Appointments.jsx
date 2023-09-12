import React, {useState, useEffect} from "react";
import {Button, Card, Container, Row, Col, Form} from "react-bootstrap";
import "../../styles/ClientStyles/Appointments.css";
import {useAuth} from "../../context/AuthContext.jsx";
import axios from "axios";

/**
 *
 * @return {React.Component} Appointments for a specific client
 */
function Appointments() {
    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState("Upcoming");
    const {userData} = useAuth();


    useEffect(()=> {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`client/get-appointments/${userData.id}`);
                setAppointments(response.data.appointments);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [userData.id]);

    const cancelAppointment = async (appointmentId) => {
        try {
            const response = await axios.delete(`appointment/delete-appointment/${appointmentId}`);
            const updatedAppointments = appointments.map((appointment) => {
                if (appointment._id === appointmentId) {
                    return {
                        ...appointment,
                        status: response.data.appointment.status,
                    };
                }
                return appointment;
            });

            setAppointments(updatedAppointments);
        } catch (err) {
            setError("Failed to cancel the appointment.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Container className="appointments-container">
            <Row>
                <Col md={12} className="appointment-column">
                    <Form.Control
                        as="select"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option>Upcoming</option>
                        <option>Completed</option>
                        <option>Canceled</option>
                    </Form.Control>
                    <h2 style={{color: "white"}}>{selectedType} Appointments </h2>
                    {appointments.filter((appointment) => appointment.status === selectedType).map((appointment) => (
                        <Card key={appointment._id} className="mb-3">
                            <Card.Body>
                                <div className="div-container">
                                    <Row>
                                        Date&Time:  {appointment.date.replace(/[TZ]/g, " ").substring(0, appointment.date.length - 8)}
                                    </Row>
                                    <Row>
                                        <Col md={5} className="appointment-column">
                                            Provider: {appointment.serviceProviderId.name}
                                        </Col>
                                        <Col md={7} className="appointment-column">
                                            Type: {appointment.appointmentType.name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={5} className="appointment-column">
                                            Duration: {appointment.duration}h
                                        </Col>
                                        <Col md={5} className="appointment-column">
                                            Price: {appointment.appointmentType.price}$
                                        </Col>
                                    </Row>
                                    {selectedType === "Upcoming" && (
                                        <Button className="cancel-button" variant="danger" onClick={() => cancelAppointment(appointment._id)}>Cancel</Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default Appointments;
