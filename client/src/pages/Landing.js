import React, { useState } from 'react';
import Token from "../utils/Token";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Background from "../images/colors.gif";

//Audio
import Track from "../game/assets/audio/title/kitn.mp3"

export default function Landing() {
    localStorage.removeItem("direction");
    let loggedIn = Token.authenticate();
    
    const background = {
        height: "80vh",
        width: "100vw",
        overflow: "hidden",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transform: "scale(0.8)",
        backgroundImage: `url(${ Background })`,
    };
    
    const bodyStyle = {                       
        height: "80vh",
        width: "100vw",
    };

    const center = {
        margin: "0",
        position: "absolute",
        top: "50vh",
        left: "50vw",
        transform: "translate(-50%, -50%)"
    };

    const a = {
        transform: "scale(1.7)",
        marginBottom: "22vw"
    }
    return (
        <div style={background}>
            <audio src={Track} loop autoPlay/>
            <Container style={bodyStyle}>
                <Row style={center}>
                    <Col>
                        <a style={a} className="nes-btn is-error text-center" href={loggedIn ? "/harmony" : "/login"}>Play</a>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
