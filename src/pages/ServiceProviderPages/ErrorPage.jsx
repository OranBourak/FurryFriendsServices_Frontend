import React from "react";
import {Container, Alert, Button} from "react-bootstrap";

const ErrorPage=() => {
    return (
        <Container className="mt-5">
            <Alert variant="danger">
                <h4 className="alert-heading">Not Authorized</h4>
                <p>
          You do not have permission to access this page. Please log in or
          contact an administrator for assistance.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button variant="primary" href="/">Go Back to Home</Button>
                </div>
            </Alert>
        </Container>
    );
};

export default ErrorPage;
