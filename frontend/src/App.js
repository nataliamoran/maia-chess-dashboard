import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./components/pages/Home.js"
import './App.css';
function App() {
    return (
        <BrowserRouter>
            <div className={"App"}>
            </div>
            <Route path={"/"} exact component={Home} />
        </BrowserRouter>
    )
}
export default App;