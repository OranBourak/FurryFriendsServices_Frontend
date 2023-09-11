/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../../styles/ServiceProviderStyles/LoginPage.css";
import {useNavigate} from "react-router-dom";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import {useAuth} from "../../context/AuthContext.jsx";


/**
 * Login page component.
 * @param {function} onLogin - Callback function to handle successful login.
 * @return {React.Component} - The Login page component.
 */
function LoginPage({onLogin}) {
    const [userType, setUserType] = useState(""); // Default to 'Client'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {login} = useAuth();
    /**
     * Handles form submission.
     * @param {Event} event - The form submit event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userType);
        if (!email.trim() || !password.trim() || !userType.trim()) {
            setError("Please fill in all fields.");
            return;
        }
        setError(""); // Clear any previous errors
        // for commit: https://furryfriendsbackend.onrender.com/login
        // for testing: http://localhost:5000/login
        try {
            const response = await axios.post(`/${userType}/login`, {
                user: userType,
                email: email,
                password: password,
            });
            // TODO: handle the token
            const {name, token, id} = response.data;
            setEmail(response.data.email);
            handleLogIn(name, token, email, id);
        } catch (error) {
            console.log("error: " + error);
            setError("Bad credentials. Please check your email and password.");
        }
    };

    /**
     * Handles successful login.
     * @param {string} name - The user's name.
     * @param {string} token - The user's token
     * @param {string} email - The user's email
     * @param {sting} id - The user's ID
     */
    const handleLogIn = (name, token, email, id) => {
        login(name, token, email, id, userType);
        navigate("/profile");
    };

    /**
     * Handles change in email input.
     * @param {Event} event - The input change event.
     */
    function handleEmail(event) {
        setEmail(event.target.value);
    }

    /**
     * Handles change in password input.
     * @param {Event} event - The input change event.
     */
    function handlePassword(event) {
        setPassword(event.target.value);
    }

    const loadPassRecoveryPage = () => {
        navigate("/pass-recovery");
    };

    const isFormIncomplete = !email.trim() || !password.trim() || !userType.trim(); // Check if either field is empty
    const radios = [
        {name: "Client", value: "client"},
        {name: "Service Provider", value: "serviceProvider"},
    ];

    return (
        <div className="login-page-container">
            <div className="container">
                <Form className="text-light p-4" onSubmit={handleSubmit} style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with transparency
                    padding: "20px",
                    borderRadius: "10px"}}>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    {/* user type */}
                    <Form.Group className="mb-3" controlId="formBasicUserType">
                        <Form.Label>User Type</Form.Label>
                        <div>
                            <ButtonGroup className="mb-2">
                                {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        variant="secondary"
                                        name="radio"
                                        value={radio.value}
                                        checked={userType === radio.value}
                                        onChange={(e) => setUserType(e.currentTarget.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </div>
                    </Form.Group>
                    {/* email input */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleEmail} required value={email} />
                        <Form.Text className="text-danger">We`ll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    {/* password input */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={handlePassword} required value={password} />
                    </Form.Group>
                    {/* login button */}
                    <Button variant="primary" type="submit" disabled={isFormIncomplete}>
                        Login
                    </Button>
                    {" "}
                    <Button variant="secondary" onClick={loadPassRecoveryPage}>Forgot Password?</Button>
                </Form>
            </div>
        </div>
    );
}

LoginPage.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
