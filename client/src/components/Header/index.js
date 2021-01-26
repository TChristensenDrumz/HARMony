import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import Token from "../../utils/Token";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";



function Header() {
    const [status, setStatus] = useState({loggedIn: false});

    const isLoggedIn = () => {
        setStatus({loggedIn: Token.authenticate()});
    };

    let current = useLocation();

    useEffect(() => {
        isLoggedIn();
    }, [current]);

    const clearStorage = () => {
        if (status.loggedIn) {
            localStorage.clear();
        };
    };

    let username = Token.getUsername();

    const headerStyle = {
        height: "10vh",
        width: "100vw",
        overflowX: "hidden",
        color: "white"
    };

    const black = {
        backgroundColor: "black"
    };

    return (
        <div style={black}>
            <Navbar bg="transparent" expand="lg" className="row p-4 m-0"  style={headerStyle}>
                <div className="col-4">{username}</div>
                <div className="col-4 text-center">
                    <Navbar.Brand href="/" className="p-0 m-0"><span style={{color:"red"}}>HARM</span><span style={{color:"white"}}>øny</span></Navbar.Brand>
                </div>
                <div className="col-4 text-right">
                    <Button variant = "link" style={{color: "red"}}className="nes-text sm text-decoration-none p-0 m-0" onClick={clearStorage} href={status.loggedIn ? "/" : "/login"}>{status.loggedIn ? "Logout" : "Login"}</Button>
                </div>
            </Navbar>
        </div>
    );
};

export default Header; 