import React from "react";
import {Modal, Button} from "react-bootstrap";
import PropTypes from "prop-types";

const DeleteConfirmationModal = ({show, onHide, onConfirm}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
          Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
          Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

DeleteConfirmationModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default DeleteConfirmationModal;
