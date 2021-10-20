//import * as ReactBootStrap from "react-bootstrap"
import { ListGroup, Card } from "react-bootstrap";
//import React, { Component } from "react";
import React from "react";

class BoardState extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          data: [{ID: "123", whitePlayer: "user1", blackPlayer: "user2", date: "04/22/20 4:58AM", state: { round: 1, move: "e4 c1", FEN: ""}},
          {ID: "1", whitePlayer: "xxx", blackPlayer: "yyy", date: "04/09/20 9:00PM", state: { round: 6, move: "e4 c1", FEN: ""}}],
          curr: ""
        }
      }

      getData(){
       //TODO
      }
      componentDidMount(){
        this.getData()
      }


    render() {
        return (
            <Card bg="dark" variant="dark" style={{ width: '200px'}}>
                <Card.Body>
                    <Card.Title style={{color:'white'}}>Board State</Card.Title>
                    <ListGroup variant="flush" style={{ background: 'grey' }}>
                    {this.state.data.map(d => (
                    
                        <ListGroup.Item key={d.ID}
                        action variant="dark" 
                        onClick={(event) => {
                            this.props.parentCallback(d.ID);
                            event.preventDefault();
                            }} >
                            <div>{d.whitePlayer} vs {d.blackPlayer}</div>
                            <div>{d.date}</div>
                            <div>{d.state.round}&nbsp;{d.state.move}</div>
                        </ListGroup.Item>

                    ))} 
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}

export default BoardState
