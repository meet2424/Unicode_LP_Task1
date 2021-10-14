const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {

    console.log(req.body);
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
        })
        // console.log(user);
        if (!user) {
            console.log('ns');
            res.status(404).json({
                success: false,
                error: 'invalid credentials'
            })
        }
        console.log('s');
        sendToken(user, 201, res)

    } catch (error) {
        console.log(error);
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
        console.log(error);
    }

}

exports.ologin = (req, res, next) => {
    if (!req.user) {
        console.log('f');
        res.status(404).json({
            success: false,
            error: 'User not found'
        })
    }
    const token = req.user.createToken();
    // localStorage.setItem('authToken', token)
    res.redirect(`http://localhost:3000/protected?token=${token}`);


}


// this function will return a token when called
const sendToken = (user, statusCode, res) => {
    const token = user.createToken();
    res.status(statusCode).json({
        success: true,
        token
    })

}

