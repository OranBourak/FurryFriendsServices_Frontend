import React, {useState, useEffect} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import PropTypes from "prop-types";

const EditAppointmentModal=({show, onHide, onSave, name, price, duration})=> {
    const [editedName, setEditedName] = useState(name);
    const [editedPrice, setEditedPrice] = useState(price);
    const [editedDuration, setEditedDuration] = useState(duration);
    const [completeForm, setCompleteForm] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);

    useEffect(() => {
        setNameError(!/^[A-Za-z ]+$/.test(editedName));
        setPriceError(!/^[1-9][0-9]*$/.test(editedPrice));
        if (/^[A-Za-z ]+$/.test(editedName) && /^[1-9][0-9]*$/.test(editedPrice)) {
            setCompleteForm(true);
        } else {
            setCompleteForm(false);
        }
    }, [editedName, editedPrice]);

    const handleSave = () => {
        const goodName = /^[A-Za-z ]+$/.test(editedName);
        const goodPrice = /^[1-9][0-9]*$/.test(editedPrice);
        if (goodName && goodPrice) {
            onSave(editedName, editedPrice, editedDuration);
            onHide();
            setNameError(false);
            setPriceError(false);
        } else if (!goodName) {
            setNameError(true);
        } else if (!goodPrice) {
            setPriceError(true);
        }
    };

    const onEditorHide = () => {
        setEditedName("");
        setEditedDuration(1);
        setEditedPrice(0);
        onHide();
    };

    return (
        <Modal show={show} onHide={onEditorHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Appointment Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
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
                            value={editedPrice}
                            onChange={(e) => setEditedPrice(e.target.value)}
                            isInvalid={priceError}
                        />
                        <Form.Control.Feedback type="invalid">
                        Price must be positive.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDuration">
                        <Form.Label>Duration (Hours):</Form.Label>
                        <Form.Control
                            as="select"
                            value={editedDuration}
                            onChange={(e) => setEditedDuration(Number(e.target.value))}
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
                <Button variant="secondary" onClick={onEditorHide}>
          Cancel
                </Button>

                <Button variant="primary" onClick={handleSave} disabled={!completeForm}>
          Save
                </Button>

            </Modal.Footer>
        </Modal>
    );
};

EditAppointmentModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onSave: PropTypes.func,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    duration: PropTypes.number,
};

export default EditAppointmentModal;
