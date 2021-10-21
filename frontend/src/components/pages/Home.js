import React from "react";
import Navbar from "../../components/navbar/Navbar";
import BoardState from "../../components/board-state/BoardState";
import FindMenu from "../../components/findMenu/FindMenu";

export default  function Home(){
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }

    const boardHandleCallback = (ID, FEN) =>{
        console.log(ID);
        console.log(FEN);
        //this.setState({data: childData})
    }

    //const { height, width } = getWindowDimensions();

    return (
        <body style={{"background": "#6a6970", height: "580px"}}>
        <div className={"Home"} >
            <Navbar/>
            <div className="ui stackable four column grid" style={{marginTop: "10px"}}>
                <div className="column" style={{width: "230px"}}>
                    <FindMenu/>
                    
                </div>
                <div className="column" style={{width: "230px"}}> <BoardState  parentCallback = {boardHandleCallback}/></div>
                <div className="column">stackable column 1</div>
                <div className="column">stackable column 1</div>
            </div>
      </div>
      </body>
    )
}

