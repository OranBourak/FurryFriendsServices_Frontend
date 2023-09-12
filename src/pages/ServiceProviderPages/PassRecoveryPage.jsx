/* eslint-disable no-unused-vars */
import React from "react";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import "../../styles/ServiceProviderStyles/PassRecoveryPage.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {message} from "antd";


/**
 * Password recovery page component.
 * @return {React.Component} - The Password Recovery page component.
 */
function PassRecoveryPage() {
    const navigate = useNavigate();
    // User type
    const [userType, setUserType] = useState("");
    // Email
    const [email, setEmail] = useState("");
    const [emailErrorFlag, setEmailErrorFlag] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    // Security Question and Answer
    const [question, setQuestion] = useState("");
    // Answer
    const [realAnswer, setRealAnswer] = useState("");
    const [answer, setAnswer] = useState("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [hasTriedToAnswer, setHasTriedToAnswer] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    // Passwrod
    const [password, setPassword] = useState("");
    const [passwordErrorFlag, setPasswordErrorFlag] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordErrorFlag, setConfirmPasswordErrorFlag] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasPasswordReset, setHasPasswordReset] = useState(false);
    const [id, setId] = useState("");

    /**
     * Handles email form submission.
     * @param {Event} event - The email form submit event.
     */
    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        console.log("type: " + userType);
        // TODO: Add logic to check if email is in the database, if yes fetch security question and answer if no show error and return
        try {
            const response = await axios.get(`/${userType}/pass-recovery`, {
                params: {
                    email: email,
                },
            });
            // TODO: handle the token
            const {securityQuestion, securityAnswer, id} = response.data;
            // User found and exists
            setId(id);
            setEmailExist(true);
            setQuestion(securityQuestion);
            setRealAnswer(securityAnswer);
        } catch (error) {
            console.log("error: " + error);
            message.error({

                content: `error: ${error}`,

                style: {yIndex: 1000, fontSize: "24px"},

            }, 2);
        }

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

    /**
     * Handles security form submission.
     * @param {Event} event - The security form submit event.
     */
    const handleSecuritySubmit = async (event) => {
        event.preventDefault();
        setHasTriedToAnswer(true);
        if (realAnswer === answer) {
            console.log("answer match");
            setIsAnswerCorrect(true);
            setShowAnswer(false);
        } else {
            console.log("answer don't match");
        }
    };

    /**
     * Handles password form submission.
     * @param {Event} event - The password form submit event.
     */
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        let successfulChange = false;
        // TODO: add logic for saving the password and the confirmPassword in the db
        try {
            const response = await axios.patch(`/${userType}/password-change`, {
                password,
                id,
            });
            console.log(response);
            successfulChange = true;
        } catch (error) {
            console.log("failed to change password");
            console.log(error);
            message.error({

                content: `error: ${error}`,

                style: {yIndex: 1000, fontSize: "24px"},

            }, 2);
            successfulChange = false;
        };

        if (successfulChange) {
            window.alert("Password reset successfully");
            navigate("/login");
        } else {
            window.alert("Password reset failed");
        }
    };

    /**
     * Handles change in email input.
     * @param {Event} event - The input change event.
     */
    function handleEmail(event) {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setEmailErrorFlag(!/^[A-Za-z]+[0-9A-Za-z]*[@][a-z]+[.][a-z]+$/.test(newEmail));
    }

    const handleAnswer = (event) => {
        setAnswer(event.target.value);
    };

    const handlePassword = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordErrorFlag(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,30}$/.test(newPassword));
        setConfirmPasswordErrorFlag( !(newPassword === confirmPassword) );
    };

    const handleConfirmPassword = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        setConfirmPasswordErrorFlag( !(password === newConfirmPassword) );
    };

    const toggleAnswerVisibility = () => {
        setShowAnswer(!showAnswer);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isEmailFromInvalid = !email.trim() || emailErrorFlag;
    const isSecurityFormInvalid = !answer.trim();
    const isPasswordFormInvalid = !password.trim() || !confirmPassword.trim() || passwordErrorFlag || confirmPasswordErrorFlag || !(password === confirmPassword);
    const radios = [
        {name: "Client", value: "client"},
        {name: "Service Provider", value: "serviceProvider"},
    ];
    return (
        <div className="page-background">
            <h1 className="blue mb-3">Passwrod Recovery</h1>
            <div className="password-recovery-form">
                <Form onSubmit={handleEmailSubmit} id="emailForm">
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
                    <Form.Group className="mb-3" controlId="emailFormGroup">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="name@example.com"
                            onChange={handleEmail}
                            isInvalid = {emailErrorFlag}
                            value={email}
                            required
                            disabled={emailExist}
                        />
                        <Form.Control.Feedback type="invalid">
                            Email format should be as follows: example@mail.domain
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button id="submitEmailBtn" variant="primary" type="submit" disabled={isEmailFromInvalid || !userType.trim()} hidden={emailExist}>
                        Verify Email
                    </Button>
                </Form>
                {emailExist &&
                <Form onSubmit={handleSecuritySubmit} id="securityForm">
                    <Form.Group className="mb-3" controlId="securityFormGroup">
                        <Form.Label>{question}</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showAnswer ? "text" : "password"}
                                placeholder="Enter the Answer"
                                onChange={handleAnswer}
                                value={answer}
                                required
                                isInvalid={!isAnswerCorrect && hasTriedToAnswer}
                                disabled={isAnswerCorrect}
                            />
                            <Button variant="outline-secondary" onClick={toggleAnswerVisibility} disabled={isAnswerCorrect} style={{width: "60px"}} >
                                {showAnswer ? "Hide" : "Show"}
                            </Button>
                            <Form.Control.Feedback type="invalid">
                            The answer does not match
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Button id="submitSecurityBtn" variant="primary" type="submit" disabled={isSecurityFormInvalid} hidden={isAnswerCorrect}>
                        Verify Answer
                    </Button>
                </Form>
                }
                {isAnswerCorrect &&
                <Form onSubmit={handlePasswordSubmit} id="passwordForm">
                    {/* password input */}
                    <Form.Group className="mb-3" controlId="passwordFormGroup">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter New Password"
                                onChange={handlePassword}
                                value={password}
                                required
                                isInvalid={passwordErrorFlag}
                                disabled={hasPasswordReset}
                            />
                            <Button variant="outline-secondary" onClick={togglePasswordVisibility} disabled={hasPasswordReset} style={{width: "60px"}} >
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                Should contain at least: 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special case character, min size:12, max size:30
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    {/* confirm password input */}
                    <Form.Group className="mb-3" controlId="passwordFormGroup">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password Again"
                            onChange={handleConfirmPassword}
                            value={confirmPassword}
                            required
                            isInvalid={confirmPasswordErrorFlag}
                            disabled={hasPasswordReset}
                        />
                        <Form.Control.Feedback type="invalid">
                            The passwords do not match
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button id="submitPasswordBtn" variant="primary" type="submit" disabled={isPasswordFormInvalid} hidden={hasPasswordReset}>
                        Reset Password
                    </Button>
                </Form>
                }
            </div>
        </div>
    );
}

export default PassRecoveryPage;
