/* eslint-disable linebreak-style */
import React from "react";
import {useState} from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
/**  creates a login alert
@param {string} name
@return {react.component}
*/
function LoginAlert({name}) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Hello, {name}!</Alert.Heading>
            </Alert>
        );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

LoginAlert.propTypes = {
    name: PropTypes.string.isRequired,
};

export default LoginAlert;
