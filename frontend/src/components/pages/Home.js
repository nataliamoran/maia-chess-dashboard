import React, {useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
import FindMenu from "../../components/findMenu/FindMenu";
import Board from "../../components/board/Board";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

export default  function Home(){
    const [FEN, setFEN] = useState("");
    const [filter, setFilter] = useState("");
    const boardHandleCallback = (ID, FEN) =>{
        setFEN(FEN);
    }
    const menuHandleCallback = (filter) =>{
        setFilter(filter);
    }

    return (
        <div style={{"background": "#6a6970", height: "100vh"}}>
        <div className={"Home"} >
            <Navbar/>
                <div className="ui stackable four column padded grid middle aligned" style={{ marginTop: "5px"}}>
                    <div className="column" align="top" style={{ width: "230px"}}>
                    <FindMenu parentCallback={menuHandleCallback}/>    
                </div>
                    <div className="column" align="top" style={{width: "230px"}}> 
                    <BoardState  
                    parentCallback = {boardHandleCallback} 
                    searchfilter = {filter}/></div>
                    <div className="column" align="top"><Board  fen = {FEN}
                                                lastMove = {null}
                                                arrows = {null}
                                                size = {500} /></div>
                    <div className="column" align="top"></div>
            </div>
      </div>
      </div>
    )
}

