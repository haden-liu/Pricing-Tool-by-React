import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import RateList from "./RateList";
import Calculation from "./Calculation";

import './App.css';


export default function Rates() {
 return(
    <div>
        <h1 id = 'title'>Rates Calculator</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Layout />}></Route>
                <Route path="list" element = {<RateList />}></Route>
                <Route path="calculation" element = {<Calculation />}></Route>





            </Routes>

        
        
        </BrowserRouter>

    </div>
 )
}