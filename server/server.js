const express = require('express')
const cors = require('cors')
const app = express();
const passport = require('passport');

// config files
require('dotenv').config();
const connectDB = require('./config/db')
require('./config/OAuth')

//Connect to MongoDB
connectDB();

//================MIDDLEWARES==================
app.use(cors({ credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(passport.initialize())

//Using the routes set up
app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))

// ============================ ROOT ROUTE ==============================
app.get('/', (req, res) => {
    res.send('Running..')
})

//Specifying which port to run on
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})