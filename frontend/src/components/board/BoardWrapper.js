import React from "react";
import { ListGroup, Card  } from "react-bootstrap";
//import { LineChart, Line, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';  // TODO: chart
import Board from "../../components/board/Board";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

// For everything that needs to change for each state
class BoardWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gameID: props.gameID,
            move: props.move,// which move to display
            boardSize: props.boardSize, 
            stateSize: props.stateSize,
            arrows: props.arrows, 
            states: [    ],
            // Ideally, states includs:
                //      FEN, the FEN after the move
                //      move
                //      arrows, suggested alternate moves  e.g. : [{f:"e1", t:"e2", m:0.5, s:0.65}, [...]]
                //      stat: {p: , t: , e: }

        }
    }

    componentDidMount(){
        fetch("http://dash-dev.maiachess.com/api/games/" + this.state.gameID) 
            .then((response) => { 
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("Invalid gameID")
                }
            })
            .then((data) => {
                //console.log(data)
                if (data) {
                    this.setState({states: data.states})
                }
            })
            .catch(err => {
                console.error("Failed to fetch", err)
            })
    }


    componentDidUpdate(prevProps) {
        if(prevProps.gameID !== this.props.gameID) { 
            this.setState({gameID: this.props.gameID});
            fetch("http://dash-dev.maiachess.com/api/games/" + this.state.gameID) 
                .then((response) => { 
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.log("Invalid gameID")
                    }
                })
                .then((data) => {
                    //console.log(data)
                    if (data) {
                        this.setState({states: data.states})
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch", err)
                })
        }

        if (prevProps.move !== this.props.move) {
            this.setState({move: this.props.move});
        }
        if (prevProps.boardSize !== this.props.boardSize) {
            this.setState({boardSize: this.props.boardSize});
        }
        if (prevProps.stateSize !== this.props.stateSize) {
            this.setState({stateSize: this.props.stateSize});
        }
        if (prevProps.arrows !== this.props.arrows) {
            this.setState({arrows: this.props.arrows});
        }
    }

    render() {
        let dest = "AA"
        if (this.state.states.length !== 0) {

            dest = this.state.states[this.state.move].PGN
            if (dest.charAt(dest.length-1) === "+") {
                dest = dest.slice(-3,-1)
            } else if (dest !== ""){
                dest = dest.slice(-2)
            }  // castling can be checked here, but I choose not to highlight it.
        }
        
        
        let states = this.state.states.reduce(function (states, state, i) { 
            return (i % 2 === 0 ? states.push([state]) 
              : states[states.length-1].push(state)) && states;
        }, []); // group every 2 states, for printing PGN

        if (this.state.states.length % 2 === 1) {
            states[states.length - 1].push({PGN: ""})
        }
        // console.log(states)
        

        return <div style={{display: "flex"}}>
            <div >
                <Board  fen = {this.state.states.length > this.state.move ? this.state.states[this.state.move].FEN : "" }
                        lastMove = {["AA", dest]}   // any 2 letters will prevent default highlighting of a8
                        arrows = {this.state.move === this.props.move? this.state.arrows : []}
                        size={this.state.boardSize} />
            </div>
            <Card bg="dark" variant="dark" style={{ width: '199px', maxHeight: this.state.stateSize, float: "right"}}>
                <Card.Body style={{"textAlign": "left"}}>
                    <Card.Title style={{color:'white'}}>Moves</Card.Title>
                    <ListGroup variant="flush" style={{"overflowY": "auto", "maxHeight": this.state.stateSize - 100}}> 
                    {states.map((e,i) => (
                        <ListGroup.Item key={(i)} action variant="dark" style={{padding: '0px'}}
                                        >
                            <span   style={{display: "inline-block", width: "55%", height: "100%", "textAlign": "left", padding: "8px 5px"}}
                                    onClick={(event) => { 
                                        event.preventDefault();
                                        console.log("Change to view move ", 2*i)
                                        this.setState({move: 2 * i });
                                    }}
                            >
                            {i+1}. {e[0].PGN} 
                            </span>
                            
                            <span   style={{display: "inline-block", width: "45%", height: "100%",  padding: "8px 5px"}} 
                                    onClick={(event) => { 
                                        event.preventDefault();
                                        console.log("Change to view move ", 2*i+1)
                                        this.setState({move: 2 * i + 1 });
                                    }}
                            >
                                {e[1].PGN}
                            </span>
                        </ListGroup.Item>
                    ))} 
                    </ListGroup>
                </Card.Body>
            </Card>


            {/* TODO: add 2 graph */}
        </div>
    }
}

export default BoardWrapper