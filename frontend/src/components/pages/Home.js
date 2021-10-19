import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FindMenu from "../../components/findMenu/FindMenu";
export default  function Home(){
    return (
        <div className={"Home"}>
            <Navbar/>
            <div class="ui stackable four column grid">
                <div class="column">
                    <FindMenu/>
                </div>
                <div class="column">stackable column 1</div>
                <div class="column">stackable column 1</div>
                <div class="column">stackable column 1</div>
            </div>
      </div>
    )
}