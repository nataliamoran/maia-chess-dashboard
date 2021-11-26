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
            states: [    {        "FEN": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",        "PGN": "d4"    },    {        "FEN": "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",        "PGN": "d5"    },    {        "FEN": "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",        "PGN": "c4"    },    {        "FEN": "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",        "PGN": "dxc4"    },    {        "FEN": "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",        "PGN": "e4"    },    {        "FEN": "rnbqkbnr/ppp1pppp/8/8/2pPP3/8/PP3PPP/RNBQKBNR b KQkq - 0 3",        "PGN": "e5"    },    {        "FEN": "rnbqkbnr/ppp2ppp/8/4p3/2pPP3/8/PP3PPP/RNBQKBNR w KQkq - 0 4",        "PGN": "d5"    },    {        "FEN": "rnbqkbnr/ppp2ppp/8/3Pp3/2p1P3/8/PP3PPP/RNBQKBNR b KQkq - 0 4",        "PGN": "c6"    },    {        "FEN": "rnbqkbnr/pp3ppp/2p5/3Pp3/2p1P3/8/PP3PPP/RNBQKBNR w KQkq - 0 5",        "PGN": "Bxc4"    },    {        "FEN": "rnbqkbnr/pp3ppp/2p5/3Pp3/2B1P3/8/PP3PPP/RNBQK1NR b KQkq - 0 5",        "PGN": "cxd5"    },    {        "FEN": "rnbqkbnr/pp3ppp/8/3pp3/2B1P3/8/PP3PPP/RNBQK1NR w KQkq - 0 6",        "PGN": "exd5"    },    {        "FEN": "rnbqkbnr/pp3ppp/8/3Pp3/2B5/8/PP3PPP/RNBQK1NR b KQkq - 0 6",        "PGN": "Nf6"    },    {        "FEN": "rnbqkb1r/pp3ppp/5n2/3Pp3/2B5/8/PP3PPP/RNBQK1NR w KQkq - 1 7",        "PGN": "Nc3"    },    {        "FEN": "rnbqkb1r/pp3ppp/5n2/3Pp3/2B5/2N5/PP3PPP/R1BQK1NR b KQkq - 2 7",        "PGN": "Bb4"    },    {        "FEN": "rnbqk2r/pp3ppp/5n2/3Pp3/1bB5/2N5/PP3PPP/R1BQK1NR w KQkq - 3 8",        "PGN": "Bd2"    },    {        "FEN": "rnbqk2r/pp3ppp/5n2/3Pp3/1bB5/2N5/PP1B1PPP/R2QK1NR b KQkq - 4 8",        "PGN": "Bxc3"    },    {        "FEN": "rnbqk2r/pp3ppp/5n2/3Pp3/2B5/2b5/PP1B1PPP/R2QK1NR w KQkq - 0 9",        "PGN": "Bxc3"    },    {        "FEN": "rnbqk2r/pp3ppp/5n2/3Pp3/2B5/2B5/PP3PPP/R2QK1NR b KQkq - 0 9",        "PGN": "O-O"    },    {        "FEN": "rnbq1rk1/pp3ppp/5n2/3Pp3/2B5/2B5/PP3PPP/R2QK1NR w KQ - 1 10",        "PGN": "Bxe5"    },    {        "FEN": "rnbq1rk1/pp3ppp/5n2/3PB3/2B5/8/PP3PPP/R2QK1NR b KQ - 0 10",        "PGN": "Re8"    },    {        "FEN": "rnbqr1k1/pp3ppp/5n2/3PB3/2B5/8/PP3PPP/R2QK1NR w KQ - 1 11",        "PGN": "Nf3"    },    {        "FEN": "rnbqr1k1/pp3ppp/5n2/3PB3/2B5/5N2/PP3PPP/R2QK2R b KQ - 2 11",        "PGN": "Bg4"    },    {        "FEN": "rn1qr1k1/pp3ppp/5n2/3PB3/2B3b1/5N2/PP3PPP/R2QK2R w KQ - 3 12",        "PGN": "Qe2"    },    {        "FEN": "rn1qr1k1/pp3ppp/5n2/3PB3/2B3b1/5N2/PP2QPPP/R3K2R b KQ - 4 12",        "PGN": "Bxf3"    },    {        "FEN": "rn1qr1k1/pp3ppp/5n2/3PB3/2B5/5b2/PP2QPPP/R3K2R w KQ - 0 13",        "PGN": "gxf3"    },    {        "FEN": "rn1qr1k1/pp3ppp/5n2/3PB3/2B5/5P2/PP2QP1P/R3K2R b KQ - 0 13",        "PGN": "Nxd5"    },    {        "FEN": "rn1qr1k1/pp3ppp/8/3nB3/2B5/5P2/PP2QP1P/R3K2R w KQ - 0 14",        "PGN": "Bxd5"    },    {        "FEN": "rn1qr1k1/pp3ppp/8/3BB3/8/5P2/PP2QP1P/R3K2R b KQ - 0 14",        "PGN": "Qxd5"    },    {        "FEN": "rn2r1k1/pp3ppp/8/3qB3/8/5P2/PP2QP1P/R3K2R w KQ - 0 15",        "PGN": "f4"    },    {        "FEN": "rn2r1k1/pp3ppp/8/3qB3/5P2/8/PP2QP1P/R3K2R b KQ - 0 15",        "PGN": "Qxh1+"    },    {        "FEN": "rn2r1k1/pp3ppp/8/4B3/5P2/8/PP2QP1P/R3K2q w Q - 0 16",        "PGN": "Kd2"    },    {        "FEN": "rn2r1k1/pp3ppp/8/4B3/5P2/8/PP1KQP1P/R6q b - - 1 16",        "PGN": "Qxa1"    },    {        "FEN": "rn2r1k1/pp3ppp/8/4B3/5P2/8/PP1KQP1P/q7 w - - 0 17",        "PGN": "Qc4"    },    {        "FEN": "rn2r1k1/pp3ppp/8/4B3/2Q2P2/8/PP1K1P1P/q7 b - - 1 17",        "PGN": "Rd8+"    },    {        "FEN": "rn1r2k1/pp3ppp/8/4B3/2Q2P2/8/PP1K1P1P/q7 w - - 2 18",        "PGN": "Ke2"    },    {        "FEN": "rn1r2k1/pp3ppp/8/4B3/2Q2P2/8/PP2KP1P/q7 b - - 3 18",        "PGN": "Qd1+"    },    {        "FEN": "rn1r2k1/pp3ppp/8/4B3/2Q2P2/8/PP2KP1P/3q4 w - - 4 19",        "PGN": "Ke3"    },    {        "FEN": "rn1r2k1/pp3ppp/8/4B3/2Q2P2/4K3/PP3P1P/3q4 b - - 5 19",        "PGN": "Nc6"    }],
            // Ideally, states includs:
                //      FEN, the FEN after the move
                //      move
                //      arrows, suggested alternate moves  e.g. : [{f:"e1", t:"e2", m:0.5, s:0.65}, [...]]
                //      stat: {p: , t: , e: }

        }
    }

    // componentDidMount(){
    //     fetch("https://pastebin.com/raw/Wurhbwf4", { method: 'GET', mode: 'no-cors' }) 
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             this.setState({states: data})
    //             this.state.states.push({FEN:"", PGN: ""})
    //         })
    //         .catch(err => {
    //             console.error(err)
    //         })
    // }


    componentDidUpdate(prevProps) {
        // if(prevProps.gameID !== this.props.gameID) { // TODO
        //     this.setState({gameID: this.props.gameID});
        //     fetch("https://pastebin.com/raw/Wurhbwf4") //http://dash-dev.maiachess.com/api/games/
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log("change to view game with id", this.props.gameID, ", move", this.props.move)
        //             this.setState({states: data})
        //         })
        // }

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
            <Card bg="dark" variant="dark" style={{ width: '180px', maxHeight: this.state.stateSize, float: "right"}}>
                <Card.Body style={{"textAlign": "left"}}>
                    <Card.Title style={{color:'white'}}>Moves</Card.Title>
                    <ListGroup variant="flush" style={{"overflowY": "auto", "maxHeight": this.state.stateSize - 100}}> 
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
                            {i}.{e[0].PGN}
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