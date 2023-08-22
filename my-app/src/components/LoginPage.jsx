import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";

function LoginPage({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {handleLogIn(data.name)})
      .catch((error) => console.log("error: " + error));
  };

  const handleLogIn = (name) =>{
      if(name){
        onLogin(name);
        console.log(name);
      }
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <Form className="bg-dark text-light p-4" onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleEmail} required value={email} />
    <Form.Text className="text-muted">
              We'll never share your email with anyone else.
    </Form.Text>
    </Form.Group>

    

    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name="password" type="password" placeholder="Password" onChange={handlePassword} required value={password} />
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
