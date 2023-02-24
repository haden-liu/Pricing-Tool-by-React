import './App.css';

import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import axios from 'axios';


export default function Calcresult (props) {

    const [basicrates, setBasicRates] = ([])

    

    // const { departure, arrival, length, width, height, weight, amount } = this.props.location
    // const [details, setDetails] = useState(this.props.location.state)
    const location = useLocation()

    const data = location.state

    console.log(data)

    // data.map((object)=>[

    //     axios
    //         .get(`http://localhost:8000/rates/${object.departure}/${object.arrival}`)
    //         .then((response)=>{
    //             console.log(response.data)
    //         })    

    // ])

    // axios.all(data.map((object)=> {
    //     axios
    //         .get(`http://localhost:8000/rates/${object.departure}/${object.arrival}`)
    //         .then((response)=> {
    //             console.log(response.data)
    //             let list = response.data
                
    //         })

    // }))

    useEffect(()=> {
            let basicArr = []
            data.map((object)=>{
            axios
                .get(`http://localhost:8000/rates/${object.departure}/${object.arrival}`)
                .then((response)=> {
                    let list = response.data
                    console.log(list)
                    console.log(typeof(list))
                    basicArr.push(list)
                    })
        });
        console.log(basicArr)
        
    },[])


   
    

    // const { departure, arrival, length, width, height, weight, amount } = (props.location && props.location.state) || {};
    // console.log(props.inputs)
    return (
        <div>
            <NavLink to='/calculation'>
                Return to Seach
            </NavLink>

            <div>
                <p>results</p>
                <p>{basicrates}</p>
             
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