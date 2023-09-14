import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../../styles/ServiceProviderStyles/RegisterPage.css";
import ComboBoxDropdown from "../../components/ServiceProviderComponents/ComboBox.jsx";
import PhoneNumberEl from "../../components/ServiceProviderComponents/PhoneNumberEl.jsx";
import Card from "react-bootstrap/Card";
import ErrorToast from "../../components/ServiceProviderComponents/ErrorToast";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {message} from "antd";

/**
 * Register page component.
 * @return {React.Component} - The Register page component.
 */
function RegisterPage() {
    // Name
    const [name, setName] = useState("");
    const [nameFlag, setNameFlag] = useState(false);
    // Email
    const [email, setEmail] = useState("");
    const [emailFlag, setEmailFlag] = useState(false);
    // Phone
    const [phonePrefix, setPhonePrefix] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberFlag, setPhoneNumberFlag] = useState(false);
    // Password
    const [password, setPassword] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    // Question
    const [question, setSelectedQuestion] = useState("");
    // Answer
    const [answer, setAnswer] = useState("");
    // Gender
    const [gender, setGender] = useState("");
    // Service Type
    const [serviceType, setServiceType] = useState("");
    // City
    const [city, setCity] = useState("");
    // Error
    const [error, setError] = useState("");

    const [show, setShow] = useState(false);

    // redirect
    const [redirectToProfile, setRedirectToProfile] = useState(false);

    // params
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
    const israelCities = [
        "Afula",
        "Akko",
        "Arad",
        "Ashdod",
        "Ashqelon",
        "Bat Yam",
        "Beersheba",
        "Bet Sheʾan",
        "Bet Sheʿarim",
        "Bnei Brak",
        "Caesarea",
        "Dimona",
        "Dor",
        "Elat",
        "En Gedi",
        "Givʿatayim",
        "H̱adera",
        "Haifa",
        "Herzliyya",
        "H̱olon",
        "Jerusalem",
        "Karmiʾel",
        "Kefar Sava",
        "Lod",
        "Meron",
        "Nahariyya",
        "Nazareth",
        "Netanya",
        "Petaẖ Tiqwa",
        "Qiryat Shemona",
        "Ramat Gan",
        "Ramla",
        "Reẖovot",
        "Rishon LeẔiyyon",
        "Sedom",
        "Tel Aviv–Yafo",
        "Tiberias",
        "Zefat",
    ];


    const genders = ["Male", "Female", "Other"];
    const serviceTypes = ["Dog Walker", "Veterinarian", "Dog Groomer"];
    const successVarinat= "success";
    const {login} = useAuth();
    /**
     * Handles form submission.
     * @param {Event} event - The form submit event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormInvalid) {
            setError("Please fill in all fields.");
            return;
        }
        setError(""); // Clear any previous errors
        // for commit: https://furryfriendsbackend.onrender.com/login
        // for testing: http://localhost:5000/login
        try {
            const response = await axios.post("/serviceProvider/create/", {
                name: name,
                email: email,
                password: password,
                phone: (phonePrefix + phoneNumber),
                question: question,
                answer: answer,
                city: city,
                gender: gender,
                typeOfService: serviceType,
            });
            const {token, id} = response.data;
            setName(response.data.name);
            const userType = "serviceProvider";
            // const userData = {
            //     id,
            //     name,
            //     token,
            //     userType,
            //     email,
            // };
            login(name, token, email, id, userType);
            // localStorage.setItem("user", JSON.stringify(userData));
            setRedirectToProfile(true);
        } catch (error) {
            console.log("error: " + error);
            message.error({

                content: `error: ${error.response.data.error}`,

                style: {yIndex: 1000, fontSize: "24px"},

            }, 2);
            setError(error.response.data.message || "Registration failed.");
            setShow(true);
        }
    };

    // const printFields = () =>{
    //     console.log(name);
    //     console.log(email);
    //     console.log(password);
    //     console.log(question);
    //     console.log(answer);
    //     console.log("is form incomplete: " + isFormInvalid);
    //     console.log(phonePrefix);
    //     console.log(phoneNumber);
    //     console.log(gender);
    //     console.log(serviceType);
    // };


    /**
     * Handles change in name input.
     * @param {Event} event - The input change event.
     */
    function handleName(event) {
        const newName = event.target.value;
        setName(newName);
        setNameFlag(!/^[A-Za-z ]+$/.test(newName));
    }

    /**
     * Handles change in email input.
     * @param {Event} event - The input change event.
     */
    function handleEmail(event) {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setEmailFlag(!/^[A-Za-z]+[0-9A-Za-z]*[@][a-z]+[.][a-z]+$/.test(newEmail));
    }

    /**
     * Handles change in phone prefix combobox.
     * @param {String} newPrefix - The selected combobox option string.
     */
    const handlePhonePrefixChange = (newPrefix) => {
        setPhonePrefix(newPrefix);
    };

    /**
     * Handles change in phone number input.
     * @param {Event} event - The input change event.
     */
    function handlePhoneNumber(event) {
        const newPhone = event.target.value;
        setPhoneNumber(newPhone);
        setPhoneNumberFlag(!/^\d{7}$/.test(newPhone));
    }

    /**
     * Handles change in password input.
     * @param {Event} event - The input change event.
     */
    function handlePassword(event) {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordFlag(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,30}$/.test(newPassword));
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

    /**
     * Handles change in gender combobox input.
     * @param {String} newGender - The gender the user chose in the combobox.
     */
    const handleGenderChange = (newGender) => {
        setGender(newGender);
    };

    /**
     * Handles change in service type combobox input.
     * @param {String} newServiceType - The gender the user chose in the combobox.
     */
    const handleServiceTypeChange = (newServiceType) => {
        setServiceType(newServiceType);
    };

    const handleCityChange = (newCity) => {
        setCity(newCity);
    };

    // Check if form is valid, Controls the state of the register button
    const isFormInvalid = emailFlag || passwordFlag || nameFlag || phoneNumberFlag ||
     !question.trim() || !answer.trim() || !gender.trim()||
     !serviceType.trim() || !phonePrefix.trim() || !email.trim() ||
     !password.trim() || !name.trim() || !phoneNumber.trim() || !city.trim();
    return (
        <div className="register-page-container">
            {redirectToProfile && <Navigate to="/profile" />}
            <div className="container">
                <Form className="text-light main-theme p-4" onSubmit={handleSubmit} >
                    <div className="row-flex">
                        <div className="w-50" data-name="form">
                            {/* name input */}
                            <Form.Group className="mb-3 m-3" controlId="registrationFormName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control className ="width-80" name="name" type="text" placeholder="Enter Your Name" onChange={handleName} required value={name} isInvalid={nameFlag}isValid={!nameFlag} />
                                <Form.Control.Feedback type="invalid">
                                    Name must contain only letters and spaces
                                </Form.Control.Feedback>
                            </Form.Group>
                            {/* email input */}
                            <Form.Group className="mb-3 m-3" controlId="registrationFormEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control className="width-80" name="email" type="email" placeholder="Enter Email" isInvalid={emailFlag} isValid={!emailFlag} onChange={handleEmail} required value={email} />
                                <Form.Control.Feedback type="invalid">
                                    Email format should be as follows: example@mail.domain
                                </Form.Control.Feedback>
                                <Form.Text className="text-danger">We`ll never share your email with anyone else.</Form.Text>
                            </Form.Group>
                            {/* password input */}
                            <Form.Group className="mb-3 m-3" controlId="registrationFormPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="width-80" name="password" type="password" placeholder="Enter Password" isInvalid={passwordFlag}isValid={!passwordFlag} onChange={handlePassword} required value={password} />
                                <Form.Control.Feedback type="invalid">
                                    Should contain at least: 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special case character, min size:12, max size:30
                                </Form.Control.Feedback>
                            </Form.Group>
                            {/* phone number input*/}
                            <Form.Group className="mb-3 m-3" controlId="registrationFormPhone">
                                <Form.Label>Phone Number</Form.Label>
                                <PhoneNumberEl onSelectedValueChange={handlePhonePrefixChange} onInputValueChange={handlePhoneNumber} comboBoxPlaceholder="Phone Prefix" phoneInputPlaceholder="Enter Phone Number" cbVariant={successVarinat} />
                            </Form.Group>
                            {/* gender input */}
                            <Form.Group className="mb-3 m-3" controlId="registrationFormGender">
                                <Form.Label>Gender</Form.Label>
                                <ComboBoxDropdown onSelectedValueChange={handleGenderChange} options={genders} placeholder="Choose Gender" variant={successVarinat} id="gender-cmb" />
                            </Form.Group>
                            {/* service type input */}
                            <Form.Group className="mb-3 m-3" controlId="registrationFormServiceType">
                                <Form.Label>Service Type</Form.Label>
                                <ComboBoxDropdown onSelectedValueChange={handleServiceTypeChange} options={serviceTypes} placeholder="Choose The Service You Provide" variant={successVarinat} id="service-type-cmb" />
                            </Form.Group>
                            <Form.Group className="mb-3 m-3" controlId="registrationFormCity">
                                <Form.Label>City</Form.Label>
                                <ComboBoxDropdown onSelectedValueChange={handleCityChange} options={israelCities} placeholder="Choose Your city" variant={successVarinat} id="city-cmb" />
                            </Form.Group>
                            <div className="border-bottom border-light"></div>
                            {/* information for passwrod recovery */}
                            <div className="square border border-secondary rounded-5 m-3">
                                <Form.Group className="mb-3 m-3" controlId="registrationFormAnswer">
                                    {/* security question combobox */}
                                    <Form.Label>Security Question</Form.Label>
                                    <ComboBoxDropdown onSelectedValueChange={handleQuestionChange} options={questions} placeholder="Choose Security Question" variant="danger" id="service-type-cmb" required/>
                                    {/* answer to the security question */}
                                    <Form.Label>Answer</Form.Label>
                                    <Form.Control className="width-80" name="answer" type="text" placeholder="Enter Answer" onChange={handleAnswer} required value={answer} />
                                    <Form.Text className="text-light bold">The answer will be used for password restoration.</Form.Text>
                                </Form.Group>
                            </div>
                            {/* register button */}
                            <Button className="mt-3 m-3" variant="primary" type="submit" disabled={isFormInvalid}>
                                Register
                            </Button>
                        </div>
                        <div data-name="register-advantages" className="border-left-light w-50" >
                            <div className="column-flex-center margin-top">
                                <Card
                                    bg="info"
                                    key="Info"
                                    text="white"
                                    style={{width: "90%"}}
                                    className="mb-3 center"
                                >
                                    <Card.Header className="h3">Unleash Your Pet Service Potential!🐾</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            &#8226; Grow your pet service business.
                                        </Card.Text>
                                        <Card.Text>
                                            &#8226; Connect with pet owners seeking expertise.
                                        </Card.Text>
                                        <Card.Text>
                                            &#8226; Build trust through reviews and ratings.
                                        </Card.Text>
                                        <Card.Text>
                                            &#8226; Expand your reach to new markets.
                                        </Card.Text>
                                        <Card.Text>
                                            &#8226; Create up to 10 unique appointment types tailored by you.
                                        </Card.Text>
                                        <Card.Text>
                                            &#8226; Effortlessly manage appointments and stay organized.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <ErrorToast errorText={error} show={show} setShow={setShow} />
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

// RegisterPage.propTypes = {
//     onRegister: PropTypes.func.isRequired,
// };

export default RegisterPage;
