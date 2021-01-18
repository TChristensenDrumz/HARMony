import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Background from "../components/assets/DinoSprites_doux.gif"

export default function Landing() {
    const background = {
        height: "80vh",
        width: "100vw",
        overflow: "hidden",
        backgroundImage: `url(${ Background })`,
    }
    
    const bodyStyle = {                       
        height: "80vh",
        width: "100vw",
    }

    const center = {
        margin: "0",
        position: "absolute",
        top: "50vh",
        left: "50vw",
        transform: "translate(-50%, -50%)"
    }
    return (
        <div style={background}>
            <Container style={bodyStyle}>
                <Row style={center}>
                    <Col>
                        <a className="nes-btn is-error text-center" href="/login">Play</a>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
