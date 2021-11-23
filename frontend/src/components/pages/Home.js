import React, {useState, useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
import FindMenu from "../../components/findMenu/FindMenu";
import ReviewMenu from "../../components/review/ReviewMenu";
import BoardWrapper from "../../components/board/BoardWrapper";
import GamesList from "../../components/games/Games";

export default  function Home(){
    const [gameID, setGameID] = useState("");
    const [move, setMove] = useState(0);
    const [filter, setFilter] = useState("");
    const [arrows, setArrows] = useState([]);
    const [lastMove, setlastMove] = useState([]);
    const [gameIDs, setGameIDs] = useState([]);
    const [username, setUsername] = useState('');
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
    const menuHandleCallback = (filter) =>{
        setFilter(filter);
    }
    const usernameHandleCallback = (username) => {
        setUsername(username);
    }

    return (
        <div style={{ "background": "#6a6970", minHeight: "100vh", maxHeight: "1000vh" }}>
        <div className={"Home"} >
                <Navbar parentCallback={usernameHandleCallback}/>
                <div className="ui stackable four column padded grid top aligned" style={{ marginTop: "5px"}}>
                <div className="column" align="top" style={{width: "210px"}}> 
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px" }}>Games</div>
                        <GamesList 
                            parentCallback = {gamesHandleCallback} 
                            username = {usernameHandleCallback}
                            maxHeight = {Math.max(dimensions.height - 150, 200)}
                        />
                        <div>{usernameHandleCallback}</div>
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
                            lastMove = {lastMove}
                            searchfilter = {filter}/>
                    </div>
                    <div className="column" align="top" style={{ width: Math.max(300, Math.min(dimensions.width-850, dimensions.height - 150)) }}>
                        <div style={{ 'fontSize': '20px', 'fontWeight': 'bold', marginBottom: "2px"}}>Board</div>
                        <BoardWrapper   gameID = {gameID} // TODO:
                                        move = {move}
                                        arrows = {arrows}
                                        boardSize={Math.max(300, Math.min(dimensions.width-850, dimensions.height - 150))} />
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