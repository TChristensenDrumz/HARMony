import React from 'react';
import { Form, Button } from 'react-bootstrap';

function CreateForm() {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button type="submit" className="nes-btn is-error mb-3" href="/harmony">
                Login
            </Button>

            <small class="form-text"><a href="/login" class="nes-text is-error text-decoration-none mt-4">Already have an account? Login here</a></small>
        </Form> 
    );
};

export default CreateForm; 