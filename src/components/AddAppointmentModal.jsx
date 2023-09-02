// src/components/AddAppointmentTypeModal.js

import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const AddAppointmentTypeModal=({show, onHide, onAddType}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState(1);
    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [completeForm, setCompleteForm] = useState(false);

    useEffect(() => {
        setNameError(!/^[A-Za-z ]+$/.test(name));
        setPriceError(!/^[0-9]+$/.test(price));
        if (/^[A-Za-z ]+$/.test(name) && /^[0-9]+$/.test(price)) {
            setCompleteForm(true);
        } else {
            setCompleteForm(false);
        }
    }, [name, price]);


    const handleAddType = () => {
        const goodName = /^[A-Za-z ]+$/.test(name);
        const goodPrice = /^[0-9]+$/.test(price);
        if (goodName && goodPrice) {
            onAddType(name, price, duration);
            onHide();
            setNameError(false);
            setPriceError(false);
        } else if (!goodName) {
            setNameError(true);
        } else if (!goodPrice) {
            setPriceError(true);
        }
    };


    return (
        <Modal show={show} onHide={onHide}>
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
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
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
                <Button variant="secondary" onClick={onHide}>
          Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleAddType}
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
};

export default AddAppointmentTypeModal;
