import React, { Component } from "react";
import { Icon, Menu } from 'semantic-ui-react'
import { SERVER_URL } from "../../env";

const colorsA = ['green', 'red']
const filterNames = ["thumbs up", 'thumbs down']

export default class ReviewMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: props.username || "maia1",
            gameID: '',
            activeA: '',
            move: 0
        }
    }

    handleAClick = (e, { name }) => {
        this.setState({ activeA: name });

        var plus = 0
        var neg = 0

        if (this.state.activeA === "thumbs up") {
            plus = 1
        }
        else {
            neg = 1
        }

        fetch(SERVER_URL +'/api/feedback_rating', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                thumbs_up: plus,
                thumbs_down: neg,
                state: {
                    gameID: this.state.gameID,
                    move: this.state.move
                }
            })
        })
    }


    render() {
        const { activeA } = this.state
        return (
            <div>
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
        )
    }
}