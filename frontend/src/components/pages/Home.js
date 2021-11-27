import React, {useState, useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
import FindMenu from "../../components/findMenu/FindMenu";
import ReviewMenu from "../../components/review/ReviewMenu";
import BoardWrapper from "../../components/board/BoardWrapper";
import GamesList from "../../components/games/Games";
import PlayerStat from "../../components/player-stat/PlayerStat";

export default  function Home(){
    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      });

    const [username, setUsername] = useState('maia1');

    const [gameIDs, setGameIDs] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterString, setFilterString] = useState("");

    const [gameID, setGameID] = useState("");
    const [move, setMove] = useState(0);
    const [arrows, setArrows] = useState([]);
    const [lastMove, setlastMove] = useState([]);

    useEffect(() => {
        function handleResize() {
          setDimensions({
            height: window.innerHeight,
            width: window.innerWidth
          })
        }
        window.addEventListener('resize', handleResize);
    })

    const boardHandleCallback = (game) =>{
        var stuff = [];
         if(game.state.last_move){
             setlastMove([game.state.last_move[0], game.state.last_move[1]]);
         }
         if(game.state.stockfish_moves){
            game.state.stockfish_moves.forEach(move => {
                stuff.push({orig: move[0], dest: move[1], brush: 'red' ,  modifiers: {lineWidth: 10}});
            })
        }
         if(game.state.maia_moves){
             game.state.maia_moves.forEach(move => {
                if(game.state.stockfish_moves && game.state.stockfish_moves.includes(move)){
                    stuff.push({orig: move[0], dest: move[1], brush: 'yellow' ,  modifiers: {lineWidth: 6}});
                }
                else {
                    stuff.push({orig: move[0], dest: move[1], brush: 'yellow' ,  modifiers: {lineWidth: 10}});
                }
             })
         }
         setArrows(stuff);
         setGameID(game.ID);
         setMove(game.state.round);
    }
    const gamesHandleCallback = (gameIDs) =>{
        setGameIDs(gameIDs);
    }
    const menuHandleCallback = (filter, customText) =>{
        setFilterString(customText);
        setFilter(filter);
    }
    const usernameHandleCallback = (username) => {
        setUsername(username);
    }

    return (
        <div style={{ "background": "#6a6970", minHeight: "100vh", maxHeight: "1000vh" }}>
        <div className={"Home"} >
                <Navbar parentCallback={usernameHandleCallback}/>
                <div className="ui stackable four column padded grid top aligned" style={{ marginTop: "5px", minHeight: '85vh'}}>
                    <div className="column" align="center" style={{width: "190px"}}>
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px","textAlign": "left" }}>Games</div>
                        <GamesList 
                            parentCallback = {gamesHandleCallback} 
                            username = {username}
                            maxHeight = {Math.max(dimensions.height - 150, 200)}
                        />
                        <div>{usernameHandleCallback}</div>
                    </div>
                    <div className="column" align="center" style={{ width: "180px"}}>
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px" , "textAlign": "left"}}>Filters</div>
                        <FindMenu parentCallback={menuHandleCallback}/>  
                    </div>
                    <div className="column" align="center" style={{width: "190px"}}>
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px", "textAlign": "left" }}>Positions</div>
                        <BoardState 
                            parentCallback = {boardHandleCallback} 
                            maxHeight = {Math.max(dimensions.height - 150, 200)}
                            gameIDs = {gameIDs}
                            lastMove = {lastMove}
                            searchfilter = {filter}
                            customString = {filterString}
                            username = {username}
                            />
                    </div>
                    <div className="column" align="center" style={{ width: 200 + Math.max(300, Math.min(dimensions.width-920, dimensions.height - 150)) ,"textAlign": "left"}}>
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px"}}>Board</div>
                        <BoardWrapper   gameID = {gameID} // TODO:
                                        move = {move}
                                        arrows = {arrows}
                                        stateSize = {Math.max(dimensions.height - 150, 200)}
                                        boardSize={Math.max(300, Math.min(dimensions.width-920, dimensions.height - 150))} />
                        <p style={{float: "left"}}>
                            <span style={{'color': 'orange'}}>Maia Suggestions</span> 
                            <br/>
                            <span style={{'color': 'red'}}>Stockfish Suggestions</span>
                        </p>
                    </div>
                    <div className="column" align="center" style={{width: "100px", float: "right", "textAlign": "left"}}>
                        <ReviewMenu></ReviewMenu>
                    </div>
                </div>
                <div align='center' style={{ marginBottom: "10px"}}>
                    <PlayerStat username = {username}/><br/>
                </div>
      </div>
      </div>
    )
}