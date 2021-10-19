import React from "react";
import Navbar from "../../components/navbar/Navbar";
export default  function Home(){
    return (
        <div className={"Home"}>
            <Navbar/>
            <div class="ui stackable four column grid">
                <div class="column">stackable column 1</div>
                <div class="column">stackable column 1</div>
                <div class="column">stackable column 1</div>
                <div class="column">stackable column 1</div>
            </div>
      </div>
    )
}