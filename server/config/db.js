const mongoose = require('mongoose')

const connectDB = async () => {

    const dbURL = process.env.DB_URL

    await mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log('MongoDB connected');
}

module.exports = connectDB;