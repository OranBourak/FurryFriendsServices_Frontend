import React from "react";
import Toast from "react-bootstrap/Toast";
import PropTypes from "prop-types";

/**
 * A simple error notification Toast component using Bootstrap.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.show - Whether the Toast should be displayed or hidden.
 * @param {string} props.errorText - The text to display in the toast.
 * @param {Function} props.setShow - A callback function to control the visibility of the Toast.
 * @return {React.Component} - The component displaying the error Toast.
 */
function ErrorToast(props) {
    return (
        <>
            <Toast onClose={() => props.setShow(false)} show={props.show} bg="danger" delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{props.errorText}</Toast.Body>
            </Toast>
        </>
    );
}

ErrorToast.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    errorText: PropTypes.string.isRequired,
};

export default ErrorToast;
