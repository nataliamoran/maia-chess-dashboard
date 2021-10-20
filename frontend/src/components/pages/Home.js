import React,{useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
export default  function Home(){

    const boardHandleCallback = (childData) =>{
        console.log(childData);
        //this.setState({data: childData})
    }

    return (
        <div className={"Home"}>
            <Navbar />
            <BoardState  parentCallback = {boardHandleCallback}/>
      </div>
    )
}

