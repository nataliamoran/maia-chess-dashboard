import React, { Component } from "react";
import { Menu } from 'semantic-ui-react'

const colorsA = ['olive', 'green', 'teal']
const filterNames = ["interesting", 'tricky', 'mistakes']

export default class MenuExampleColoredInverted extends Component {
    state = { activeA: ''}
    handleAClick = (e, { name }) => {
        this.setState({ activeA: name });
        this.props.parentCallback(name);
    }

    render() {
        const { activeA} = this.state
        return (
            <div>
                <Menu inverted vertical>
                    {colorsA.map((c, ind) => (
                        <Menu.Item
                            key={c}
                            name={filterNames[ind]}
                            active={activeA === filterNames[ind]}
                            color={c}
                            onClick={this.handleAClick}
                        />
                    ))}
                </Menu>
            </div>
        )
    }
}