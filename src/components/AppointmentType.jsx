// src/components/AppointmentType.js

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "bootstrap/dist/css/bootstrap.min.css";


/**
 * Type component
 *
 * @param {String} name
 * @param {Number} price
 * @param {Number} duration
 * @param {Function} onEdit
 * @param {Function} onDelete
 * @return {React.Component}
 */
function AppointmentType({name, price, duration, onEdit, onDelete}) {
    return (
        <Card className="appointment-type">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Price: ${price}</Card.Text>
                <Card.Text>Duration: {duration} Hours</Card.Text>
                <Button variant="primary" onClick={onEdit}>
          Edit
                </Button>
                <Button variant="danger" onClick={onDelete}>
          Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

AppointmentType.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default AppointmentType;
