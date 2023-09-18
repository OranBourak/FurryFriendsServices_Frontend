import React, {useState, useEffect} from "react";
import {Container, Row, Col, Image, Form, Alert, Button, Card} from "react-bootstrap";
import "../../styles/ServiceProviderStyles/ProfilePage.css";
import PhoneNumberEl from "../../components/ServiceProviderComponents/PhoneNumberEl.jsx";
import ComboBoxDropdown from "../../components/ServiceProviderComponents/ComboBox.jsx";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {message, Divider} from "antd";
import ReviewCarousel from "../../components/client_components/ServiceProviderReviews.jsx";

const ProfilePage = () => {
    const defaultImg = "";

    const {loggedIn, userData, changeName} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("Israel");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState(
        "",
    );
    const [isEditingPicture, setIsEditingPicture] = useState(false);
    const [phonePrefix, setPhonePrefix] = useState("");
    const [bio, setBio] = useState("");
    const [validationErrorName, setValidationErrorName] = useState(false);
    const [validationErrorEmail, setValidationErrorEmail] = useState(false);
    const [typeOfService, setTypeOfService] = useState("");
    const [validationErrorImage, setValidationErrorImage] = useState(false);
    const [validationErrorPhone, setValidationErrorPhone] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [averageRating, setAverageRating] = useState("No reviews yet!");

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

    const getData = async () => {
        if (loggedIn) {
            // get provider information
            try {
                const response = await axios.get(`/serviceProvider/get/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`, // Replace 'userToken' with the actual user token
                    },
                });
                const provider = response.data.serviceProvider;
                setName(provider.name);
                setEmail(provider.email);
                setPhone(provider.phone.substr(3));
                setPhonePrefix(provider.phone.substr(0, 3));
                setCountry(provider.country);
                setGender(provider.gender);
                setImage(provider.image);
                setBio(provider.bio);
                setTypeOfService(provider.typeOfService);
                setCity(provider.city);
                if (provider.averageRating > 0) {
                    setAverageRating(provider.averageRating);
                }
            } catch (error) {
                console.log(error);
                message.error({

                    content: `error: ${error.response.data.error}`,

                    style: {yIndex: 1000, fontSize: "24px"},

                }, 2);
            }
        }
    };
    useEffect(() => {
        getData();
    }, []);

    const handleEdit = () => {
        saveBeforeEdit();
        setIsEditing(true);
        setFormSubmitted(false); // Reset the formSubmitted state
    };

    const saveBeforeEdit = () => {
        // save the information of the user before
        localStorage.setItem("nameBeforeEdit", name);
        localStorage.setItem("emailBeforeEdit", email);
        localStorage.setItem("phonePrefixBeforeEdit", phonePrefix);
        localStorage.setItem("phoneBeforeEdit", phone);
        localStorage.setItem("countryBeforeEdit", country);
        localStorage.setItem("genderBeforeEdit", gender);
        localStorage.setItem("bioBeforeEdit", bio);
        localStorage.setItem("cityBeforeEdit", city);
    };

    const removeBeforeEdit = () => {
        // Remove items from local storage
        localStorage.removeItem("nameBeforeEdit");
        localStorage.removeItem("emailBeforeEdit");
        localStorage.removeItem("phonePrefixBeforeEdit");
        localStorage.removeItem("phoneBeforeEdit");
        localStorage.removeItem("countryBeforeEdit");
        localStorage.removeItem("genderBeforeEdit");
        localStorage.removeItem("bioBeforeEdit");
        localStorage.removeItem("cityBeforeEdit");
    };

    const restoreBeforeEdit = () => {
        setName(localStorage.getItem("nameBeforeEdit"));
        setEmail(localStorage.getItem("emailBeforeEdit"));
        setPhone(localStorage.getItem("phoneBeforeEdit"));
        setPhonePrefix(localStorage.getItem("phonePrefixBeforeEdit"));
        setCountry(localStorage.getItem("countryBeforeEdit"));
        setGender(localStorage.getItem("genderBeforeEdit"));
        setBio(localStorage.getItem("bioBeforeEdit"));
        setCity(localStorage.getItem("cityBeforeEdit"));
    };

    const handleEditPicture = () => {
        setIsEditingPicture(true);
        setFormSubmitted(false); // Reset the formSubmitted state
    };

    const testURL = () => {
        if (image) { // check if there's an image from the db else don't check
        // List of common image file extensions
            const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];

            // Get the file extension from the URL (if it exists)
            const fileExtensionMatch = image.match(/\.\w+$/);
            if (fileExtensionMatch) {
                const fileExtension = fileExtensionMatch[0].toLowerCase();
                if (imageExtensions.includes(fileExtension)) {
                    return true;
                }
            }

            // Check if the URL contains keywords that suggest it's an image
            const imageKeywords = ["image", "imgur", "jpg", "jpeg", "png", "gif", "bmp"];
            const urlLowercase = image.toLowerCase();
            if (imageKeywords.some((keyword) => urlLowercase.includes(keyword))) {
                return true;
            }

            return false;
        } else {
            return true;
        }
    };


    const handleSave = async () => {
        if (!/[A-Za-z]+[0-9A-Za-z]*[@][a-z]+[.][a-z]+/.test(email)) {
            setValidationErrorEmail(true);
            return;
        }
        // if the phone number doesn't consists of 7 digits
        if (!/^\d{7}$/.test(phone)) {
            setValidationErrorPhone(true);
            return;
        }
        if (!/[A-Za-z ]+/.test(name)) {
            setValidationErrorName(true);
            return;
        }
        console.log("test");
        if (!testURL()) {
            setValidationErrorImage(true);
            return;
        }

        isFormIncomplete = !email.trim() || !name.trim() || !phonePrefix.trim() || !phone.trim() || !gender.trim();
        if (isFormIncomplete) {
            return;
        }

        setValidationErrorEmail(false);
        setValidationErrorName(false);
        setIsEditing(false);
        setIsEditingPicture(false);
        setFormSubmitted(true);

        // post the new data to the backend
        try {
            await axios.patch(`/serviceProvider/update/${userData.id}`, {
                name: name,
                email: email,
                phone: phonePrefix + phone,
                country: country,
                city: city,
                gender: gender,
                image: image,
                bio: bio,
            }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            changeName(name);
        } catch (error) {
            restoreBeforeEdit();
            console.log(error);
            if (error.response && error.response.data) {
                message.error({

                    content: `error: ${error.response.data.error}`,

                    style: {yIndex: 1000, fontSize: "24px"},

                }, 2);
            }
        }
        removeBeforeEdit();
    };


    const handleNameChange=(event)=> {
        const newName = event.target.value;
        setName(newName);
        console.log("New Name:", newName); // Add this line to log the new name value
        setValidationErrorName(!/^[A-Za-z ]+$/.test(newName));
    };

    const handleEmailChange=(event)=> {
        const newEmail = event.target.value;
        setEmail(newEmail);
        console.log("New Email:", newEmail); // Add this line to log the new Email value
        setValidationErrorEmail(!/^[A-Za-z]+[0-9A-Za-z]*[@][a-z]+[.][a-z]+$/.test(newEmail));
    };

    /**
     * Handles change in phone number input.
     * @param {Event} event - The input change event.
     */
    function handlePhoneNumber(event) {
        const newPhoneNumber = event.target.value;
        console.log("handle phone number");
        setPhone(newPhoneNumber);
        setValidationErrorPhone(!/^\d{7}$/.test(newPhoneNumber));
    }

    const handleCityChange = (newCity) => {
        setCity(newCity);
    };

    let isFormIncomplete = !email.trim() || !name.trim() || !phonePrefix.trim() || !phone.trim() || !gender.trim() || !country.trim() || !city.trim();

    /**
     * Handles change in phone prefix combobox.
     * @param {String} newPrefix - The selected combobox option string.
     */
    const handlePhonePrefixChange = (newPrefix) => {
        setPhonePrefix(newPrefix);
    };


    const handleImageUpload = (e) => {
        const selectedImage = e.target.value;
        console.log(selectedImage);
        setImage(selectedImage);
        setValidationErrorImage(!testURL());
    };


    if (!loggedIn) {
        // Redirect to the home page or another protected route
        return <Navigate to="/" />;
    } else if (userData.userType !== "serviceProvider") {
        return <Navigate to="/error"/>;
    }

    return (
        <div className="SP-profile-background">
            <Container className="container mt-5">
                <Row className="profile-header justify-content-start">
                    {/* Column for the text and image */}
                    <Col xs="auto" className="text-center">
                        <Image
                            className="profile-picture"
                            src={image ? image : defaultImg}
                            rounded
                            fluid
                            style={{maxHeight: "300px", maxWidth: "300px"}}
                            height="300px"
                            width="300px"
                        />
                        {isEditingPicture && (
                            <Form>
                                <Form.Control
                                    type="input"
                                    label="Input an image URL"
                                    onChange={handleImageUpload}
                                    placeholder="Input an image URL"
                                    isInvalid={validationErrorImage}
                                    isValid={!validationErrorImage}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                    Must be a valid image format
                                </Form.Control.Feedback>
                            </Form>
                        )}

                    </Col>
                    <Col xs="auto" className="text-center align-items-center">
                        <p className="SP-Header">{name}</p>
                        <p className="SP-Header2">{typeOfService}</p>
                    </Col>
                </Row>


                <Divider/>
                <Row className="SP-profile-section">
                    <Col className="profile-subsection">
                        <h4 className="profile-subtitle">Name</h4>
                        {isEditing ? (
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        isInvalid={validationErrorName}
                                        isValid={!validationErrorName}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                        Name must contain only letters and spaces.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        ) : (
                            <p>{name}</p>
                        )}
                    </Col>
                    <Divider />
                    <Row className="profile-subsection">
                        <h4 className="profile-subtitle">Contact Details</h4>
                        {isEditing ? (
                            <Form>
                                <Form.Group >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        isInvalid={validationErrorEmail}
                                        isValid={!validationErrorEmail}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                Please provide a valid email.
                                    </Form.Control.Feedback>
                                    <Form.Label>Phone Number</Form.Label>
                                    <PhoneNumberEl
                                        onSelectedValueChange={handlePhonePrefixChange}
                                        onInputValueChange={handlePhoneNumber}
                                        phoneInputPlaceholder = {phone}
                                        comboBoxPlaceholder = {phonePrefix}
                                        cbVariant="danger"
                                    />
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        isInvalid={isFormIncomplete}
                                        disabled={true}
                                        required
                                    />
                                    <Form.Label>City</Form.Label>
                                    <ComboBoxDropdown onSelectedValueChange={handleCityChange} options={israelCities} placeholder={city} variant="success" id="city-cmb" />
                                </Form.Group>
                            </Form>
                        ) : (
                            <p>
              Email: {email}
                                <br />
              Phone: {`(${phonePrefix})`} {phone}
                                <br />
              Country: {country}
                                <br />
              City: {city}
                            </p>
                        )}
                    </Row>
                    <Divider />
                    <Col className="profile-subsection">
                        <h4 className="profile-subtitle">Gender</h4>
                        {isEditing ? (
                            <Form.Control
                                as="select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Form.Control>
                        ) : (
                            <p>{gender}</p>
                        )}
                    </Col>
                    <Divider/>
                </Row>
                <Row className="SP-profile-section SP-profle-row-margin">
                    <Card>
                        <Card.Title className="profile-subtitle">Bio</Card.Title>
                        {isEditing ? (
                            <Form.Control
                                as="textarea"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        ) : (
                            <Card.Text>{bio}</Card.Text>
                        )}
                    </Card>
                </Row>
                <Row>
                    {(validationErrorName || validationErrorEmail || validationErrorImage || validationErrorPhone) && (
                        <Alert variant="danger">
          Please fix the validation errors before saving.
                        </Alert>
                    )}
                    {}
                    {!isEditing && !isEditingPicture ? (
                        <>
                            <Row className="justify-content-center SP-profle-row-margin">
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        onClick={handleEdit}>
                                Edit Profile
                                    </Button>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="secondary"
                                        onClick={handleEditPicture}>
                                    Edit Profile Picture
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            disabled={isFormIncomplete || validationErrorEmail || validationErrorName || validationErrorPhone}>
                        Save
                        </Button>
                    )}
                </Row>

                {formSubmitted && (<Row>
                    <Alert variant="success" onClose={() => setFormSubmitted(false)} dismissible>
                    Form submitted successfully!
                    </Alert>
                </Row>)}
                <Row className="SP-profile-section SP-profle-row-margin pb-3">
                    <h2>Rating: {averageRating}</h2>
                    <Divider />
                    <div className="SP-profile-review-carusel">
                        <ReviewCarousel
                            providerID={userData.id}
                        />
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
