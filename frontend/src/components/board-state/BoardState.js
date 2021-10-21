//import * as ReactBootStrap from "react-bootstrap"
import { ListGroup, Card  } from "react-bootstrap";
//import React, { Component } from "react";
import React from "react";
import './BoardState.css';

class BoardState extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          data: [{ID: "123", whitePlayer: "user1", blackPlayer: "user2", date: "04/22/20 4:58AM", state: { round: 1, move: "e4 c1", FEN: "", stat: {P: 6, T:8, E:5}}},
          {ID: "1", whitePlayer: "xxx", blackPlayer: "yyy", date: "04/09/20 9:00PM", state: { round: 6, move: "e4 c1", FEN: "", stat: {P: 3, T:2, E:2}}},
          {ID: "2", whitePlayer: "user1", blackPlayer: "user2", date: "04/22/20 4:58AM", state: { round: 1, move: "e4 c1", FEN: "", stat: {P: 6, T:8, E:5}}},
          {ID: "3", whitePlayer: "xxx", blackPlayer: "yyy", date: "04/09/20 9:00PM", state: { round: 6, move: "e4 c1", FEN: "", stat: {P: 3, T:2, E:2}}},
          {ID: "4", whitePlayer: "user1", blackPlayer: "user2", date: "04/22/20 4:58AM", state: { round: 1, move: "e4 c1", FEN: "", stat: {P: 6, T:8, E:5}}}],
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
                    <ListGroup variant="flush">
                    {this.state.data.map(d => (
                    
                        <ListGroup.Item key={d.ID}
                        /*className = {"item"}*/

                        action variant="dark"
                        onClick={(event) => {
                            this.state.curr = d.ID;
                            this.props.parentCallback(d.ID);
                            event.preventDefault();
                            }} >
                                 <div style={{'font-size': '16px','font-weight': 'bold'}}>{d.state.round}.&nbsp;{d.state.move}</div>
                            <div /*style={{'font-weight': 'bold'}}*/>{d.whitePlayer} vs {d.blackPlayer}</div>
                            <div>{d.date}</div>
                           
                            <div style={{float: 'left', 'font-weight': 'bold'}}>P:</div> 
                            {d.state.stat.P > 6 &&
                                <span class="dot-green" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.P > 3 && d.state.stat.P <=6 &&
                                <span class="dot-orange" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.P <= 3 &&
                                <span class="dot-red" style={{float: 'left'}}></span>
                            }
                             <div style={{float: 'left', 'margin-left': '5px', 'font-weight': 'bold'}}>T:</div> 
                            {d.state.stat.T > 6 &&
                                <span class="dot-green" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.T > 3 && d.state.stat.T <=6 &&
                                <span class="dot-orange" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.T <= 3 &&
                                <span class="dot-red" style={{float: 'left'}}></span>
                            }
                             <div style={{float: 'left', 'margin-left': '5px','font-weight': 'bold'}}>E:</div> 
                            {d.state.stat.E > 6 &&
                                <span class="dot-green" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.E > 3 && d.state.stat.E <=6 &&
                                <span class="dot-orange" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.E <= 3 &&
                                <span class="dot-red" style={{float: 'left'}}></span>
                            }
                        </ListGroup.Item>

                    ))} 
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}

export default BoardState
