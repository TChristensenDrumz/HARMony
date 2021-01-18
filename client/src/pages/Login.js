import React from 'react' 
import { Container, Row } from 'react-bootstrap'
import LoginForm from "../components/Form/Login"

export default function Login() {
    const bodyStyle = {                       
        height: "80vh",
        width: "100vw",
    }
    
    const center = {
        margin: "0",
        position: "absolute",
        top: "25vh",
        left: "50vw",
        transform: "translate(-50%, -50%)"
    }
    
    return (
        <Container style={bodyStyle} className="container">
            <Row style={center}>
                <LoginForm />
            </Row>
        </Container>
    )
}
