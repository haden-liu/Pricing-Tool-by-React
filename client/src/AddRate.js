
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import * as XLSX from 'xlsx'
import { getJsDateFromExcel } from "excel-date-to-js"
import { useNavigate } from 'react-router-dom';
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

        const dataType = jsonData.map((rate,index)=>{
            return (getJsDateFromExcel(rate.valid_date))
        })

        console.log((dataType))
        console.log(jsonData)
        setUploadData(jsonData)

   
        
    }




    return (
        <div>
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