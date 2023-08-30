/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./LoginPage.css";
import ComboBoxDropdown from "./ComboBox";

/**
 * Register page component.
 * @return {React.Component} - The Register page component.
 */
function RegisterPage() {
    // Use states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [question, setSelectedQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");

    // params
    const questions = ["Option 1", "Option 2", "Option 3"];

    /**
     * Handles form submission.
     * @param {Event} event - The form submit event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormIncomplete) {
            setError("Please fill in all fields.");
            return;
        }
        setError(""); // Clear any previous errors
        // for commit: https://furryfriendsbackend.onrender.com/login
        // for testing: http://localhost:5000/login
        // try {
        //     const response = await axios.post("http://localhost:5000/signup", {
        //         email: email,
        //         password: password,
        //         question: question,
        //         answer: answer,
        //     });
        //     const data = response.data;
        //     console.log("data: " + data);
        // } catch (error) {
        //     console.log("error: " + error);
        //     setError("Error, registration failed.");
        // }
    };

    const printFields = () =>{
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(question);
        console.log(answer);
        console.log("is form incomplete: " + isFormIncomplete);
    };


    /**
     * Handles change in name input.
     * @param {Event} event - The input change event.
     */
    function handleName(event) {
        setName(event.target.value);
        printFields();
    }

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

    /**
     * Handles change in question combobox input.
     * @param {String} newQuestion - The security question the user chose in the combobox.
     */
    const handleQuestionChange = (newQuestion) => {
        setSelectedQuestion(newQuestion);
    };

    /**
     * Handles change in answer input.
     * @param {Event} event - The input change event.
     */
    function handleAnswer(event) {
        setAnswer(event.target.value);
    }

    // Controls the state of the register button
    const isFormIncomplete = !email.trim() || !password.trim() || !question.trim() || !answer.trim() || !name.trim(); // Check if either field is empty
    return (
        <div className="login-page-container">
            <div className="container">
                <Form className="text-light p-4" onSubmit={handleSubmit} style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with transparency
                    padding: "20px",
                    borderRadius: "10px"}}>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    {/* name input */}
                    <Form.Group className="mb-3" controlId="registrationFormName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Enter Your Name" pattern="[A-Za-z ]+" title="Only letters and spaces are allowed" onChange={handleName} required value={name} />
                    </Form.Group>
                    {/* email input */}
                    <Form.Group className="mb-3" controlId="registrationFormEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter Email" pattern="[A-Za-z]+[0-9A-Za-z]*[@][a-z]+[.][a-z]+" title="Email format should be as follows: example@mail.com" onChange={handleEmail} required value={email} />
                        <Form.Text className="text-danger">We`ll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    {/* password input */}
                    <Form.Group className="mb-3" controlId="registrationFormPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter Password" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,30}$" title="Should contain at least: 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special case character, min size:12, max size:30" onChange={handlePassword} required value={password} />
                    </Form.Group>
                    {/* information for passwrod recovery */}
                    <div className="square border border-secondary rounded-5 ">
                        {/* security question combobox */}
                        <ComboBoxDropdown onSelectedValueChange={handleQuestionChange} options={questions} placeholder="Choose Security Question" required/>
                        {/* answer to the security question */}
                        <Form.Group className="mb-3 m-3" controlId="registrationFormAnswer">
                            <Form.Label>Aswer</Form.Label>
                            <Form.Control name="answer" type="text" placeholder="Enter Answer" onChange={handleAnswer} required value={answer} />
                            <Form.Text className="text-danger">The answer will be used for password restoration.</Form.Text>
                        </Form.Group>
                    </div>
                    {/* register button */}
                    <Button className="mt-3" variant="primary" type="submit" disabled={isFormIncomplete}>
                        Register
                    </Button>
                    {" "}
                    <Button className="mt-3" variant="secondary">Forgot Password?</Button>
                </Form>
            </div>
        </div>
    );
}

// RegisterPage.propTypes = {
//     onRegister: PropTypes.func.isRequired,
// };

export default RegisterPage;