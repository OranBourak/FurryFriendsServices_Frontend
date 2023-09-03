import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// name, email, password, secret question - combo box and text input, phone number - combo box and number input

// validation
import validator from "validator";

// components
import ComboBoxDropdown from "./ComboBox.jsx";

const ClientRegistrationForm = () => {
    // form fields include all attributes in the fields state
    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        secret_question: "",
        answer: "",
        phone_prefix: "",
        phone_suffix: "",
    });
    const questions = ["Option 1", "Option 2", "Option 3"];
    const phonePrefix = ["05"];
    // if a flag is set to true, field is validated, else not validated.
    const [nameFlag, setNameFlag] = useState(false);
    const [emailFlag, setEmailFlag] = useState(false);
    const [passwordFlag, setPasswordFlag] = useState(false);

    const handleChange = (e) => {
        console.log(e.target);
        const {name, value} = e.target;
        switch (name) {
        case "name":
            setFields({...fields, name: value});
            setNameFlag(/^[A-Za-z]+([ ][A-Za-z])*$/.test(value));
            break;
        case "email":
            setFields({...fields, email: value});
            setEmailFlag(validator.isEmail(value));
            break;
        case "password":
            setFields({...fields, password: value});
            setPasswordFlag(validator.isStrongPassword(value));
            break;
        case "secret_question":
            setFields({...fields, secret_question: value});
            break;
        case "answer":
            setFields({...fields, answer: value});
            break;
        case "phone_prefix":
            setFields({...fields, phone_prefix: value});
            break;
        case "phone_suffix":
            setFields({...fields, phone_suffix: value});
            break;
        default:
            break;
                // No default action
        }
    };

    const handleSubmit = (e) => {
        console.log(e);
    };

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="registrationName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        isValid={nameFlag}
                        isInvalid={!nameFlag}
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


                <Form.Group as={Col} md="4" controlId="registrationEmail">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                        required
                        isValid={emailFlag}
                        isInvalid={!emailFlag}
                        name = "email"
                        type="email"
                        placeholder="Email address"
                        value={fields.email}
                        onChange = {handleChange}
                    />
                    <Form.Control.Feedback type="invalid">Email must be in the form of email@email.tld</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" controlId="registrationPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        isInvalid={!passwordFlag}
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
            </Row>


            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="secretQuestionRegistration">
                    <Form.Label>Secret question</Form.Label>
                    <ComboBoxDropdown
                        name= "secret_question"
                        onSelectedValueChange={() => {}}
                        onChange = {handleChange}
                        options={questions}
                        placeholder="Choose Security Question"
                        variant="primary" id="secret-question-dropbox" required/>
                    <Form.Label>Answer</Form.Label>
                    <Form.Control name="answer" type="text" placeholder="Answer" required />
                    <Form.Control.Feedback type="invalid">
            Please provide an answer to the question
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="phoneNumberRegistration">
                    <Form.Label>Phone number</Form.Label>
                    <ComboBoxDropdown
                        name="phone_prefix"
                        onSelectedValueChange={handleChange}
                        options={phonePrefix}
                        placeholder="Choose phone prefix"
                        variant="primary" id="phone-prefix-dropbox" required/>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="phoneNumberRegistration">
                    <Form.Label>Phone suffix</Form.Label>
                    <Form.Control name="phone_suffix" type="number" placeholder="Phone" required />
                    <Form.Control.Feedback type="invalid">
            Phone number must contain only digits.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            {/* <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group> */}
            <Button type="submit">Submit form</Button>
        </Form>
    );
};


export default ClientRegistrationForm;
