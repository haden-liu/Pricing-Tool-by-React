import './App.css';

import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";



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

    const createPDF = () => {
        const pdf = new jsPDF("portrait", "pt", "a4");
        const data = html2canvas(document.querySelector("#pdf"));
        pdf.html(data).then(() => {
          pdf.save("freight_cost.pdf");
        });
    };



    axios
        .get(`http://localhost:8000/rates/${data['locations'].departure}/${data['locations'].arrival}`)
        .then((response)=>{

            // destructing response object
            const [detail_rate] = response.data
            console.log(detail_rate)
            const {carrier, discharging_port, freight_rate_min, freight_rate_unit, fuel_rate, loading_port, valid_date} = detail_rate
            console.log(freight_rate_min * 2)
            console.log(data['details'])
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

       
        
        })   

    return (
        <div>
            <NavLink to='/calculation'>
                Return to Seach
            </NavLink>

            <div>
                <div id='pdf'>
                    <h2 id = 'rate_header'>Our Offer</h2>
                    <p>Shipping {amount} items from {data['locations'].departure} to {data['locations'].arrival}</p>
                    <p>With total volume {totalVol} CBM, total weight {totalWet} KG, and the chargeable weight {chargeableWet} KG based on the ratio 6 CBM = 1000 KG</p>
                    <p>The freight cost is AUD ${freightCost} and the freight surcharge is AUD ${fuelCost}</p>
                    <p>The carrier is {carrier} and rate valid to {validDate}</p>
                    <p>Above costs subjects to GST</p>
                </div>
                <button onClick={createPDF}>Export to PDF</button>
 
             
            </div>
        </div>


    )
}

// export default class Calcresult extends React.Component {
//     constructor(props){
//         super(props);
//         this.state={
//             value:this.props.location.state,
//         }

//     }

//     render() {
//         return (
//             <div>
//                 <p1>{this.props.location.state.departure}</p1>
//             </div>
//         )
//     }
// }