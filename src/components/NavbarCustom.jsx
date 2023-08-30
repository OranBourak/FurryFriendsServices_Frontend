/* eslint-disable linebreak-style */
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


/**
 * NavBar component for site navigation
 * @return {React.Component}
 */
function NavbarCustom() {
    return (
        <>
            <Navbar className="border-bottom" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Furry Friends</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}


export default NavbarCustom;
