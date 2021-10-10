const express = require('express')
const cors = require('cors')
const app = express();
const connectDB = require('./config/db')
require('dotenv').config();
//Connect DB
connectDB();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})