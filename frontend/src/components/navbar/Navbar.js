import * as ReactBootStrap from "react-bootstrap"
import { SERVER_URL } from "../../env";
import React from "react";
class Navbar extends React.Component {


    constructor(props) {
        super(props);
        this.eventName = this.eventName.bind(this);

        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state = {
            name: '',
            cache: '',
            valid: false
        }
    }

    // Event handlers
    eventName(event) {
        this.setState({ cache: event.target.value })
    }

    onFormSubmit(event) {
        event.preventDefault();
        fetch(SERVER_URL+'/api/dashboard/lichess_users/'+this.state.cache) 
            .then(response => response.json())
            .then(res => {
                if(res){
                    this.setState({ name: this.state.cache, valid: true });
                    this.props.parentCallback(this.state.cache);
                }
                else{
                    this.setState({ name: this.state.cache, valid: false });
                }
        });
        
    }

    render() {
        var login_color = 'white';
        if(this.state.name && this.state.valid){
            login_color = '#dcfce4';
        }
        else if (this.state.name){
            login_color = '#fce1de';
        }
        console.log(login_color);
        return (
            <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <ReactBootStrap.Container>
                    <ReactBootStrap.Navbar.Brand href="#home">MAIA CHESS</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBootStrap.Nav className="ms-auto">
                            <form onSubmit={this.onFormSubmit}>
                                <div style={{display: 'none'}}>{this.state.name}</div>
                                <div className="input-group ms-auto">
                                <input style={{background: login_color}} autocomplete="off" className="form-control mr-sm-2" name="username" placeholder="Lichess Username" aria-label="Search" value={this.state.cache} onChange={this.eventName}></input>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Go!</button>
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
