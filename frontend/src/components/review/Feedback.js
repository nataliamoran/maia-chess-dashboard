import React, { Component } from "react";
import { SERVER_URL } from "../../env";
import { Icon, Menu } from 'semantic-ui-react'

const colorsA = ['blue']
const filterNames = ["share"]

export default class Feedback extends Component {

    constructor(props) {
        super(props)
        this.eventName = this.eventName.bind(this);
        this.state = {
            username: props.username || "maia1",
            activeA: '',
            cache: ''
        }
    }

    handleAClick = (e, { name }) => {
        if (this.state.cache.length < 1) {
            return;
        }
        this.setState({ activeA: name });

        fetch(SERVER_URL + '/api/feedback', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                feedback: this.state.cache
            })
        })

        this.setState({ cache: '' });
        setTimeout(function () { //Start the timer
            this.setState({ activeA: '' }) //After 1 second, set color to default
        }.bind(this), 1000)

    }

    // Event handlers
    eventName(event) {
        this.setState({ cache: event.target.value })
    }



    render() {
        const { activeA } = this.state
        return (
            <div>
                <form>
                    <div class="form-outline">
                        <textarea type="primary" class="form-control" id="textArea" rows="1" maxLength="300" value={this.state.cache} onChange={this.eventName} ></textarea>
                        <Menu compact icon inverted>
                            {colorsA.map((c, ind) => (
                                <Menu.Item
                                    key={c}
                                    name={filterNames[ind]}
                                    active={activeA === filterNames[ind]}
                                    color={c}
                                    onClick={this.handleAClick}
                                >
                                    <Icon name={filterNames[ind]} />
                                </Menu.Item>
                            ))}
                        </Menu>
                    </div>

                </form>
            </div>
        )
    }
}