import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import API from "../../../utils/API";

function CreateForm() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        username: "",
        password: ""
    });

    const [redirect, setRedirect] = useState({
        change: false
    });

    const handleSubmit = event => {
        event.preventDefault();
        if (!loginForm.email || !loginForm.username || !loginForm.password) {
            alert("Please provide all user information.");
        } else {
            API.createUser(loginForm)
                .then(res => {
                    console.log(res);
                    alert("Please proceed to login");
                    if (res.data.success) {
                        setRedirect({ change: true });
                    };
                });
        };
    };

    const textColor = {
        color: "white"
    }

    return (
        <div style={textColor}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" name="username" placeholder="Enter username" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}/>
                </Form.Group>
                
                <Button type="submit" className="nes-btn is-error mb-3">
                    Sign Up
                </Button>

                <small className="form-text"><a href="/login" className="nes-texttext-decoration-none mt-4" style={{color:"red"}}>Already have an account? Login here</a></small>
                {redirect.change ? <Redirect to="/login" /> : <Redirect to="/create" />}
            </Form> 
        </div>
    );
};

export default CreateForm; 