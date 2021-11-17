import * as ReactBootStrap from "react-bootstrap"
import React from "react";
class Navbar extends React.Component {


    constructor(props) {
        super(props);
        this.eventName = this.eventName.bind(this);

        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state = {
            name: '',
            cache: ''
        }
    }

    // Event handlers
    eventName(event) {
        this.setState({ cache: event.target.value })
    }

    onFormSubmit(event) {
        event.preventDefault()
        this.setState({ name: this.state.cache })
    }

    render() {
        return (
            <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <ReactBootStrap.Container>
                    <ReactBootStrap.Navbar.Brand href="#home">MAIA CHESS</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="ms-auto">
                            <form onSubmit={this.onFormSubmit}>
                                <div class="input-group mb-3">
                                <input class="form-control mr-sm-2" name="username" placeholder="Lichess Username" aria-label="Search" value={this.state.cache} onChange={this.eventName}></input>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Go!</button>
                                    </div>
                                </div> 
                            </form>
                        </ReactBootStrap.Nav>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Container>
            </ReactBootStrap.Navbar>
        )
    }
}

export default Navbar
