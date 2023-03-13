import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function HeightLmt(){

    const nav = useNavigate()

    const backtoCalc = () => {
        nav('/calculation')
    }

    return(
        <div>
            <h2>At least one item of your cargo is higher than 160cm and they can not be loaded into PAX Aircraft.</h2>
            <h2>Please contact our team to quote costs by freighter.</h2>

            <button onClick={backtoCalc}>Back to Search</button>
        </div>
    )
}