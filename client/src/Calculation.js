import { Outlet, Link } from "react-router-dom";

import './App.css';

import React, { useState, useEffect } from 'react';

import axios from 'axios'

import './App.css';
import Rates from './Routes';

export default function Calculation() {
    const [inputs, setInputs] = useState({});
    const [totalInputs, setTotalInputs] = useState([])

    const addNewItem = () => {
        
        const newLWH = document.createElement('div');
        newLWH.innerHTML = "<label for=''>Length in CM</label>" +
                        "<input type='float'  name='length' onChange='handleChange'></input>" +
                        "<label for = ''>Width in CM</label>" + 
                        "<input type = 'float' name='width' onChange='handleChange'></input>" +
                        "<label for = ''>Height in CM</label>" +
                        "<input type = 'float' name='height' onChange='handleChange'></input>" +
                        "<label for = ''>Weight in KG</label>" +
                        "<input type = 'float' name='weight' onChange='handleChange'></input>" +
                        "<label for = ''>Amount</label>" +
                        "<input type = 'number' name='amount' onChange='handleChange'></input>"
                        
        document.getElementById('newAddedItem').appendChild(newLWH)

    }

    const handleChange = (e) => {
 
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
    }

    return(
        <div className="app">
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/list">List</Link>
                </li>
                <li>
                    <Link to="/calculation">Calculation</Link>
                </li>

            </ul>
        </nav>
        <p className="add_rate_title">Rate Calculation Form</p>
       
        <form onSubmit={handleSubmit}>
            <label for = ''>Departure</label>
            <input type="text"  name="loading_port" onChange={handleChange}></input>
            <br></br>
            <label for = ''>Arrival</label>
            <input type="text"  name="discharging_port" onChange={handleChange}></input>
            <br></br>
            
            <div class = 'lwh'>
                <div id='FirstForm'>
                    <label for = ''>Length in CM</label>
                    <input type = "float" name="length" onChange={handleChange}></input>
                    <label for = ''>Width in CM</label>
                    <input type = "float" name="width" onChange={handleChange}></input>
                    <label for = ''>Height in CM</label>
                    <input type = "float" name="height" onChange={handleChange}></input>
                    <label for = ''>Weight in KG</label>
                    <input type = "float" name="weight" onChange={handleChange}></input>
                    <label for = ''>Amount</label>
                    <input type = "number" name="amount" onChange={handleChange}></input>
                    
                </div>
                <br></br>

                
                <div id = 'newAddedItem'></div>



            </div>
            <button onClick={addNewItem}>Add New</button>

            <input type="submit" />
 
   

           
    
   
        </form>
    

        </div>
    )
}