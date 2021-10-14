const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {

    console.log(req.body);
    const { username, email, password, phone } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
            phone,
        })
        console.log(user);
        if (!user) {
            // console.log('ns');
            return res.status(404).json({
                success: false,
                message: 'User already their'
            })
        }
        // console.log('s');
        sendToken(user, 201, res)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User already their',
        });
    }

}

exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })
    try {
        if (!user) {
            // console.log('fe');
            return res.status(404).json({
                success: false,
                message: 'Incorrect email'
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            // console.log('fp');
            return res.status(404).json({
                success: false,
                message: 'Incorrect password'
            })
            // console.log('d');
        }
        // console.log('log');
        sendToken(user, 200, res)

    } catch (error) {
        // console.log('f');
        return res.status(505).json({
            success: false,
            error: 'Invalid Credentials'
        })
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

