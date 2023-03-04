import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import moment from "moment";

import { Link } from 'react-router-dom';

import axios from 'axios'

import './App.css';
import Rates from './Routes';

export default function RateList() {


   
  const [rates, setRates] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (event) => {
    event.preventDefault()
    console.log(event.target.id)

    axios
        .delete(`http://localhost:8000/rates/${event.target.id}`)
        .then(()=> {
            setRates(
                rates.filter((rate)=>{
                    return rate.id != event.target.id
                })
            )
        })
  }




  useEffect(() => {

    axios
        .get("http://localhost:8000/rates")
        .then((response) => {
          const lists = response.data
          console.log(lists)
          setRates(lists)
        })
  }, []);


  return (
    <div className="App">
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

        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Carrier</TableCell>
                            <TableCell align="right">Minimum Rate</TableCell>
                            <TableCell align="right">Unit Rate</TableCell>
                            <TableCell align="right">Fuel Rate</TableCell>
                            <TableCell align="right">Departure</TableCell>
                            <TableCell align="right">Arrival</TableCell>
                            <TableCell align="right">Valid Date</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rates.map((rate) => (
                            <TableRow
                                key={rate.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                   
                            <TableCell component="th" scope="row">
                                {rate.carrier}
                            </TableCell>
                            <TableCell align="right">{rate.freight_rate_min}</TableCell>
                            <TableCell align="right">{rate.freight_rate_unit}</TableCell>
                            <TableCell align="right">{rate.fuel_rate}</TableCell>
                            <TableCell align="right">{rate.loading_port}</TableCell>
                            <TableCell align="right">{rate.discharging_port}</TableCell>
                            <TableCell align="right">{moment(rate.valid_date).utc().format('YYYY-MM-DD')} </TableCell>
                            <TableCell align="right"><button id={rate.id} onClick={handleDelete}>Delete</button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rates.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
        </div>
 
    </div>
  
  )}