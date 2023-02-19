const pg = require("pg")

const db = new pg.Pool({
    database: 'freight'
})

module.exports = db