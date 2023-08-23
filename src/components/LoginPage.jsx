import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import dogImage from "../images/loginbackground.jpg";


/**
 * Login page component.
 * @param {function} onLogin - Callback function to handle successful login.
 * @return {React.Component} - The Login page component.
 */
function LoginPage({onLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    /**
     * Handles form submission.
     * @param {Event} event - The form submit event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setError(null); // Clear any previous errors

        fetch("https://furryfriendsbackend.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (response.status === 401) {
                    setError("Bad credentials. Please check your email and password.");
                }
                return response.json();
            })
            .then((data) => {
                if (!error) {
                    handleLogIn(data.name);
                }
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    };

    /**
     * Handles successful login.
     * @param {string} name - The user's name.
     */
    const handleLogIn = (name) => {
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
        <div
            style={{
                backgroundImage: `url(${dogImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex", // Use flexbox
                justifyContent: "center", // Horizontally center
                // alignItems: "center", // Vertically center
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                overflow: "auto",
            }}
        >
            <div className="container">
                <Form className="text-light p-4" onSubmit={handleSubmit} style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with transparency
                    padding: "20px",
                    borderRadius: "10px"}}>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleEmail} required value={email} />
                        <Form.Text className="text-danger">We`ll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={handlePassword} required value={password} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    </Form.Group>

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
