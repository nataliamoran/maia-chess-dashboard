import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Store from "./components/pages/Store.js"
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className={"App"}>
            </div>
            <Route path={"/"} exact component={Store} />
        </BrowserRouter>
    )
}
export default App;