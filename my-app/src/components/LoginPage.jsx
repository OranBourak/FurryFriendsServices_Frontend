import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    
    })
    .then((response) => response.json())
    .then((data) => console.log(data.message))
    .catch((error) => console.log("error: " + error));
  }
  

  function handleEmail(event) {
    setEmail(event.target.value); 
  }

  function handlePassword(event) {
    setPassword(event.target.value); 
  }

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
    <Form className="bg-dark text-light p-4" onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleEmail} />
    <Form.Text className="text-muted">
              We'll never share your email with anyone else.
    </Form.Text>
    </Form.Group>

    

    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name="password" type="password" placeholder="Password" onChange={handlePassword} />
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
