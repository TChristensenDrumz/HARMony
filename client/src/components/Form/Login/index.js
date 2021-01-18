import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import API from '../../../utils/API';

function LoginForm() {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    });

    const [redirect, setRedirect] = useState({
        change: false
    });

    const handleSubmit = event => {
        event.preventDefault();
        if (!loginForm.username || !loginForm.password) {
            alert("Please provide all login information.");
        } else {
            API.login(loginForm)
                .then(res => {
                    console.log(res);
                    if (!res.data.success) {
                        alert(res.data.message);
                        return;
                    } else {
                        localStorage.setItem("token", JSON.stringify(res.data.token));
                        setRedirect({ change: true });
                    };
                });
        };
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" name="username" placeholder="Enter Username" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}/>
            </Form.Group>
            
            <Button type="submit" className="nes-btn is-error mb-3">
                Login
            </Button>

            <small className="form-text"><a href="/create" className="nes-text is-error text-decoration-none mt-4">New player? Sign up for an account here</a></small>
            {redirect.change ? <Redirect to="/harmony" /> : <Redirect to="/login" />}
        </Form> 
    );
};

export default LoginForm; 