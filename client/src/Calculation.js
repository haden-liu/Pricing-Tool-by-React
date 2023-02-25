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


    const [locations, setLocations] = useState(
        {
            departure: '',
            arrival: '',
        }
    )
    const [inputs, setInputs] = useState(
       [
            {
                length: '',
                width:'',
                height:'',
                weight:'',
                amount:''
            }
        ]
        
    )

    // const [rowInputs, setRowInputs] = useState({
    //     length: '',
    //     width:'',
    //     height:'',
    //     weight:'',
    //     amount:''
    // })
   

    const nav = useNavigate()

    const addNewItem = () => {
        setInputs([...inputs,{
            length: '',
            width:'',
            height:'',
            weight:'',
            amount:''
        }])
        
    }


    const handleChangeDept= (event) => {
        const {name, value} = event.target
        console.log({ name, value})
        setLocations(
            {...locations, departure:value}
        )
    }

    const handleChangeArr = (event) => {
        const {name, value} = event.target
        console.log({ name, value})
        setLocations(
            {...locations, arrival:value}
        )
    }


    const handleChangeLen = (index, event)=>{
    
        const { name, value } = event.target;
        console.log({ name, value })
        console.log(index)

        let update_item = inputs[index][name]
        console.log(update_item)
        setInputs(inputs.map((input, ind)=>{
            if(ind === index) {
                return {...input, length:value }
            } else {
                return input
            }
        }))
    }

    const handleChangeWid = (index, event)=>{
    
        const { name, value } = event.target;
        console.log({ name, value })
        console.log(index)

   
        setInputs(inputs.map((input, ind)=>{
            if(ind == index) {
                return {...input, width: value }
            } else {
                return input
            }
        }))
    }

    const handleChangeHei = (index, event)=> {
        const { name, value } = event.target;
        console.log({ name, value })
        console.log(index)

        let update_item = inputs[index][name]
        console.log(update_item)
        setInputs(inputs.map((input, ind)=>{
            if(ind === index) {
                return {...input, height:value }
            } else {
                return input
            }
        }))
    }

    const handleChangeWet = (index, event)=> {
        const { name, value } = event.target;
        console.log({ name, value })
        console.log(index)

        let update_item = inputs[index][name]
        console.log(update_item)
        setInputs(inputs.map((input, ind)=>{
            if(ind === index) {
                return {...input, weight:value }
            } else {
                return input
            }
        }))
    }

    const handleChangeAmt = (index, event)=> {
        const { name, value } = event.target;
        console.log({ name, value })
        console.log(index)

        let update_item = inputs[index][name]
        console.log(update_item)
        setInputs(inputs.map((input, ind)=>{
            if(ind === index) {
                return {...input, amount:value }
            } else {
                return input
            }
        }))
    }

    const handleChange = (index, event)=>{

    }


    
    useEffect(()=>{
        console.log(locations)
    },[])

    useEffect(()=>{
        console.log(inputs)
    })
    
    // useEffect(()=>{
    //     console.log(rowInputs)
    // },[])


    // useEffect(()=> {
    //     window.localStorage.getItem('inputs')
    // })


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(locations)
        console.log(inputs)
        const payload = {
            locations: locations,
            details: inputs
        }
        nav("/calcresult", {state:payload})
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
                <td><input type = 'text' name = 'arrival'   onChange={(event)=>handleChangeArr(event)}></input></td>
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
            inputs.map((input, index) => {
                const {length, width, height, weight, amount} = input

                return (
                
                    <tr key = {index}>
                        {/* <td><input type = 'text' name = 'departure' value = {departure} onChange={(event)=>handleChange(index, event)}></input></td>
                        <td><input type = 'text' name = 'arrival' value = {arrival} onChange={(event)=>handleChange(index, event)}></input></td> */}
                        <td><input type = 'number' name = 'length'  onChange={(event)=>handleChangeLen(index, event)}></input></td>
                        <td><input type = 'number' name = 'width'  onChange={(event)=>handleChangeWid(index, event)}></input></td>
                        <td><input type = 'number' name = 'height'  onChange={(event)=>handleChangeHei(index, event)}></input></td>
                        <td><input type = 'number' name = 'weight'  onChange={(event)=>handleChangeWet(index, event)}></input></td>
                        <td><input type = 'number' name = 'amount'  onChange={(event)=>handleChangeAmt(index, event)}></input></td>
                    </tr>  

                )
            })
        }

        </table>
        <div className="row">
            <button onClick={addNewItem}>Add New</button>
      
            <button onClick = {handleSubmit}>Submit</button>
            
        </div>

        </div>
    )
}