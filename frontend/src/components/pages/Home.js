import React, {useState, useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
import FindMenu from "../../components/findMenu/FindMenu";
import ReviewMenu from "../../components/review/ReviewMenu";
import Board from "../../components/board/Board";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
//import AutoScale from 'react-auto-scale';
import GamesList from "../../components/games/Games";

export default  function Home(){
    const [FEN, setFEN] = useState("");
    const [filter, setFilter] = useState("");
    const [arrows, setArrows] = useState([]);
    const [lastMove, setlastMove] = useState([]);
    const [gameIDs, setGameIDs] = useState([]);
    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      });
    useEffect(() => {
        function handleResize() {
          setDimensions({
            height: window.innerHeight,
            width: window.innerWidth
          })
        
    }
    window.addEventListener('resize', handleResize)
})

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
    const gamesHandleCallback = (gameIDs) =>{
        setGameIDs(gameIDs);
    }
    const menuHandleCallback = (filter) =>{
        setFilter(filter);
    }

    return (
        <div style={{"background": "#6a6970", minHeight: "100vh", maxHeight: "1000vh"}}>
        <div className={"Home"} >
            <Navbar/>
                <div className="ui stackable four column padded grid top aligned" style={{ marginTop: "5px"}}>
                <div className="column" align="top" style={{width: "210px"}}> 
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px" }}>Games</div>
                        <GamesList 
                            parentCallback = {gamesHandleCallback} 
                            maxHeight = {Math.max(dimensions.height - 150, 200)}
                            />
                    </div>
                    <div className="column" align="top" style={{ width: "220px"}}>
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px" }}>Filters</div>
                        <FindMenu parentCallback={menuHandleCallback}/>    
                    </div>
                    <div className="column" align="top" style={{width: "210px"}}> 
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px" }}>Positions</div>
                        <BoardState 
                            parentCallback = {boardHandleCallback} 
                            maxHeight = {Math.max(dimensions.height - 150, 200)}
                            gameIDs = {gameIDs}
                            searchfilter = {filter}/>
                    </div>
                    <div className="column" align="top" style={{ width: Math.max(300, dimensions.width-830) }}>
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px"}}>Board</div>
                        {/*<AutoScale>*/}
                        <Board  fen = {FEN}
                                lastMove = {lastMove}
                                arrows = {arrows}
                                size={Math.max(300, Math.min(dimensions.width-850, dimensions.height - 150))} />
                        {/*</AutoScale>*/}
                        <div style={{'color': 'orange'}}>Maia Suggestions</div>
                        <div style={{'color': 'red'}}>Stockfish Suggestions</div>
                    </div>
                    <div className="column" align="top" style={{width: "100px", float: "right"}}>
                        <ReviewMenu></ReviewMenu>
                    </div>
            </div>
      </div>
      </div>
    )
}
