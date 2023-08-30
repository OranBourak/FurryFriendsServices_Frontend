/* eslint-disable linebreak-style */
import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./LoginPage.css";


/**
 * Login page component.
 * @param {function} onLogin - Callback function to handle successful login.
 * @return {React.Component} - The Login page component.
 */
function LoginPage({onLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    /**
     * Handles form submission.
     * @param {Event} event - The form submit event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }
        setError(""); // Clear any previous errors
        // for commit: https://furryfriendsbackend.onrender.com/login
        // for testing: http://localhost:5000/login
        try {
            const response = await axios.post("http://localhost:5000/login", {
                email: email,
                password: password,
            });
            const data = response.data;
            handleLogIn(data.name);
            console.log("name: " + data.name);
        } catch (error) {
            console.log("error: " + error);
            setError("Bad credentials. Please check your email and password.");
        }
    };

    /**
     * Handles successful login.
     * @param {string} name - The user's name.
     */
    const handleLogIn = (name) => {
        console.log("in handle log in");
        if (name) {
            onLogin(name);
            console.log(name);
        }
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

    const isFormIncomplete = !email.trim() || !password.trim(); // Check if either field is empty

    return (
        <div className="login-page-container">
            <div className="container">
                <Form className="text-light p-4" onSubmit={handleSubmit} style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with transparency
                    padding: "20px",
                    borderRadius: "10px"}}>
                    {error && <div className="text-danger mb-3">{error}</div>}
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
                    <Button variant="secondary">Forgot Password?</Button>
                </Form>
            </div>
        </div>
    );
}

LoginPage.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
