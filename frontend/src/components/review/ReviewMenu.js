import React, { Component } from "react";
import { Icon, Menu } from 'semantic-ui-react'

const colorsA = ['green', 'red']
const filterNames = ["thumbs up icon", 'thumbs down icon']

export default class ReviewMenu extends Component {
    state = { activeA: '' }
    handleAClick = (e, { name }) => {
        this.setState({ activeA: name });  
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