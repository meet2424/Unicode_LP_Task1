const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/api/auth/register', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        success: true
    })

})

app.listen(5000, console.log('server running on port 5000'))