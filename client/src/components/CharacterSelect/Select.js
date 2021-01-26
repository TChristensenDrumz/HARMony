//Dependencies
import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import LevelLogic from "../../utils/LevelLogic";

//Styling
import { Container, Row, Card } from 'react-bootstrap'
import Sandwich from '../Sandwich/Sandwich'
import "./Select.css";

//Sprite gifs
import Character2 from "../../game/assets/sprites/Character2/character2gif.gif"
import Character3 from "../../game/assets/sprites/Character3/character3gif.gif"
import Character4 from "../../game/assets/sprites/Character4/character4gif.gif"
import Character5 from "../../game/assets/sprites/Character5/character5gif.gif"
import Character6 from "../../game/assets/sprites/Character6/character6gif.gif"

export default function Select() {

    const [redirect, setRedirect] = useState(false);

    let id;

    useEffect(async () => {
        let existing = await LevelLogic.getGenre();
        if (existing) {
            id = existing._id;
        };
    }, []);

    const handleImgClick = event => {
        selectGenre(event.target.alt);
    };

    const handleTitleClick = event => {
        selectGenre(event.target.innerHTML.toLowerCase());
    };

    const selectGenre = genre => {
        if (id) {
            LevelLogic.resetGenre(genre, id)
                .then(() => setRedirect(true));
        } else {
            LevelLogic.setGenre(genre)
                .then(() => setRedirect(true));
        };
    };
    
    const black = {
        backgroundColor: "black",
        color: "white"
    }

    return (
        <div style={black}>
            <Sandwich />
                <Container style={black}>
                    <Row style={{height:"720px", width:"1200px"}} className="d-flex justify-content-center align-items-center text-center">
                        <Card style={{ width: '225px' }} className="mr-auto ml-auto character">
                            <Card.Img variant="top" src={Character6} style={black} alt="classical" onClick={handleImgClick}/>
                            <Card.Body style={black}>
                                <Card.Title onClick={handleTitleClick}>Classical</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '225px' }} className="mr-auto ml-auto character">
                            <Card.Img variant="top" src={Character2} style={black} alt="country" onClick={handleImgClick}/>
                            <Card.Body style={black}>
                                <Card.Title onClick={handleTitleClick}>Country</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '225px' }} className="mr-auto ml-auto character">
                            <Card.Img variant="top" src={Character3} style={black} alt="metal" onClick={handleImgClick}/>
                            <Card.Body style={black}>
                                <Card.Title onClick={handleTitleClick}>Metal</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '225px' }} className="mr-auto ml-auto character">
                            <Card.Img variant="top" src={Character4} style={black} alt="pop" onClick={handleImgClick}/>
                            <Card.Body style={black}>
                                <Card.Title onClick={handleTitleClick}>Pop</Card.Title> 
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '225px' }} className="mr-auto ml-auto character">
                            <Card.Img variant="top" src={Character5} style={black} alt="rap" onClick={handleImgClick}/>
                            <Card.Body style={black}>
                                <Card.Title onClick={handleTitleClick}>Rap</Card.Title> 
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>    
            <Sandwich />
            {redirect ? <Redirect to="/harmony" /> : <></>}
        </div>
    )
}
