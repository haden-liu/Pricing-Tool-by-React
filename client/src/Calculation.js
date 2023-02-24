import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { HistoryRouterProps } from "react-router-dom";

import './App.css';

import React, { useState, useEffect } from 'react';

import axios from 'axios'

import './App.css';
import Rates from './Routes';
import { MRT_TablePagination } from "material-react-table";

export default function Calculation() {
    // const [inputs, setInputs] = useState([{
    //     departure:'',
    //     arrival:'',
    //     length: '',
    //     width:'',
    //     height:'',
    //     weight:'',
    //     amount:''
    // }]);
    // const [locationInputs, setLocationInputs] = useState(['Sydney'])
    const [inputs, setInputs] = useState(
        {
            locations: {departure: '', arrival: ''},
            details: [{
                length: '',
                width:'',
                height:'',
                weight:'',
                amount:''
            }]
        }
    )
   

    const nav = useNavigate()

    const addNewItem = () => {
        setInputs([...inputs, {
            locations: {departure: '', arrival: ''},
            details: [{
                length: '',
                width:'',
                height:'',
                weight:'',
                amount:''}]
        }])
    }

    // const addNewItem = () => {
    //     setInputs([...inputs, {
    //         departure:'',
    //         arrival:'',
    //         length: '',
    //         width:'',
    //         height:'',
    //         weight:'',
    //         amount:''
    //     }])
    // }

    const handleChangeDept = (event) => {
        const {name, value} = event.target
        console.log({ name, value})
        setInputs({...inputs, locations: {
            ...inputs.locations,
            departure: value
        }})
    }

    const handleChangeArriv = (event) => {
        const {name, value} = event.target
        console.log({ name, value})
        setInputs({...inputs, locations: {
            ...inputs.locations,
            arrival: value
        }})
    }


    // const handleChange = (index, event)=>{
    
    // //     const { name, value } = event.target;
    // //     console.log({ name, value })
    // //     console.log(index)
    // //     const list = [...inputs['details']];
    // //     list[index][name]= value;
    // //     console.log(list)
    // //     setInputs(list);  
     
    // // }
    
    useEffect(()=>{
        console.log(inputs)
    },[])
    


    // useEffect(()=> {
    //     window.localStorage.getItem('inputs')
    // })


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
        console.log(parseFloat(inputs[0].length) * 2)
        nav("/calcresult", {state:inputs})
        // nav('/calcresult', {state:locationInputs})
  
        
     
    }

    // useEffect (() => {
    //     console.log(totalInputs)
    // }, [])

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
        <table>
            <tr>
                <th>Departure</th>
                <th>Arrival</th>
            </tr>
    
                <tr>
                <td><input type = 'text' name = 'departure'   onChange={(event)=>handleChangeDept(event)}></input></td>
                <td><input type = 'text' name = 'arrival'   onChange={(event)=>handleChangeArriv(event)}></input></td>
                </tr>
            
        
        </table>

        <table>
            <tr>
                {/* <th>Departure</th>
                <th>Arrival</th> */}
                <th>Length</th>
                <th>Width</th>
                <th>height</th>
                <th>weight</th>
                <th>Amount</th>
            </tr>

        {
            // inputs.map((input, index) => {
            //     const {length, width, height, weight, amount} = input.details

            //     return (
                
            //         <tr key = {index}>
            //             {/* <td><input type = 'text' name = 'departure' value = {departure} onChange={(event)=>handleChange(index, event)}></input></td>
            //             <td><input type = 'text' name = 'arrival' value = {arrival} onChange={(event)=>handleChange(index, event)}></input></td> */}
            //             <td><input type = 'number' name = 'length' value = {length} onChange={(event)=>handleChange(index, event)}></input></td>
            //             <td><input type = 'number' name = 'width' value = {width} onChange={(event)=>handleChange(index, event)}></input></td>
            //             <td><input type = 'number' name = 'height' value = {height} onChange={(event)=>handleChange(index, event)}></input></td>
            //             <td><input type = 'number' name = 'weight' value = {weight} onChange={(event)=>handleChange(index, event)}></input></td>
            //             <td><input type = 'number' name = 'amount' value = {amount} onChange={(event)=>handleChange(index, event)}></input></td>
            //         </tr>  

            //     )
            // })
        }

        </table>
        <div className="row">
            <button onClick={addNewItem}>Add New</button>
      
            <button onClick = {handleSubmit}>Submit</button>
            
        </div>

        </div>
    )
}