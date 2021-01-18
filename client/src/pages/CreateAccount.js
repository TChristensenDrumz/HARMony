import React from 'react' 
import { Container, Row } from 'react-bootstrap'
import CreateForm from "../components/Form/Create"

export default function CreateAccount() {
    const bodyStyle = {                       
        height: "80vh",
        width: "100vw",
    }
    
    const center = {
        margin: "0",
        position: "absolute",
        top: "29vh",
        left: "50vw",
        transform: "translate(-50%, -50%)"
    }
    
    return (
        <Container style={bodyStyle} className="container">
            <Row style={center}>
                <CreateForm />
            </Row>
        </Container>
    )
}
