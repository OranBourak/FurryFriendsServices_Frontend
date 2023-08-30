/* eslint-disable linebreak-style */
import React, {useState} from "react";
import {Container, Row, Col, Image, Form, Alert} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../styles/ProfilePage.css";
import PhoneNumberEl from "./PhoneNumberEl";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("johndoe@example.com");
    const [phone, setPhone] = useState("4567890");
    const [country, setCountry] = useState("Israel");
    const [gender, setGender] = useState("Male");
    const [image, setImage] = useState(
        "https://cdn.pixabay.com/photo/2018/12/26/09/16/vet-3895477_960_720.jpg",
    );
    const [isEditingPicture, setIsEditingPicture] = useState(false);
    const [phonePrefix, setPhonePrefix] = useState("050");
    const [bio, setBio] = useState(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    );
    const [validationError, setValidationError] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
        setFormSubmitted(false); // Reset the formSubmitted state
    };

    const handleEditPicture = () => {
        setIsEditingPicture(true);
        setFormSubmitted(false); // Reset the formSubmitted state
    };

    const handleSave = () => {
        if (email === "" || !email.includes("@") || !email.includes(".")) {
            setValidationError(true);
            return;
        }
        // if the phone number doesn't consists of 7 digits
        if (!/^\d{7}$/.test(phone)) {
            return;
        }
        if (!/[A-Za-z ]+/.test(name)) {
            setValidationError(true);
            return;
        }

        setValidationError(false);
        setIsEditing(false);
        setIsEditingPicture(false);
        setFormSubmitted(true);
    };

    const handleNameChange=(event)=> {
        const newName = event.target.value;
        setName(newName);
        console.log("New Name:", newName); // Add this line to log the new name value
        if (!/^[A-Za-z ]+$/.test(newName)) {
            setValidationError(true);
        } else {
            setValidationError(false);
        }
    };

    /**
     * Handles change in phone number input.
     * @param {Event} event - The input change event.
     */
    function handlePhoneNumber(event) {
        console.log("handle phone numner");
        setPhone(event.target.value);
    }

    const isFormIncomplete = !email.trim() || !name.trim() || !phonePrefix.trim() || !phone.trim() || !gender.trim();

    /**
     * Handles change in phone prefix combobox.
     * @param {String} newPrefix - The selected combobox option string.
     */
    const handlePhonePrefixChange = (newPrefix) => {
        setPhonePrefix(newPrefix);
    };


    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];

        // Check if a file was selected
        if (selectedImage) {
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (selectedImage.size <= maxSize) {
                const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
                if (validImageTypes.includes(selectedImage.type)) {
                    const imageUrl = URL.createObjectURL(selectedImage);
                    setImage(imageUrl);
                } else {
                    alert("Please select a valid image file (JPEG, PNG, GIF).");
                }
            } else {
                alert("Image size must be below 5MB.");
            }
        }
    };


    return (
        <Container className="profile-container">
            <Row className="profile-header">
                <Col className="profile-image" xs={6} md={4}>
                    <Image className="profile-picture" src={image} rounded fluid style={{maxHeight: "300px", maxWidth: "300px"}}/>
                    {isEditingPicture && (
                        <Form>
                            <Form.Control
                                type="file"
                                id="custom-file"
                                label="Choose an image file"
                                custom
                                onChange={handleImageUpload}
                            />
                        </Form>
                    )}
                </Col>
                <Col className="profile-name" xs={6} md={4}>
                    <h1>{name}</h1>
                    <h3>Veterinarian</h3>
                </Col>
            </Row>
            <Row className="profile-section">
                <Col className="profile-subsection">
                    <h4 className="profile-subtitle">Name</h4>
                    {isEditing ? (
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    isInvalid={validationError}
                                    isValid={!validationError}
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
                <Row className="profile-subsection">
                    <h4 className="profile-subtitle">Contact Details</h4>
                    {isEditing ? (
                        <Form>
                            <Form.Group >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isInvalid={validationError}
                                    isValid={!validationError}
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
                                />
                            </Form.Group>
                        </Form>
                    ) : (
                        <p>
              Email: {email}
                            <br />
              Phone: {`(${phonePrefix})`} {phone}
                            <br />
              Country: {country}
                        </p>
                    )}
                </Row>
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
            </Row>
            <Row className="profile-section">
                <h4 className="profile-subtitle">Bio</h4>
                {isEditing ? (
                    <Form.Control
                        as="textarea"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                ) : (
                    <p>{bio}</p>
                )}
            </Row>
            <Row>
                {validationError && (
                    <Alert variant="danger">
          Please fix the validation errors before saving.
                    </Alert>
                )}
                {!isEditing && !isEditingPicture ? (
                    <><Button variant="primary" onClick={handleEdit}>
                        Edit Profile
                    </Button><Button variant="secondary" onClick={handleEditPicture}>
                            Edit Profile Picture
                    </Button></>
                ) : (
                    <Button variant="primary" onClick={handleSave} disabled={isFormIncomplete}>
          Save
                    </Button>
                )}
            </Row>

            {formSubmitted && (<Row>
                <Alert variant="success" onClose={() => setFormSubmitted(false)} dismissible>
                    Form submitted successfully!
                </Alert>
            </Row>)}
            <Row className="profile-section">
                <p>Rating: No rating</p>
                <h2>Reviews</h2>
            </Row>
        </Container>
    );
};

export default ProfilePage;
