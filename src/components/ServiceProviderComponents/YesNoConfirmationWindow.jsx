import React from "react";
import {Modal, Button} from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * A reusable Yes/No confirmation dialog component.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.show - Whether the dialog should be displayed or hidden.
 * @param {Function} props.onConfirm - A callback function to execute when the user confirms (clicks "Yes").
 * @param {Function} props.onClose - A callback function to execute when the dialog is closed.
 * @param {String} props.dialogText - The text that appears on the dialog.
 * @return {React.Component} - The component displaying the yes no confirmation dialog.

 */
function ConfirmationDialog(props) {
    const {show, onConfirm, onClose, dialogText} = props;

    /**
    * Handles the user's confirmation (clicks "Yes").
    * Executes the `props.onConfirm` callback and closes the dialog.
    */
    const handleConfirm = async () => {
        if (onConfirm) {
            await onConfirm();
        }
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{dialogText}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
          No
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
          Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ConfirmationDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    dialogText: PropTypes.string.isRequired,
};

export default ConfirmationDialog;
