import React from "react";
import { ListGroup, Card  } from "react-bootstrap";
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
            move: props.move || 1,// which move to display
            boardSize: props.boardSize,  
            //fens: ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"],
            states: [{FEN:"rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1",lastMove:["AA","d4"]},{FEN:"rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2",lastMove:["","Nf6"]},{FEN:"rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 2 2",lastMove:["","Nf3"]},{FEN:"rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq d6 0 3",lastMove:["","d5"]},{FEN:"rnbqkb1r/ppp1pppp/5n2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq c3 0 3",lastMove:["","c4"]},{FEN:"rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4",lastMove:[" "," "]},{FEN:"rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 1 4",lastMove:[" "," "]},{FEN:"rnbqk2r/ppp1bppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 2 5",lastMove:[" "," "]},{FEN:"rnbqk2r/ppp1bppp/4pn2/3p4/2PP1B2/2N2N2/PP2PPPP/R2QKB1R b KQkq - 3 5",lastMove:[" "," "]},{FEN:"rnbq1rk1/ppp1bppp/4pn2/3p4/2PP1B2/2N2N2/PP2PPPP/R2QKB1R w KQ - 4 6",lastMove:[" "," "]},{FEN:"rnbq1rk1/ppp1bppp/4pn2/3p4/2PP1B2/2N1PN2/PP3PPP/R2QKB1R b KQ - 0 6",lastMove:[" "," "]},{FEN:"rnbq1rk1/pp2bppp/4pn2/2pp4/2PP1B2/2N1PN2/PP3PPP/R2QKB1R w KQ c6 0 7",lastMove:[" "," "]},{FEN:"rnbq1rk1/pp2bppp/4pn2/2Pp4/2P2B2/2N1PN2/PP3PPP/R2QKB1R b KQ - 0 7",lastMove:[" "," "]},{FEN:"rnbq1rk1/pp3ppp/4pn2/2bp4/2P2B2/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 8",lastMove:[" "," "]},{FEN:"rnbq1rk1/pp3ppp/4pn2/2bp4/2P2B2/2N1PN2/PPQ2PPP/R3KB1R b KQ - 1 8",lastMove:[" "," "]},{FEN:"r1bq1rk1/pp3ppp/2n1pn2/2bp4/2P2B2/2N1PN2/PPQ2PPP/R3KB1R w KQ - 2 9",lastMove:[" "," "]},{FEN:"r1bq1rk1/pp3ppp/2n1pn2/2bp4/2P2B2/P1N1PN2/1PQ2PPP/R3KB1R b KQ - 0 9",lastMove:[" "," "]},{FEN:"r1b2rk1/pp3ppp/2n1pn2/q1bp4/2P2B2/P1N1PN2/1PQ2PPP/R3KB1R w KQ - 1 10",lastMove:[" "," "]},{FEN:"r1b2rk1/pp3ppp/2n1pn2/q1bp4/2P2B2/P1N1PN2/1PQ2PPP/3RKB1R b K - 2 10",lastMove:[" "," "]},{FEN:"r1br2k1/pp3ppp/2n1pn2/q1bp4/2P2B2/P1N1PN2/1PQ2PPP/3RKB1R w K - 3 11",lastMove:[" "," "]},{FEN:"r1br2k1/pp3ppp/2n1pn2/q1bp4/2P2B2/P1N1PN2/1PQ1BPPP/3RK2R b K - 4 11",lastMove:[" "," "]},{FEN:"r1br2k1/pp3ppp/2n1p3/q1bp4/2P1nB2/P1N1PN2/1PQ1BPPP/3RK2R w K - 5 12",lastMove:[" "," "]},{FEN:"r1br2k1/pp3ppp/2n1p3/q1bp4/2P1nB2/P1N1PN2/1PQ1BPPP/3R1RK1 b - - 6 12",lastMove:[" "," "]},{FEN:"r1br2k1/pp3ppp/2n1p3/q1bp4/2P2B2/P1n1PN2/1PQ1BPPP/3R1RK1 w - - 0 13",lastMove:[" "," "]},{FEN:"r1br2k1/pp3ppp/2n1p3/q1bp4/2P2B2/P1P1PN2/2Q1BPPP/3R1RK1 b - - 0 13",lastMove:[" "," "]},{FEN:"r1br2k1/pp3pp1/2n1p2p/q1bp4/2P2B2/P1P1PN2/2Q1BPPP/3R1RK1 w - - 0 14",lastMove:[" "," "]},{FEN:"r1br2k1/pp3pp1/2n1p2p/q1bp4/P1P2B2/2P1PN2/2Q1BPPP/3R1RK1 b - - 0 14",lastMove:[" "," "]},{FEN:"r1br2k1/pp2npp1/4p2p/q1bp4/P1P2B2/2P1PN2/2Q1BPPP/3R1RK1 w - - 1 15",lastMove:[" "," "]},{FEN:"r1br2k1/pp2npp1/4p2p/q1bpN3/P1P2B2/2P1P3/2Q1BPPP/3R1RK1 b - - 2 15",lastMove:[" "," "]},{FEN:"r1br2k1/pp2npp1/3bp2p/q2pN3/P1P2B2/2P1P3/2Q1BPPP/3R1RK1 w - - 3 16",lastMove:[" "," "]},{FEN:"r1br2k1/pp2npp1/3bp2p/q2PN3/P4B2/2P1P3/2Q1BPPP/3R1RK1 b - - 0 16",lastMove:[" "," "]},{FEN:"r1br2k1/pp3pp1/3bp2p/q2nN3/P4B2/2P1P3/2Q1BPPP/3R1RK1 w - - 0 17",lastMove:[" "," "]},{FEN:"r1br2k1/pp3pp1/3bp2p/q2nN3/P4B2/2P1PB2/2Q2PPP/3R1RK1 b - - 1 17",lastMove:[" "," "]},{FEN:"r1br2k1/pp3pp1/3bp2p/q3N3/P4n2/2P1PB2/2Q2PPP/3R1RK1 w - - 0 18",lastMove:[" "," "]},{FEN:"r1br2k1/pp3pp1/3bp2p/q3N3/P4P2/2P2B2/2Q2PPP/3R1RK1 b - - 0 18",lastMove:[" "," "]},{FEN:"r1br2k1/pp3pp1/4p2p/q3b3/P4P2/2P2B2/2Q2PPP/3R1RK1 w - - 0 19",lastMove:[" "," "]},{FEN:"r1bR2k1/pp3pp1/4p2p/q3b3/P4P2/2P2B2/2Q2PPP/5RK1 b - - 0 19",lastMove:[" "," "]},{FEN:"r1bq2k1/pp3pp1/4p2p/4b3/P4P2/2P2B2/2Q2PPP/5RK1 w - - 0 20",lastMove:[" "," "]},{FEN:"r1bq2k1/pp3pp1/4p2p/4P3/P7/2P2B2/2Q2PPP/5RK1 b - - 0 20",lastMove:[" "," "]},{FEN:"r1b3k1/ppq2pp1/4p2p/4P3/P7/2P2B2/2Q2PPP/5RK1 w - - 1 21",lastMove:[" "," "]},{FEN:"r1b3k1/ppq2pp1/4p2p/4P3/P7/2P2B2/2Q2PPP/1R4K1 b - - 2 21",lastMove:[" "," "]},{FEN:"1rb3k1/ppq2pp1/4p2p/4P3/P7/2P2B2/2Q2PPP/1R4K1 w - - 3 22",lastMove:[" "," "]},{FEN:"1rb3k1/ppq2pp1/4p2p/4P3/P7/2PQ1B2/5PPP/1R4K1 b - - 4 22",lastMove:[" "," "]},{FEN:"1r4k1/ppqb1pp1/4p2p/4P3/P7/2PQ1B2/5PPP/1R4K1 w - - 5 23",lastMove:[" "," "]},{FEN:"1r4k1/ppqb1pp1/4p2p/P3P3/8/2PQ1B2/5PPP/1R4K1 b - - 0 23",lastMove:[" "," "]},{FEN:"1r4k1/ppq2pp1/2b1p2p/P3P3/8/2PQ1B2/5PPP/1R4K1 w - - 1 24",lastMove:[" "," "]},{FEN:"1r4k1/ppq2pp1/2bQp2p/P3P3/8/2P2B2/5PPP/1R4K1 b - - 2 24",lastMove:[" "," "]},{FEN:"1r4k1/pp3pp1/2bqp2p/P3P3/8/2P2B2/5PPP/1R4K1 w - - 0 25",lastMove:[" "," "]},{FEN:"1r4k1/pp3pp1/2bPp2p/P7/8/2P2B2/5PPP/1R4K1 b - - 0 25",lastMove:[" "," "]},{FEN:"1r4k1/pp3pp1/3Pp2p/P7/8/2P2b2/5PPP/1R4K1 w - - 0 26",lastMove:[" "," "]},{FEN:"1r4k1/pp3pp1/3Pp2p/P7/8/2P2P2/5P1P/1R4K1 b - - 0 26",lastMove:[" "," "]},{FEN:"1r3k2/pp3pp1/3Pp2p/P7/8/2P2P2/5P1P/1R4K1 w - - 1 27",lastMove:[" "," "]},{FEN:"1r3k2/pp3pp1/3Pp2p/P7/2P5/5P2/5P1P/1R4K1 b - - 0 27",lastMove:[" "," "]},{FEN:"1r2k3/pp3pp1/3Pp2p/P7/2P5/5P2/5P1P/1R4K1 w - - 1 28",lastMove:[" "," "]},{FEN:"1r2k3/pp3pp1/P2Pp2p/8/2P5/5P2/5P1P/1R4K1 b - - 0 28",lastMove:[" "," "]},{FEN:"1r2k3/p4pp1/Pp1Pp2p/8/2P5/5P2/5P1P/1R4K1 w - - 0 29",lastMove:[" "," "]},{FEN:"1r2k3/p4pp1/Pp1Pp2p/2P5/8/5P2/5P1P/1R4K1 b - - 0 29",lastMove:[" "," "]},{FEN:"1r6/p2k1pp1/Pp1Pp2p/2P5/8/5P2/5P1P/1R4K1 w - - 1 30",lastMove:[" "," "]},{FEN:"1r6/p2k1pp1/PP1Pp2p/8/8/5P2/5P1P/1R4K1 b - - 0 30",lastMove:[" "," "]},{FEN:"1r6/3k1pp1/Pp1Pp2p/8/8/5P2/5P1P/1R4K1 w - - 0 31",lastMove:[" "," "]},{FEN:"1r6/P2k1pp1/1p1Pp2p/8/8/5P2/5P1P/1R4K1 b - - 0 31",lastMove:[" "," "]},{FEN:"r7/P2k1pp1/1p1Pp2p/8/8/5P2/5P1P/1R4K1 w - - 1 32",lastMove:[" "," "]},{FEN:"r7/P2k1pp1/1R1Pp2p/8/8/5P2/5P1P/6K1 b - - 0 32",lastMove:[" "," "]},{FEN:"8/r2k1pp1/1R1Pp2p/8/8/5P2/5P1P/6K1 w - - 0 33",lastMove:[" "," "]},{FEN:"8/r2k1pp1/1R1Pp2p/8/8/5P2/5PKP/8 b - - 1 33",lastMove:[" "," "]},{FEN:"8/r2k1pp1/1R1P3p/4p3/8/5P2/5PKP/8 w - - 0 34",lastMove:[" "," "]},{FEN:"8/r2k1pp1/3P3p/4p3/1R6/5P2/5PKP/8 b - - 1 34",lastMove:[" "," "]},{FEN:"8/r2k2p1/3P3p/4pp2/1R6/5P2/5PKP/8 w - f6 0 35",lastMove:[" "," "]},{FEN:"8/r2k2p1/1R1P3p/4pp2/8/5P2/5PKP/8 b - - 1 35",lastMove:[" "," "]},{FEN:"8/r5p1/1R1Pk2p/4pp2/8/5P2/5PKP/8 w - - 2 36",lastMove:[" "," "]},{FEN:"8/r2P2p1/1R2k2p/4pp2/8/5P2/5PKP/8 b - - 0 36",lastMove:[" "," "]},{FEN:"8/r2k2p1/1R5p/4pp2/8/5P2/5PKP/8 w - - 0 37",lastMove:[" "," "]},{FEN:"8/r2k2p1/7p/1R2pp2/8/5P2/5PKP/8 b - - 1 37",lastMove:[" "," "]},{FEN:"8/r5p1/4k2p/1R2pp2/8/5P2/5PKP/8 w - - 2 38",lastMove:[" "," "]},{FEN:"8/r5p1/1R2k2p/4pp2/8/5P2/5PKP/8 b - - 3 38",lastMove:[" "," "]},{FEN:"8/r4kp1/1R5p/4pp2/8/5P2/5PKP/8 w - - 4 39",lastMove:[" "," "]},{FEN:"8/r4kp1/7p/1R2pp2/8/5P2/5PKP/8 b - - 5 39",lastMove:[" "," "]},{FEN:"8/r5p1/5k1p/1R2pp2/8/5P2/5PKP/8 w - - 6 40",lastMove:[" "," "]},{FEN:"8/r5p1/1R3k1p/4pp2/8/5P2/5PKP/8 b - - 7 40",lastMove:[" "," "]},{FEN:"8/r5p1/1R5p/4ppk1/8/5P2/5PKP/8 w - - 8 41",lastMove:[" "," "]},{FEN:"8/r5p1/7p/1R2ppk1/8/5P2/5PKP/8 b - - 9 41",lastMove:[" "," "]},{FEN:"8/r5p1/7p/1R2pp2/5k2/5P2/5PKP/8 w - - 10 42",lastMove:[" "," "]},{FEN:"8/r5p1/7p/4pp2/1R3k2/5P2/5PKP/8 b - - 11 42",lastMove:[" "," "]},{FEN:"8/r5p1/7p/5p2/1R2pk2/5P2/5PKP/8 w - - 0 43",lastMove:[" "," "]},{FEN:"8/r5p1/7p/5p2/1R2Pk2/8/5PKP/8 b - - 0 43",lastMove:[" "," "]},{FEN:"8/r5p1/7p/8/1R2pk2/8/5PKP/8 w - - 0 44",lastMove:[" "," "]},{FEN:"8/r5p1/7p/8/1R2pk2/7P/5PK1/8 b - - 0 44",lastMove:[" "," "]},{FEN:"8/6p1/7p/r7/1R2pk2/7P/5PK1/8 w - - 1 45",lastMove:[" "," "]},{FEN:"8/1R4p1/7p/r7/4pk2/7P/5PK1/8 b - - 2 45",lastMove:[" "," "]},{FEN:"8/1R4p1/7p/6r1/4pk2/7P/5PK1/8 w - - 3 46",lastMove:[" "," "]},{FEN:"8/1R4p1/7p/6r1/4pk2/7P/5P2/5K2 b - - 4 46",lastMove:[" "," "]},{FEN:"8/1R4p1/6rp/8/4pk2/7P/5P2/5K2 w - - 5 47",lastMove:[" "," "]},{FEN:"8/6p1/6rp/8/1R2pk2/7P/5P2/5K2 b - - 6 47",lastMove:[" "," "]},{FEN:"8/6p1/7p/6r1/1R2pk2/7P/5P2/5K2 w - - 7 48",lastMove:[" "," "]},{FEN:"8/1R4p1/7p/6r1/4pk2/7P/5P2/5K2 b - - 8 48",lastMove:[" "," "]},{FEN:"8/1R4p1/6rp/8/4pk2/7P/5P2/5K2 w - - 9 49",lastMove:[" "," "]},{FEN:"8/6p1/6rp/8/1R2pk2/7P/5P2/5K2 b - - 10 49",lastMove:[" "," "]}],
            // states includs:
                //      FEN
                //      current move
                //      last move
                //      arrows, e.g. maia_moves: [["e1", "e2", 0.5], [...]]
                //      stat: {p: , t: , e: }

            
        }
    }

    componentDidUpdate(prevProps) {
        // if(prevProps.gameID !== this.props.gameID) { // TODO
        //     this.setState({gameID: this.props.gameID});
        //     fetch('/api/games/') //http://dash-dev.maiachess.com
        //         .then(response => response.json())
        //         .then(res => {
        //             this.setState({states: res.states});
        //         });

        // } 
        if (prevProps.move !== this.props.move) {
            this.setState({move: this.props.move});
        }
        if (prevProps.boardSize !== this.props.boardSize) {
            this.setState({boardSize: this.props.boardSize});
        }
    }

    render() {

        let states = this.state.states.reduce(function (states, state, i) { 
            return (i % 2 === 0 ? states.push([state]) 
              : states[states.length-1].push(state)) && states;
        }, []); // group every 2 states

        if (this.state.states.length % 2 === 1) {
            states[states.length - 1].push({lastMove: ["",""]})
        }
        return <div>
            <Board  fen = {this.state.states[this.state.move].FEN}
                    lastMove = {this.state.states[this.state.move].lastMove}
                    //arrows = {arrows}
                    size={this.boardSize} />
            <Card bg="dark" variant="dark" style={{ width: '200px', maxHeight: "400px"}}>
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
                                {e[0].lastMove[1]}
                            </span>
                            
                            <span   style={{display: "inline-block", width: "50%", height: "100%", "textAlign": "right"}} 
                                    onClick={(event) => { 
                                        event.preventDefault();
                                        console.log("Change to view move ", 2*i+1)
                                        this.setState({move: 2 * i + 1 });
                                    }}
                            >
                                {e[1].lastMove[1]}
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