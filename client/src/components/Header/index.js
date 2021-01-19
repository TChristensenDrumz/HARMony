import React from 'react';
import Authenticate from "../../utils/Authentication";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";



function Header() {
    let loggedIn = Authenticate();

    const clearStorage = () => {
        if (loggedIn) {
            localStorage.clear();
        };
    };

    const headerStyle = {
        height: "10vh",
        width: "100vw",
        overflowX: "hidden"
    };

    return (
        <div>
            <Navbar bg="transparent" expand="lg" className="row p-4 m-0"  style={headerStyle}>
                <div className="col-4"></div>
                <div className="col-4 text-center">
                    <Navbar.Brand href="/" className="p-0 m-0"><span style={{color:"red"}}>HARM</span>øny</Navbar.Brand>
                </div>
                <div className="col-4 text-right">
                    <Button variant = "link" className="nes-text is-error sm text-decoration-none p-0 m-0" onClick={clearStorage} href={loggedIn ? "/" : "/login"}>{loggedIn ? "Logout" : "Login"}</Button>
                </div>
            </Navbar>
        </div>
    );
};

export default Header; 