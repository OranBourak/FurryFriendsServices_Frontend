import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavDropdown} from "react-bootstrap";
import {useAuth} from "../../context/AuthContext";
import logo from "../../images/logo.png";

const NavbarCustom=()=> {
    const {loggedIn, logout, userData} = useAuth();
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        if (userData) {
            setUserName(userData.name);
        }
    }, [userData]);

    return (
        <>
            <Navbar className="border-bottom fixed-top" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                            alt="Furry Friends logo"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {loggedIn ? (
                            <>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link href="/" onClick={logout}>
                  Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <NavDropdown title="Register" id="register-nav-dropdown">
                                    <NavDropdown.Item href="/client-register">
                    Client Register
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/provider-signup">
                    Provider Register
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                    {userName && (
                        <Navbar.Text className="text-light ml-auto">
              Hello, {userName}
                        </Navbar.Text>
                    )}
                </Container>
            </Navbar>
            <div style={{paddingTop: "60px"}}>
                {/* Add this div to create space so that the content does not get hidden under the sticky navbar */}
            </div>
        </>
    );
};

export default NavbarCustom;
