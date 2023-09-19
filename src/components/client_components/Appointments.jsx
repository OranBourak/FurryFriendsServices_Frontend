import React, {useState, useEffect} from "react";
import {Button, Card, Container, Row, Col, Form} from "react-bootstrap";
import ReviewModal from "./ReviewModal.jsx";
import "../../styles/ClientStyles/Appointments.css";
import {useAuth} from "../../context/AuthContext.jsx";
import axios from "axios";
import {Skeleton} from "antd";

/**
 *
 * @return {React.Component} Appointments for a specific client
 */
function Appointments() {
    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState("Upcoming");
    const [selectedSort, setSelectedSort] = useState("Sort by date");
    const {userData} = useAuth();
    const [serviceProviderId, setServiceProvider] = useState("");
    const [reviewModalFlag, setReviewModalFlag] = useState(false);
    const [reviewedAppointmentId, setReviewedAppointmentId] = useState("");


    useEffect(()=> {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`client/get-appointments/${userData?.id}`);
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

    /**
     * Sorting function, can sort by date/price(descending and ascending order) and by name. depends on input value.
     * Sort by date
     * Sort by price - descending
     * Sort by price - ascending
     * Sort by service provider name
     * @param {*} e
     */
    const sortByChoice = (e) => {
        console.log(e.target.value);
        setSelectedSort(e.target.value);
        if (e.target.value === "Sort by date") {
            appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (e.target.value.includes("Sort by price")) {
            if (e.target.value.includes("descending")) {
                appointments.sort((a, b) => b.appointmentType.price - a.appointmentType.price);
            } else {
                appointments.sort((a, b) => a.appointmentType.price - b.appointmentType.price);
            }
        } else if (e.target.value === "Sort by service provider name") {
            appointments.sort((a, b) => a.serviceProviderId.name.localeCompare(b.serviceProviderId.name));
        }
        const currDate = new Date();
        console.log(appointments[0].date);
        console.log(currDate);
    };

    /**
     * sets the service provider, client and sets the reviewModalFlag to true.
     * @param {*} appointment
     */
    const writeReview = async (appointment) => {
        setServiceProvider(appointment.serviceProviderId._id);
        setReviewModalFlag(true);
        setReviewedAppointmentId(appointment._id);
    };

    /**
     * checks if a given date is within 24 hours of the current date.
     * @param {*} appointmentDate
     * @return {Bool} true if the date is within 24 hours of the current date else false.
     */
    const isWithinLast24Hours = (appointmentDate) => {
        const now = new Date();
        const appointmentTime = new Date(appointmentDate.replace(/[TZ]/g, " ").substring(0, appointmentDate.length - 8));
        // console.log(appointmentTime);
        const timeDifference = now - appointmentTime; // in milliseconds
        const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        return timeDifference <= oneDay;
    };

    if (loading) return <Skeleton active shape="square"/>;
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
                    <Form.Control
                        as="select"
                        value={selectedSort}
                        onChange={sortByChoice}
                    >
                        <option>Sort by date</option>
                        <option>Sort by price - descending</option>
                        <option>Sort by price - ascending</option>
                        <option>Sort by service provider name</option>
                    </Form.Control>
                    <h2 style={{color: "white"}}>{selectedType} Appointments </h2>
                    {appointments !== null && appointments.filter((appointment) => appointment.status === selectedType).map((appointment) => (
                        <Card key={appointment._id} className="appointment-card-mb-3">
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
                                    {selectedType === "Completed" &&
                                    isWithinLast24Hours(appointment.date) &&
                                    appointment.review === null &&
                                    (<Button className="review-button" variant="success" onClick={() => writeReview(appointment)}>Write review</Button>)}
                                </div>
                                <ReviewModal open={reviewModalFlag} onClose={() => {
                                    setReviewModalFlag(false);
                                }} clientId = {userData.id}
                                serviceProviderId={serviceProviderId}
                                appointmentId = {reviewedAppointmentId}
                                clientAppointments = {appointments}
                                setAppointments = {setAppointments}/>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>

    );
}

export default Appointments;
