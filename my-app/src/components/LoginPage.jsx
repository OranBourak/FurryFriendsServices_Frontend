import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import React, { useState } from 'react';

function LoginPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Email' : 
  //       },
  //       body: JSON.stringify({{e.target.email.name:e.target.email.value, e.target.password.name:e.target.password.value}}),
  //     });

  //     // Handle response from the server
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };
  return (
    <Form className="bg-dark text-light p-4">
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control name="email" type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
              We'll never share your email with anyone else.
    </Form.Text>
    </Form.Group>

    

    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name="password" type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button  variant="primary" type="submit">
            Login
    </Button>
    </Form>
  );
}

export default LoginPage;
