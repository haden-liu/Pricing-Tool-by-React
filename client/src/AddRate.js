
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import * as XLSX from 'xlsx'
import { getJsDateFromExcel } from "excel-date-to-js"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AddRates () {

    const [fileName, setFileName] = useState(null)
    const [uploadData, setUploadData] = useState([])

    const nav = useNavigate()

    const handleFile = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        setFileName(file.name)

        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data)
        
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // const dataType = jsonData.map((rate,index)=>{
        //     return (getJsDateFromExcel(rate.valid_date))
        // })

        
            // axios
            //     .post("http://localhost:8000/rates", [rate['carrier'], rate['freight_rate_min'], rate['freight_rate_unit'], rate['fuel_rate'], rate['loading_port'], rate['discharging_port'], rate['valid_date']])
            //     .then((response)=> {
            //         console.log(response)
            //     })
            //     nav('/list')
        // axios
        //     .post("http://localhost:8000/rates", ['Qantas', 130, 10.25, 0.95, 'London', 'Sydney', '2023-03-09' ])
        //     .then((response)=> {
        //         console.log(response)
        //     })
        //     // nav('/list')
        

        // console.log((dataType))
        console.log(jsonData)
        setUploadData(jsonData)
        console.log(uploadData)

        jsonData.map((rate,index) =>{
            axios
                .post("http://localhost:8000/rates", [rate['carrier'], rate['freight_rate_min'], rate['freight_rate_unit'], rate['fuel_rate'], rate['loading_port'], rate['discharging_port'], getJsDateFromExcel(rate['valid_date'])])
                .then((response)=> {
                    console.log(response)
                    nav('/list')
                })
        
        })





   
        
    }

    useEffect(()=>{
        console.log(uploadData)
    },[])




    return (
        <div>
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
                    <li>
                        <Link to="/addRates">Add Rate</Link>
                    </li>


                </ul>
            </nav>
            {fileName && (
                <p>
                    FileName: <span>{fileName}</span>
                </p>
            )}
            <form>
                
                <input
                    type="file"
                    onChange={(e)=> handleFile(e)}
                          
                />
            </form>
           <ul>
            {
                uploadData.map((obj,index)=>{
                    return <li>{obj.carrier}</li>
                })
            }
           </ul>
        </div>
    )
}