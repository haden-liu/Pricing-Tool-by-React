import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function EmptyResult(){

    const nav = useNavigate()

    const backtoCalc = () => {
        nav('/calculation')
    }

    return(
        <div>
            <h2>We can not find any rate based on your search.</h2>
            <button onClick={backtoCalc}>Back to Search</button>
        </div>
    )
}