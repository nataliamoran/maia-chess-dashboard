import React, {useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
import FindMenu from "../../components/findMenu/FindMenu";
import ReviewMenu from "../../components/review/ReviewMenu";
import Board from "../../components/board/Board";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

export default  function Home(){
    const [FEN, setFEN] = useState("");
    const [filter, setFilter] = useState("");
    const [arrows, setArrows] = useState([]);
    const [lastMove, setlastMove] = useState([]);
    const boardHandleCallback = (game, FEN) =>{
        var stuff = [];
        if(game.state.last_move){
            setlastMove([game.state.last_move[0], game.state.last_move[1]]);
        }
        //d2 only one arrow for each
        if(game.state.maia_moves && game.state.stockfish_moves && game.state.stockfish_moves[0][0]===game.state.maia_moves[0][0] && game.state.stockfish_moves[0][1]===game.state.maia_moves[0][1]){
            stuff.push({orig: game.state.stockfish_moves[0][0], dest: game.state.stockfish_moves[0][1], brush: 'red' ,  modifiers: {lineWidth: 10}});
            stuff.push({orig: game.state.maia_moves[0][0], dest: game.state.maia_moves[0][1], brush: 'yellow', modifiers: {lineWidth: 6} });
        }
        else{
            if(game.state.stockfish_moves){
                stuff.push({orig: game.state.stockfish_moves[0][0], dest: game.state.stockfish_moves[0][1], brush: 'red' });
            }
            if(game.state.maia_moves){
                stuff.push({orig: game.state.maia_moves[0][0], dest: game.state.maia_moves[0][1], brush: 'yellow' });
            }
        }
        setArrows(stuff);
        setFEN(FEN);
    }
    const menuHandleCallback = (filter) =>{
        setFilter(filter);
    }

    return (
        <div style={{"background": "#6a6970", height: "100vh"}}>
        <div className={"Home"} >
            <Navbar/>
                <div className="ui stackable four column padded grid top aligned" style={{ marginTop: "5px"}}>
                    <div className="column" align="top" style={{ width: "230px"}}>
                        <div style={{'fontSize': '20px','fontWeight': 'bold',  marginBottom: "2px"}}>Filters</div>
                        <FindMenu parentCallback={menuHandleCallback}/>    
                    </div>
                    <div className="column" align="top" style={{width: "230px"}}> 
                        <div style={{'fontSize': '20px','fontWeight': 'bold',  marginBottom: "2px"}}>Positions</div>
                        <BoardState 
                            parentCallback = {boardHandleCallback} 
                            maxHeight = {400}
                            searchfilter = {filter}/>
                    </div>
                    <div className="column" align="top">
                        <div style={{'fontSize': '20px','fontWeight': 'bold',  marginBottom: "2px"}}>Board</div>
                        <Board  fen = {FEN}
                                lastMove = {lastMove}
                                arrows = {arrows}
                                size = {450} />
                        <div style={{'color': 'orange'}}>Maia Suggestions</div>
                        <div style={{'color': 'red'}}>Stockfish Suggestions</div>
                    </div>
                    <div className="column" align="top">
                        <ReviewMenu></ReviewMenu>
                    </div>
            </div>
      </div>
      </div>
    )
}
