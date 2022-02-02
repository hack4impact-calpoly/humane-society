import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './css/signup.css';

export default function Signup()
{
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[number, setNumber] = useState("");
    const[password, setPassword] = useState("");

    //validates inputs
    function validateForm()
    {
        return name.length > 0 && email.length > 0 && number.length > 0 && password.length > 0;
    }

    //handles submission of a form
    function handleSubmit(event)
    {
        event.preventDefault();
    }

    return(
        <div className = "signUp">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.control
                        autoFocus
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="number">
                    <Form.Label>Email</Form.Label>
                    <Form.control
                        autoFocus
                        type="number"
                        value={number}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.control
                        type="password"
                        value={password}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Signup
                </Button>
            </Form>
        </div>       
    );
}

