import React, { Component } from "react";
import { Menu } from 'semantic-ui-react';
import { Button  } from "react-bootstrap";
import postEventLog from "../util.js";

const colorsA = ['olive', 'green', 'teal'];
const filterNames = ["interesting", 'tricky', 'mistakes'];

export default class MenuExampleColoredInverted extends Component {
    constructor(props){
        super(props)
        this.eventName = this.eventName.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = { 
            activeA: '',
            cache: '',
            applied: ''
        }
      }
    
    handleAClick = (e, { name }) => {
        this.setState({ activeA: name });
        if(name !== 'custom'){
            this.setState({cache: '', applied: ''});
        }
        this.props.parentCallback(name, this.state.cache);

        postEventLog("Filter by " + this.state.activeA,
            {
                username: this.state.username,
                log_time_fe: Date().toLocaleString()
            }
        )
    }

    eventName(event) {
        this.setState({ cache: event.target.value })
    }

    onFormSubmit(event) {
        event.preventDefault()
        this.setState({ applied: this.state.cache })
        this.props.parentCallback('custom', this.state.cache);
        postEventLog("Send custom filter query",
        {
            username: this.state.username,
            custom_string: this.state.cache,
            log_time_fe: Date().toLocaleString()
        }
    )
    }

    render() {
        const { activeA} = this.state
        var textareaColor = 'white';
        if(this.state.applied  && this.state.applied === this.state.cache){
            textareaColor = '#D3EAE0';
        }

        return (
            <div>
                <Menu inverted vertical style={{width: "170px"}}>
                    {colorsA.map((c, ind) => (
                        <Menu.Item
                            key={c}
                            name={filterNames[ind]}
                            active={activeA === filterNames[ind]}
                            color={c}
                            onClick={this.handleAClick}
                        />
                    ))}
                    <Menu.Item
                            key={-1}
                            name={'custom'}
                            active={activeA === 'custom'}
                            color={'blue'}
                            /*style= {{display: 'none'}}*/
                            onClick={this.handleAClick}>
                            Custom
                            {this.state.activeA === 'custom' &&
                             <form className='ui form' onSubmit={this.onFormSubmit}>
                                <div style={{marginTop: '5px'}}>
                                <textarea style={{background: textareaColor}} placeholder="Mongo Filter" rows="2" value={this.state.cache} onChange={this.eventName}></textarea>
                                <Button variant="outline-light" size='sm' style={{marginTop: '2px'}}>Search</Button>
                                </div> 
                            </form>
                            }
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}