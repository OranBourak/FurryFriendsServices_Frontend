import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "../../styles/ClientStyles/clientRegistrationForm.css";
import {useAuth} from "../../context/AuthContext.jsx";
import {message} from "antd";
import axios from "axios";


// validation
import validator from "validator";

// navigator
import {useNavigate} from "react-router";

// components
import ClientDropDown from "./ClientDropDown.jsx";
/**
 * client registration form with the fields of name,email,password, secret question, answer, phone number prefix and phone suffix.
 * @return {React.Component} client registration form
 */
const ClientRegistrationForm = () => {
    // form fields include all attributes in the fields state
    const navigate = useNavigate();
    const {login} = useAuth();
    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        secretQuestion: "",
        answer: "",
        phonePrefix: "",
        phoneSuffix: "",
    });
    const questions = [
        "What is the name of your first pet?",
        "In which city were you born?",
        "What is the name of your favorite childhood teacher?",
        "What was the make and model of your first car?",
        "What is the name of the street you grew up on?",
        "What is your favorite book?",
        "What is the name of your favorite historical figure?",
        "What was your childhood nickname?",
        "What is the name of your favorite childhood friend?",
        "What is your favorite vacation spot?",
        "What is you childhood friend name?",
        "What is your middle name?",
    ];
    const phonePrefix = ["050", "052", "053", "054", "055"];
    // if a flag is set to true, field is validated, else not validated.
    const [nameFlag, setNameFlag] = useState(null);
    const [emailFlag, setEmailFlag] = useState(null);
    const [passwordFlag, setPasswordFlag] = useState(null);
    const [phoneFlag, setPhoneFlag] = useState(null);


    /**
 * recieves an event that a field in the form has changed, the changed field's value is the value that we set on our fields state
 * with a switch case logic
 * @param {*} e event object
 */
    const handleChange = (e) => {
        const {name, value} = e.target;
        switch (name) {
        case "name":
            setFields({...fields, name: value});
            setNameFlag(/^[A-Za-z]+([ ][A-Za-z]+)*$/.test(value));
            break;
        case "email":
            setFields({...fields, email: value});
            setEmailFlag(validator.isEmail(value));
            break;
        case "password":
            setFields({...fields, password: value});
            setPasswordFlag(validator.isStrongPassword(value));
            break;
        case "secretQuestion":
            setFields({...fields, secretQuestion: value});
            break;
        case "answer":
            setFields({...fields, answer: value});
            break;
        case "phonePrefix":
            setFields({...fields, phonePrefix: value});
            break;
        case "phoneSuffix":
            setFields({...fields, phoneSuffix: value});
            setPhoneFlag(value.length === 7 && parseFloat(value)>0);
            break;
        default:
            break;
                // No default action
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/client/createClient", {
                name: fields.name,
                email: fields.email,
                password: fields.password,
                secretQuestion: fields.secretQuestion,
                answer: fields.answer,
                phone: fields.phonePrefix.concat(fields.phoneSuffix),
            });
            const {id, token} = response.data;
            const clientData = {name: fields.name, token, email: fields.email, id, userType: "client"};

            // Login the user after successful registration
            login(clientData.name, clientData.token, clientData.email, clientData.id, clientData.userType);

            // Show the Ant Design message
            message.success({
                content: "Registration Successful!",
                style: {yIndex: 1000, fontSize: "24px"},
            }, 2);


            // Navigate to the dashboard after 2 seconds
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        } catch (e) {
            console.log(e);
            message.error({
                content: "Registration Failed!",
                style: {fontSize: "24px"},
            });
        }
    };

    const isFormInvalid = !nameFlag || !passwordFlag || !emailFlag || !phoneFlag || !fields.answer || !fields.secretQuestion || !fields.phonePrefix;
    return (
        <div className="registration-form-container">
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Col} md="4" controlId="registrationName" className="centered-form-group">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        isValid={nameFlag}
                        isInvalid={!nameFlag && nameFlag !== null}
                        required
                        name = "name"
                        type="text"
                        placeholder="First name"
                        value={fields.name}
                        onChange = {handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                Name can only contain letters and spaces.
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" controlId="registrationEmail" className="centered-form-group">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                        required
                        isValid={emailFlag}
                        isInvalid={!emailFlag && emailFlag !== null}
                        name = "email"
                        type="email"
                        placeholder="Email address"
                        value={fields.email}
                        onChange = {handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Email must be in the form of email@email.tld</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" controlId="registrationPassword" className="centered-form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        isInvalid={!passwordFlag && passwordFlag !== null}
                        isValid={passwordFlag}
                        name = "password"
                        type="password"
                        placeholder="Password"
                        value = {fields.password}
                        onChange = {handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                Password must contain at least 1 uppercase character, 1 special character, 1 lowercase character, 1 digit and in the length of 8-30.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="phoneGroup" className="centered-form-group">
                    <Form.Label>Phone number</Form.Label>
                    <ClientDropDown
                        dropDownName= "phonePrefix"
                        handleSelectedValue = {handleChange}
                        attributes={phonePrefix}
                        id="phone-prefix-dropbox"
                        placeholder="Phone prefixes"
                        required
                        variant="primary"/>
                    <Form.Control
                        name="phoneSuffix"
                        type="text"
                        placeholder="Phone"
                        required
                        onChange={handleChange}
                        value={fields.phoneSuffix}
                        isInvalid={!phoneFlag && phoneFlag !== null}
                        isValid={phoneFlag} />
                    <Form.Control.Feedback type="invalid">
                    Phone number must contain only digits.
                    </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <div style={{height: "2px", backgroundColor: "white"}}></div>
                <Form.Group as={Col} md="6" controlId="secretQuestionRegistration" className="centered-form-group">
                    <Form.Label>Secret question</Form.Label>
                    <ClientDropDown
                        dropDownName= "secretQuestion"
                        handleSelectedValue = {handleChange}
                        attributes={questions}
                        id="secret-question-dropbox"
                        placeholder="Questions"
                        variant="danger"
                        required/>
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                        name="answer"
                        type="text"
                        placeholder="Answer"
                        onChange={handleChange}
                        required />
                    <Form.Control.Feedback type="invalid">
                Please provide an answer to the question
                    </Form.Control.Feedback>
                </Form.Group>

                <Button disabled={isFormInvalid} type="submit" className="centered-form-group">Register</Button>
            </Form>
        </div>
    );
};

export default ClientRegistrationForm;
