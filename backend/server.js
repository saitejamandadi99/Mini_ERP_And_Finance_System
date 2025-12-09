const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const pool = require('./config/db')
//testing purpose
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.get('/', (req, res)=>{
    res.send('Application is running in the backend')
})

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/integrations', require('./routes/integrationRoutes'));
app.use('/api/audit', require('./routes/auditRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));




app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).json({message:err.message || 'Internal server error'})
})

const PORT = process.env.PORT || 5000 

app.listen(PORT, ()=>{
    console.log(`Application is running on the http://localhost:${PORT}`)
})