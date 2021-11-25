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
            arrows: props.arrows, 
            states: [{"FEN":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","PGN":"d4"},{"FEN":"rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1","PGN":"d5"},{"FEN":"rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2","PGN":"c4"},{"FEN":"rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2","PGN":"dxc4"},{"FEN":"rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3","PGN":"e4"},{"FEN":"rnbqkbnr/ppp1pppp/8/8/2pPP3/8/PP3PPP/RNBQKBNR b KQkq - 0 3","PGN":"e5"}],
            // Ideally, states includs:
                //      FEN, the FEN after the move
                //      move
                //      arrows, suggested alternate moves  e.g. : [{f:"e1", t:"e2", m:0.5, s:0.65}, [...]]
                //      stat: {p: , t: , e: }

        }
    }

    componentDidMount(){
        fetch("https://pastebin.com/raw/Wurhbwf4") 
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({states: data})
                this.state.states.push({FEN:"", PGN: ""})
            })
    }


    componentDidUpdate(prevProps) {
        if(prevProps.gameID !== this.props.gameID) { // TODO
            this.setState({gameID: this.props.gameID});
            fetch("https://pastebin.com/raw/Wurhbwf4") //http://dash-dev.maiachess.com/api/games/
                .then(response => response.json())
                .then(data => {
                    console.log("change to view game with id", this.props.gameID, ", move", this.props.move)
                    this.setState({states: data})
                })

        } 
        if (prevProps.move !== this.props.move) {
            this.setState({move: this.props.move});
        }
        if (prevProps.boardSize !== this.props.boardSize) {
            this.setState({boardSize: this.props.boardSize});
        }
        if (prevProps.arrows !== this.props.arrows) {
            this.setState({arrows: this.props.arrows});
        }
    }

    render() {
        let dest = this.state.states[this.state.move].PGN
        if (dest.charAt(dest.length-1) === "+") {
            dest = dest.slice(-3,-1)
        } else {
            dest = dest.slice(-2)
        }  // castling can be checked here, but I choose not to highlight it.

        
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
                <Board  fen = {this.state.states[this.state.move+1].FEN}
                        lastMove = {["AA", dest]}   // any 2 letters will prevent default highlighting of a8
                        arrows = {this.state.move === this.props.move? this.state.arrows : []}
                        size={this.boardSize} />
            </div>
            <Card bg="dark" variant="dark" style={{ width: '200px', maxHeight: "400px", float: "right"}}>
                <Card.Body style={{"textAlign": "left"}}>
                    <Card.Title style={{color:'white'}}>Moves</Card.Title>
                    <ListGroup variant="flush" style={{"overflowY": "auto", "maxHeight": "300px"}}> 
                    {states.map((e,i) => (
                        <ListGroup.Item key={(i)}
                                        action variant="dark"
                                        >
    
                            <span   style={{display: "inline-block", width: "50%", height: "100%", "textAlign": "left"}}
                                    onClick={(event) => { 
                                        event.preventDefault();
                                        console.log("Change to view move ", 2*i)
                                        this.setState({move: 2 * i });
                                    }}
                            >
                                {e[0].PGN}
                            </span>
                            
                            <span   style={{display: "inline-block", width: "50%", height: "100%", "textAlign": "right"}} 
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