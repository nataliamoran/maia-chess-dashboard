//import * as ReactBootStrap from "react-bootstrap"
import { ListGroup, Card  } from "react-bootstrap";
//import React, { Component } from "react";
import React from "react";
import './BoardState.css';

class BoardState extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          data: [],/*[{ID: "123", whitePlayer: "user1", blackPlayer: "user2", date: "04/22/20 4:58AM", state: { round: 1, move: "e4 c1", FEN: "r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1PP2/2NP1N2/PPP3PP/R1BQK2R w KQ - 2 7", stat: {P: 0.4, T:0.4, E:0.8}, last_move : ["f5", "a1"], maia_moves: [["e4", "e7", 0.6]],  stockfish_moves : [["b4", "e7", 0.4]]}},
          {ID: "1", whitePlayer: "xxx", blackPlayer: "yyy", date: "04/09/20 9:00PM", state: { round: 6, move: "e4 c1", FEN: "5K2/3NRP2/1pr2n2/1p6/1B6/1PPP3n/1p3p1k/8 w - - 0 1", stat: {P: -0.7, T:0.9, E:2}}},
          {ID: "2", whitePlayer: "user1", blackPlayer: "user2", date: "04/22/20 4:58AM", state: { round: 1, move: "e4 c1", FEN: "1r4N1/PB6/3pp1n1/2P5/1b1P4/P2RB2k/3p4/6K1 w - - 0 1", stat: {P: -0.2, T:8, E:1}}},
          {ID: "3", whitePlayer: "xxx", blackPlayer: "yyy", date: "04/09/20 9:00PM", state: { round: 6, move: "e4 c1", FEN: "8/3p1pB1/1NR5/3B4/2K3b1/2PP2Nr/2nPP3/3k4 w - - 0 1", stat: {P: 0, T:0.5, E:1.5}}},
          {ID: "4", whitePlayer: "user1", blackPlayer: "user2", date: "04/22/20 4:58AM", state: { round: 1, move: "e4 c1", FEN: "R2r3n/4P1kP/6pp/1r4R1/2K2p2/P7/3p3N/3B4 w - - 0 1", stat: {P: 0.4, T:0.1, E:0.6}}}],*/
          curr: "",
          filter: props.searchfilter
        }
      }

      componentDidMount(){
        /*fetch('http://dash-dev.maiachess.com/api/filters/"${this.state.searchfilter}')  //${this.state.filter}.json
        .then(response => response.json())
        .then(data => {
            console.log("hi");
            console.log(data);
        });*/
    }

    componentDidUpdate(prevProps) {
        if(prevProps.searchfilter !== this.props.searchfilter) {
          this.setState({filter: this.props.searchfilter});
          fetch('/api/filters/'+this.props.searchfilter)//http://dash-dev.maiachess.com
                .then(response => response.json())
                .then(res => {
                    this.setState({data: res.games});
                });
        }
      }


    render() {
        return (
            <Card bg="dark" variant="dark" style={{ width: '200px'}}>
                <Card.Body style={{"textAlign": "left"}}>
                    <Card.Title style={{color:'white'}}>Board State</Card.Title>
                    <ListGroup variant="flush">
                    {this.state.data.map(d => (
                    
                        <ListGroup.Item key={d.ID}
                        /*className = {"item"}*/

                        action variant="dark"
                        onClick={(event) => {
                            this.setState({
                                curr: d.ID
                              });
                            this.props.parentCallback(d, d.state.FEN);
                            event.preventDefault();
                            }} >
                                 <div style={{'fontSize': '16px','fontWeight': 'bold'}}>{d.state.round}.&nbsp;{d.state.move}</div>
                            <div /*style={{'font-weight': 'bold'}}*/>{d.whitePlayer} vs {d.blackPlayer}</div>
                            <div>{d.date}</div>
                           
                            <div style={{float: 'left', 'fontWeight': 'bold'}}>P:</div> 
                            {d.state.stat.p > 0.5 &&
                                <span className="dot-green" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.p > -0.5 && d.state.stat.p <=0.5 &&
                                <span className="dot-orange" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.p <= -0.5 &&
                                <span className="dot-red" style={{float: 'left'}}></span>
                            }
                             <div style={{float: 'left', 'marginLeft': '5px', 'fontWeight': 'bold'}}>T:</div> 
                            {d.state.stat.t > 0.6 &&
                                <span className="dot-green" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.t > 0.4 && d.state.stat.t <=0.6 &&
                                <span className="dot-orange" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.t <= 0.4 &&
                                <span className="dot-red" style={{float: 'left'}}></span>
                            }
                             <div style={{float: 'left', 'marginLeft': '5px','fontWeight': 'bold'}}>E:</div> 
                            {d.state.stat.e > 2 &&
                                <span className="dot-red" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.e > 1.5 && d.state.stat.e <=2 &&
                                <span className="dot-orange" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.e <= 1.5 &&
                                <span className="dot-green" style={{float: 'left'}}></span>
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
