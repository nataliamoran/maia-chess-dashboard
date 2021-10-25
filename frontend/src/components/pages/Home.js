import React from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
import FindMenu from "../../components/findMenu/FindMenu";
import Board from "../../components/board/Board";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

export default  function Home(){
    const boardHandleCallback = (ID, FEN) =>{
        console.log(ID);
        console.log(FEN);
        //this.setState({data: childData})
    }

    return (
        <div style={{"background": "#6a6970", height: "100vh"}}>
        <div className={"Home"} >
            <Navbar/>
                <div className="ui stackable four column padded grid middle aligned" style={{ marginTop: "5px" }}>
                    <div className="column" align="middle" style={{ width: "230px" }}>
                    <FindMenu/>    
                </div>
                    <div className="column" align="middle" style={{width: "230px"}}> <BoardState  parentCallback = {boardHandleCallback}/></div>
                    <div className="column" align="middle">stackable column 1</div>
                    <div className="column" align="middle"><Board  fen = {"r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1PP2/2NP1N2/PPP3PP/R1BQK2R w KQ - 2 7"}
                                                lastMove = {null}
                                                arrows = {null}
                                                size = {500} /></div>
            </div>
      </div>
      </div>
    )
}

