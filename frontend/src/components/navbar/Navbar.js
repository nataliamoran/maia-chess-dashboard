import * as ReactBootStrap from "react-bootstrap"
import React from "react";
class Navbar extends React.Component {

    render() {
        return (
            <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <ReactBootStrap.Container>
                    <ReactBootStrap.Navbar.Brand href="#home">MAIA CHESS PROD</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="ms-auto">
                            <ReactBootStrap.Nav.Link eventKey={2} href="#memes" >
                                Lichess Login
                            </ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Container>
            </ReactBootStrap.Navbar>
        )
    }
}

export default Navbar
