/* eslint-disable no-unused-vars */
import React from "react";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import "./PassRecoveryPage.css";

/**
 * Password recovery page component.
 * @return {React.Component} - The Password Recovery page component.
 */
function PassRecoveryPage() {
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

    /**
     * Handles email form submission.
     * @param {Event} event - The email form submit event.
     */
    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        // TODO: Add logic to check if email is in the database, if yes fetch security question and answer if no show error and return

        // Assuming email exists in the system
        setEmailExist(true);
        setQuestion("Question");
        setRealAnswer("Answer");


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
        console.log(answer);
    };

    const toggleAnswerVisibility = () => {
        setShowAnswer(!showAnswer);
    };

    const isEmailFromInvalid = !email.trim() || emailErrorFlag;
    const isSecurityFormInvalid = !answer.trim();
    return (
        <div>
            <Form onSubmit={handleEmailSubmit} id="emailForm">
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
                <Button id="submitEmailBtn" variant="primary" type="submit" disabled={isEmailFromInvalid} hidden={emailExist}>
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
                <Form.Group className="mb-3" controlId="passwordFormGroup">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={showAnswer ? "text" : "password"}
                            placeholder="Enter the Answer"
                            onChange={handleAnswer}
                            value={answer}
                            required
                        />
                        <Button variant="outline-secondary" onClick={toggleAnswerVisibility} style={{width: "60px"}} >
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
        </div>
    );
}

export default PassRecoveryPage;
