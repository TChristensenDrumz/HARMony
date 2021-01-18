import React from 'react';
import { Form, Button } from 'react-bootstrap';

function LoginForm() {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter Username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button type="submit" className="nes-btn is-error mb-3" href="/harmony">
                Login
            </Button>

            <small class="form-text"><a href="/create" className="nes-text is-error text-decoration-none mt-4">New player? Sign up for an account here</a></small>
        </Form> 
    );
};

export default LoginForm; 