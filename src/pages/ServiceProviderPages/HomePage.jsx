import React from "react";
import dogImage from "../../images/homepagebackground.jpg";
import {Container, Row, Col, Image, ListGroup} from "react-bootstrap";
import "../../styles/ServiceProviderStyles/HomePage.css"; // Import your CSS file

const HomePage = () => {
    return (
        <Container className="homepage-container mt-5 mb-5">
            <Row className="text-center">
                <Col>
                    <Image
                        src={dogImage}
                        alt="Furry Friends"
                        className="img-fluid mb-4 border rounded"
                        width={800}
                        height={300}
                        loading="lazy"
                    />
                </Col>
            </Row>

            <Row className="text-center">
                <Col>
                    <h1 className="homepage-title">Welcome to Furry Friends</h1>
                    <p className="homepage-lead">
            Your one-stop destination for all your animal service needs!
                    </p>
                    <p>
            Whether you`re looking for a reliable dog sitter, a professional pet
            groomer, or other services for your furry companions, Furry Friends
            has you covered.
                    </p>
                    <p>
            Our platform connects pet owners with skilled service providers who
            are passionate about animals. It`s a community built to ensure the
            well-being and happiness of your pets.
                    </p>
                </Col>
            </Row>

            <Row className="text-center">
                <Col>
                    <h2 className="homepage-title">Services We Offer</h2>
                    <ListGroup className="service-list" style={{maxWidth: "400px", margin: "auto"}}>
                        <ListGroup.Item variant="primary">Find a wide range of services for your pets:</ListGroup.Item>
                        <ListGroup.Item variant="info" className="service-item">Dog Walker</ListGroup.Item>
                        <ListGroup.Item variant="info" className="service-item">Veterinarian</ListGroup.Item>
                        <ListGroup.Item variant="info" className="service-item">Dog Groomer</ListGroup.Item>
                        {/* Add more services here */}
                    </ListGroup>
                </Col>
            </Row>

            <Row className="text-center">
                <Col>
                    <h2 className="homepage-title">Get Started</h2>
                    <p>Join Furry Friends and give your pets the care they deserve!</p>
                </Col>
            </Row>

            <Row className="text-center">
                <Col>
                    <footer className="footer-text">
                        <p>&copy; 2023 Furry Friends. All rights reserved.</p>
                    </footer>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
