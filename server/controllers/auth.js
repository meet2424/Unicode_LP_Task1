const User = require('../models/User')

//============================REGISTER USER==========================
exports.register = async (req, res, next) => {

    const { username, email, password, phone, role } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
            phone,
            role,
        })

        if (!user) {
            //USER ALREADY THEIR
            return res.status(404).json({
                success: false,
                message: 'User already their'
            })
        }

        //USER CREDENTIALS TRUE 
        sendToken(user, 201, res)

    } catch (error) {
        //SERVER ERROR
        return res.status(500).json({
            success: false,
            message: 'User already their',
        });
    }

}

//============================LOGIN USER==========================
exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })
    try {
        if (!user) {
            //INCORRECT EMAIL
            return res.status(404).json({
                success: false,
                message: 'Incorrect email'
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            //INCORRECT PASSWORD
            return res.status(404).json({
                success: false,
                message: 'Incorrect password'
            })

        }
        //USER CREDENTIALS TRUE
        sendToken(user, 200, res)

    } catch (error) {
        //SERVER ERROR
        return res.status(505).json({
            success: false,
            error: 'Invalid Credentials'
        })
    }

}

//Redirecting GOOGLE USER to protected route in client side
exports.ologin = (req, res, next) => {
    if (!req.user) {

        return res.status(404).json({
            success: false,
            error: 'User not found'
        })
    }
    const token = req.user.createToken();

    res.redirect(`http://localhost:3000/protected?token=${token}`);

}


//This function will return a token on call
const sendToken = (user, statusCode, res) => {
    const token = user.createToken();
    res.status(statusCode).json({
        success: true,
        token
    })

}

