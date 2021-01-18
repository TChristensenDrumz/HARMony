import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import API from "../../../utils/API";

function CreateForm() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        username: "",
        password: ""
    });

    const handleSubmit = event => {
        event.preventDefault();
        if (!loginForm.email || !loginForm.username || !loginForm.password) {
            alert("Please provide all login information.");
        } else {
            API.createUser(loginForm)
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
                });
        }
        console.log(loginForm);
        setLoginForm({
            email: "",
            username: "",
            password: ""
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" name="username" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}/>
            </Form.Group>
            
            <Button type="submit" className="nes-btn is-error mb-3">
                Login
            </Button>

            <small className="form-text"><a href="/login" className="nes-text is-error text-decoration-none mt-4">Already have an account? Login here</a></small>
        </Form> 
    );
};

export default CreateForm; 