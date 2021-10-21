import React from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
import FindMenu from "../../components/findMenu/FindMenu";

export default  function Home(){

    const boardHandleCallback = (childData) =>{
        console.log(childData);
        //this.setState({data: childData})
    }

    return (
        <div className={"Home"}>
            <Navbar/>
            <div class="ui stackable four column grid">
                <div class="column">
                    <FindMenu/>
                </div>
                <div class="column"> <BoardState  parentCallback = {boardHandleCallback}/></div>
                <div class="column">stackable column 1</div>
                <div class="column">stackable column 1</div>
            </div>
      </div>
    )
}

