import './App.css';

import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';


import { useNavigate } from "react-router-dom";

import axios from 'axios';




export default function Calcresult (props) {

    
    const location = useLocation()

    const data = location.state

    console.log(data)

    const [amount, setAmount] = useState()
    const [totalWet, setTotalWet] = useState()
    const [totalVol, setTotalVol] = useState()
    const [chargeableWet, setChargeableWet] = useState()
    const [freightCost, setFreightCost] = useState()
    const [fuelCost, setFuelCost] = useState()
    const [carrier, setCarrier] = useState()
    const [validDate, setValidDate] = useState()
    const [error,setError] = useState(false)

    const nav = useNavigate()

    const backtoCalc = (e) =>{
        e.preventDefault()
        nav('/calculation')
    }


    axios
        .get(`http://localhost:8000/rates/${data['locations'].departure}/${data['locations'].arrival}`)
        .then((response)=>{

            // destructing response object
            const [detail_rate] = response.data
            console.log(detail_rate)
            const {carrier, discharging_port, freight_rate_min, freight_rate_unit, fuel_rate, loading_port, valid_date} = detail_rate
       
            setCarrier(carrier)
            setValidDate(valid_date)

            // using map function to get total volume and weight per item row
            const rowLoadArr = data['details'].map((row)=>{
                return {
                        volume: (row.length * row.width * row.height) / 1000000 * row.amount,
                        weight: row.weight * row.amount
                    }
            })
            console.log(rowLoadArr)

            //using reduce function to get total actual weight and total volumn
            const totalVol = rowLoadArr.reduce((total, item) => {
                return total + item.volume
            }, 0)
            console.log(totalVol)
            setTotalVol(totalVol.toFixed(2))

            const totalActWet = rowLoadArr.reduce((total, item)=>{
                return total + item.weight
            }, 0)
            console.log(totalActWet)
            setTotalWet(totalActWet.toFixed(2))

            // develop logic to calculate the freight cost
            const chargeableWet = Math.max(totalActWet,totalVol*1000/6).toFixed(2)
            console.log(chargeableWet)
            setChargeableWet(chargeableWet)

            // if condition to calculate total freight cost and fuel cost
            const freightCost = freight_rate_min >= chargeableWet * freight_rate_unit ? freight_rate_min : (chargeableWet * freight_rate_unit).toFixed(2)
            console.log(freightCost)
            setFreightCost(freightCost)

            const fuelCost = (chargeableWet * fuel_rate).toFixed(2)
            console.log(fuelCost)
            setFuelCost(fuelCost)

            //get total package amount
            const totalAmt = data['details'].reduce((total, item)=>{
                return total + parseInt(item.amount)
            },0)
            console.log(totalAmt)

            setAmount(totalAmt)
        
        }).catch((err)=>{
            
            console.log(err.response.data['message'])
            // if(err.response.status === 404) {
            //     alert('unable to find result')
            // }
            setError(true)
            nav("/emptyResult")
        })   

    return (
        <div>
            <div>
    
                <h2 id = 'rate_header'>Our Offer</h2>
                <div id='calc_result'>
                    <div id = 'results'>
                        <p>Shipping {amount} items from {data['locations'].departure} to {data['locations'].arrival}</p>
                        <p>With total volume {totalVol} CBM, total weight {totalWet} KG, and the chargeable weight {chargeableWet} KG</p>
                        <p>The freight cost is AUD ${freightCost} and the fuel surcharge is AUD ${fuelCost}</p>
                        <p>The carrier is {carrier} and rate valid to {(new Date(validDate)).toLocaleDateString()}</p>
                    </div>
                    <div id = 'notes'>
                        <p>Above costs subjects to GST</p>
                        <p>Chargeable weight based on the ratio 6 CBM = 1000 KG</p>
                    </div>
                </div>


                <button id = 'return_btn' onClick={backtoCalc}>
                    Back to Calculation
                </button>
                
            </div>
            
        </div>


    )
}

