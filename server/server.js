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

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });