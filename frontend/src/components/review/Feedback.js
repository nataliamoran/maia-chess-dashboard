import React, { Component, useState } from "react";
import { SERVER_URL } from "../../env";
import { Icon, Menu } from 'semantic-ui-react'

const colorsA = ['blue']
const filterNames = ["share"]

export default class Feedback extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: props.username || "maia1",
            activeA: ''
        }
    }

    handleAClick = (e, { name }) => {
        this.setState({ activeA: name });

        var plus = 0
        var neg = 0

        if (this.state.activeA === "share") {
            plus = 1
        }
        else {
            neg = 1
        }
    }


    render() {
        const { activeA } = this.state
        return (
            <div>
                <form action="">
                    <div class="form-outline">
                        <textarea type="primary" class="form-control" id="textArea" rows="1" maxLength="150" ></textarea>
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