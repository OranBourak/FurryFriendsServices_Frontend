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
                <h4 className="card-title">{name}</h4>
                <p className="card-text">
                    <span className="text-muted">Price:</span> ${price}
                </p>
                <p className="card-text">
                    <span className="text-muted">Duration:</span> {duration} Hours
                </p>
                <div className="button-group">
                    <Button variant="primary" size="sm" onClick={onEdit}>
              Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={onDelete}>
              Delete
                    </Button>
                </div>
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
