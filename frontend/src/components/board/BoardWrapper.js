import React from "react";
import { ListGroup, Card  } from "react-bootstrap";
import { SERVER_URL } from "../../env";
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
            move: 0,// which move to display
            boardSize: props.boardSize, 
            stateSize: props.stateSize,
            arrows: props.arrows || [], 
            states: [    ],
            // Ideally, states includs:
                //      FEN, the FEN after the move
                //      move
                //      arrows, suggested alternate moves  e.g. : [{f:"e1", t:"e2", m:0.5, s:0.65}, [...]]
                //      stat: {p: , t: , e: }

        }
    }

    // componentDidMount(){
    //     if (this.state.gameID) {

    //         fetch(SERVER_URL+"/api/games/" + this.state.gameID) 
    //             .then((response) => { 
    //                 if (response.ok) {
    //                     return response.json()
    //                 } else {
    //                     console.log("Invalid gameID")
    //                     return Promise.reject("Invalid gameID")
    //                 }
    //             })
    //             .then((data) => {
    //                 //console.log(data)
    //                 if (data) {
    //                     this.setState({states: data.states})
    //                 }
    //             })
    //             .catch(err => {
    //                 console.error("Failed to fetch", err)
    //             })
    //     }
    // }


    componentDidUpdate(prevProps) {

        if (prevProps.move !== this.props.move ||
            prevProps.boardSize !== this.props.boardSize ||
            prevProps.stateSize !== this.props.stateSize ||
            prevProps.arrows !== this.props.arrows) {
            
            this.setState({ move: Math.max(this.props.move-1, 0),
                            boardSize: this.props.boardSize,
                            stateSize: this.props.stateSize,
                            arrows: this.props.arrows});

            const selected = document.getElementById("board_move_"+Math.floor((this.props.move-1)/2) );
            //console.log("board_move_"+Math.floor((this.props.move-1)/2), selected);
            if (selected) {
                selected.scrollIntoView({behavior: 'smooth'});
            }
        
        }

        if(this.state.gameID !== this.props.gameID) { 
            this.setState({states: [], gameID: this.props.gameID, arrows: [] })
            fetch(SERVER_URL+"/api/games/" + this.props.gameID) 
                .then((response) => { 
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.log("Invalid gameID")
                    }
                })
                .then((data) => {
                    // console.log(data.gameId)
                    if (data && data.gameId === this.props.gameID) {
                        this.setState({states: data.states, arrows: this.props.arrows})
                        const selected = document.getElementById("board_move_"+Math.floor((this.props.move-1)/2) );
                        selected.scrollIntoView({behavior: 'smooth'});
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch", err)
                })
        }

        
    }

    render() {
        //console.log("state ID:", this.state.gameID, "prop id:", this.props.gameID, "move:", this.props.move)
        let dest = "AA" // any 2 letters will prevent default highlighting of a8
        if (this.state.states.length > this.state.move) {

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
        
        return <div style={{display: (window.innerWidth>500)? "flex":"block"}}>
            <div >
                <Board  fen = {this.state.states.length > this.state.move ? this.state.states[this.state.move].FEN : "" }
                        lastMove = {["AA", dest]}   // any 2 letters will prevent default highlighting of a8
                        arrows = {this.state.move === this.props.move-1? this.state.arrows : []}
                        size={this.state.boardSize} />
            </div>
            <Card bg="dark" variant="dark" style={{ width: '199px', maxHeight: this.state.stateSize }}>
                <Card.Body style={{"textAlign": "left"}}>
                    <Card.Title style={{color:'white'}}>Moves</Card.Title>
                    <ListGroup variant="flush" style={{"overflowY": "auto", "maxHeight": this.state.stateSize - 100}}> 
                    {states.map((e,i) => (
                        <ListGroup.Item id={"board_move_"+i} key={(i)} action variant="dark" style={{padding: '0px'}}
                                        >
                            <span   style={{display: "inline-block", 
                                            width: "55%", 
                                            height: "100%", 
                                            "textAlign": "left", 
                                            padding: "8px 5px", 
                                            "background-color": 2*i === this.props.move-1 ? "#4d4f07" : "",
                                        }}
                                    onClick={(event) => { 
                                        event.preventDefault();
                                        console.log("Change to view move ", 2*i)
                                        this.setState({move: 2 * i });
                                    }}
                            >
                            {i+1}. {e[0].PGN} 
                            </span>
                            
                            <span   style={{display: "inline-block", 
                                            width: "45%", 
                                            height: "100%",  
                                            padding: "8px 5px",
                                            "background-color": 2*i+2 === this.props.move? "#4d4f07" : ""
                                        }} 
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