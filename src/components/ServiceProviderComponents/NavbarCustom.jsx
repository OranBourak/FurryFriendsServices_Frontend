/* eslint-disable linebreak-style */
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavDropdown} from "react-bootstrap";


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
                        {/* Create a Dropdown for the "Register" item */}
                        <NavDropdown title="Register" id="register-nav-dropdown">
                            <NavDropdown.Item href="/client-register">Client Register</NavDropdown.Item>
                            <NavDropdown.Item href="/provider-signup">Provider Register</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}


export default NavbarCustom;
