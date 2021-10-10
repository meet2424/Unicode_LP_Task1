const User = require('../models/User')

exports.register = async (req, res, next) => {

    const { username, email, password } = req.body;


    try {
        const user = await User.create({
            username,
            email,
            password
        });

        if (!user) {
            res.status(404).json({
                success: false,
                error: 'invalid credentials'
            })
        }

        res.status(201).json({
            success: true,
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

}

exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email })

        if (!user) {
            res.status(404).json({
                success: false,
                error: 'incorrect email'
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            res.status(404).json({
                success: false,
                error: 'incorrect password'
            })
        }
        console.log('log');
        sendToken(user, 200, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }

}

// this function will return a token when called
const sendToken = (user, statusCode, res) => {
    const token = user.createToken();
    console.log(token);
    res.status(statusCode).json({
        success: true,
        token
    })
}

