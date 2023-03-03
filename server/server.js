const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser")

const db = require('./db/db')

const app = express();

app.use(express.static("static"))

app.use(bodyParser.json())

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/rates', (req, res) => {
    const sql = "SELECT * from rates";
    db.query(sql).then(({ rows }) => {
        res.json(rows)
    })
})

// delete rate
app.delete('/rates/:id', (req, res)=> {
    const delete_id = req.params.id

    const sql = `delete from rates where id = $1`
  
    const variable = [delete_id]
  
  
    db.query(sql, variable).then((dbRes) => {
      res.json({ success: true });
    });
})

// get rate by by departure and Arrival
app.get('/rates/:departure/:arrival', (req, res)=>{
    const departure = req.params.departure
    const arrival = req.params.arrival
    

    const sql = `select carrier, freight_rate_min, freight_rate_unit, fuel_rate, loading_port, discharging_port, valid_date from rates where loading_port = '${departure}' and discharging_port = '${arrival}'`

    db.query(sql).then(({ rows }) => {

        if(rows.length === 0) {
            return res.status(404).json({message: 'unable to find result'})
        } else {
            return res.json(rows)
        }
    
})})

// post rates
app.post('/rates', (req, res)=> {
    console.log(req.body)

    const [carrier, freight_rate_min, freight_rate_unit, fuel_rate, loading_port, discharging_port,  valid_date] = req.body

    const sql = `
    insert into rates (carrier, freight_rate_min, freight_rate_unit,fuel_rate,loading_port,discharging_port,valid_date) values ($1, $2, $3, $4, $5, $6, $7)
    `
    db.query(sql, [carrier, freight_rate_min, freight_rate_unit, fuel_rate, loading_port, discharging_port,  valid_date]).then((dbRes) => {
     
          res.json({ success: true })


    })})




app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });