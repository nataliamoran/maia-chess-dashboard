import React from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
import FindMenu from "../../components/findMenu/FindMenu";

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
            <div className="ui stackable four column grid" style={{marginTop: "5px"}}>
                <div className="column" style={{width: "230px", marginLeft: "2px"}}>
                    <FindMenu/>
                    
                </div>
                <div className="column" style={{width: "230px"}}> <BoardState  parentCallback = {boardHandleCallback}/></div>
                <div className="column">stackable column 1</div>
                <div className="column">stackable column 1</div>
            </div>
      </div>
      </div>
    )
}

