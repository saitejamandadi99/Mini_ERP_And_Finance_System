const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{rejectUnauthorized:false}
})

pool.connect()
.then(()=>console.log('Connected to the Neon PostgreSQL'))
.catch(err=>console.log('database connection error: ', err.message))

module.exports = pool;