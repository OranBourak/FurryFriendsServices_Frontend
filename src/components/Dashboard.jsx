import React from "react";
import {Button, Container, Row, Col} from "react-bootstrap";
import {RiUserSettingsLine, RiArchiveDrawerLine, RiCalendarLine, RiCalendarEventLine, RiFileListLine, RiBarChartHorizontalLine, RiCalendarCheckLine} from "react-icons/ri";
import "../styles/dashboard.css";
import {useNavigate} from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Container id="bg-gradient" className="mt-4 p-5 border rounded ">
            <Row className="justify-content-center">
                <Col>
                    <Button variant="primary" size="lg" className="m-3 square-button" onClick={()=>navigate("/profile")}>
                        <RiUserSettingsLine className="button-icon" /> Profile Management
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" size="lg" className="m-3 square-button">
                        <RiArchiveDrawerLine className="button-icon" /> Archive Page
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" size="lg" className="m-3 square-button" onClick={()=>navigate("/upcoming-appointments")}>
                        <RiCalendarLine className="button-icon" /> Upcoming Appointments
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" size="lg" className="m-3 square-button">
                        <RiCalendarEventLine className="button-icon" /> Appointment Management
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" size="lg" className="m-3 square-button" onClick={()=>navigate("/type-managment")}>
                        <RiFileListLine className="button-icon" /> Appointment Type Management
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <Button variant="primary" size="lg" className="m-3 long-button">
                        <RiBarChartHorizontalLine className="button-icon" /> Statistics
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" size="lg" className="m-3 long-button" onClick={()=>navigate("/availability-managment")}>
                        <RiCalendarCheckLine className="button-icon" /> Availability Management
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
