// src/components/AddAppointmentTypeModal.js

import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";
import {message} from "antd";

const AddAppointmentTypeModal=({show, onHide, onAddType, appTypesSize}) => {
    const {loggedIn, userData} = useAuth();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState(1);
    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [completeForm, setCompleteForm] = useState(false);

    useEffect(() => {
        setNameError(!/^[A-Za-z ]+$/.test(name));
        setPriceError(!/^[1-9][0-9]*$/.test(price));
        if (/^[A-Za-z ]+$/.test(name) && /^[1-9][0-9]*$/.test(price)) {
            setCompleteForm(true);
        } else {
            setCompleteForm(false);
        }
    }, [name, price]);


    const handleAddType = async () => {
        if (!loggedIn) {
            return;
        }
        if (appTypesSize === 10) {
            window.alert("You have reached max capacity of 10 appointment types");
            return;
        }
        const goodName = /^[A-Za-z ]+$/.test(name);
        const goodPrice = /^[1-9][0-9]*$/.test(price);

        if (!goodName) {
            setNameError(true);
            return;
        }
        if (!goodPrice) {
            setPriceError(true);
            return;
        }

        try {
            const response = await axios.post(`/appointmentType/create/${userData.id}`, {
                name: name,
                price: Number(price),
                duration: duration,
            }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            // On success
            const newType = response.data.appointmentType;
            onAddType(newType);
            onModalHide();
            setNameError(false);
            setPriceError(false);
        } catch (error) {
            console.log(error);
            message.error({

                content: `${error}`,

                style: {yIndex: 1000, fontSize: "24px"},

            }, 2);
        }
    };

    const onModalHide = () => {
        setName("");
        setPrice("");
        setDuration(1);
        onHide();
    };

    return (
        <Modal show={show} onHide={onModalHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Appointment Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter the type name here"
                            isInvalid={nameError}
                        />
                        <Form.Control.Feedback type="invalid">
              Name must contain only letters and spaces.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter a price"
                            isInvalid={priceError}
                        />
                        <Form.Control.Feedback type="invalid">
              Price must be a positive number.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDuration">
                        <Form.Label>Duration (Hours):</Form.Label>
                        <Form.Control
                            as="select"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5].map((hours) => (
                                <option key={hours} value={hours}>
                                    {hours} {hours === 1 ? "Hour" : "Hours"}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onModalHide}>
          Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={async () => await handleAddType()}
                    disabled={!completeForm}>
          Add Type
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

AddAppointmentTypeModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onAddType: PropTypes.func,
    appTypesSize: PropTypes.number,
};

export default AddAppointmentTypeModal;
