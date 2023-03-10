import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import RateList from "./RateList";
import Calculation from "./Calculation";
import Calcresult from "./calcresult";
import AddRates from "./AddRate";
import EmptyResult from "./emptyResult";
import HeightLmt from "./HeightLmt";


import './App.css';


export default function Rates() {
 return(
    <div>
        <h1 id = 'title'>Rates Calculator</h1>
        <BrowserRouter basename="Pricing-Tool-by-React">
            <Routes>
                <Route path="/" element = {<Layout />}></Route>
                <Route path="list" element = {<RateList />}></Route>
                <Route path="calculation" element = {<Calculation />}></Route>
                <Route path="calcresult" element = {<Calcresult />}></Route>
                <Route path="addRates" element = {<AddRates />}></Route>
                <Route path="emptyResult" element = {<EmptyResult />}></Route>
                <Route path="heightlmt" element = {<HeightLmt />}></Route>

                






            </Routes>

        
        
        </BrowserRouter>

    </div>
 )
}