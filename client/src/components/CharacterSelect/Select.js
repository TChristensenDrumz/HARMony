//Dependencies
import React, { useState, useEffect } from 'react'

//Styling
import { Container, Row, Card } from 'react-bootstrap'
import Sandwich from '../Sandwich/Sandwich'

//Sprite gifs
import Character2 from "../../game/assets/sprites/Character2/character2gif.gif"
import Character3 from "../../game/assets/sprites/Character3/character3gif.gif"
import Character4 from "../../game/assets/sprites/Character4/character4gif.gif"
import Character5 from "../../game/assets/sprites/Character5/character5gif.gif"
import Character6 from "../../game/assets/sprites/Character6/character6gif.gif"

export default function Select() {
    
    const black = {
        backgroundColor: "black",
        color: "white"
    }

    return (
        <div style={black}>
            <Sandwich />
                <Container style={black}>
                    <Row style={{height:"720px", width:"1200px"}} className="d-flex justify-content-center align-items-center text-center">
                        <Card border="danger" style={{ width: '225px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src={Character6} style={black} />
                            <Card.Body style={black}>
                                <Card.Title>Classical</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card border="dark" style={{ width: '225px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src={Character2} style={black} />
                            <Card.Body style={black}>
                                <Card.Title>Country</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card border="dark" style={{ width: '225px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src={Character3} style={black} />
                            <Card.Body style={black}>
                                <Card.Title>Metal</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card border="dark" style={{ width: '225px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src={Character4} style={black} />
                            <Card.Body style={black}>
                                <Card.Title>Pop</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card border="dark" style={{ width: '225px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src={Character5} style={black} />
                            <Card.Body style={black}>
                                <Card.Title>Rap</Card.Title> 
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>    
            <Sandwich />
            </div>
    )
}
