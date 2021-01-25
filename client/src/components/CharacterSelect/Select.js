//Dependencies
import React, { useState, useEffect } from 'react'

//Styling
import { Container, Row, Card } from 'react-bootstrap'
import Sandwich from '../Sandwich/Sandwich'

//Sprite gifs
import Character1 from "../../game/assets/sprites/Character1/character1.gif"

export default function Select() {
    
    return (
        <div>
            <Sandwich />
                <Container>
                    <Row style={{height:"720px", width:"1200px"}} className="d-flex justify-content-center align-items-center">
                        <Card style={{ width: '144px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src={Character1} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '144px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src="http://placehold.it/100x100"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '144px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src="http://placehold.it/100x100"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '144px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src="http://placehold.it/100x100"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '144px' }} className="mr-auto ml-auto">
                            <Card.Img variant="top" src="http://placehold.it/100x100"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title> 
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>    
            <Sandwich />
            </div>
    )
}
