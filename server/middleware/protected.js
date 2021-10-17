const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protected = async (req, res, next) => {

    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization
    }

    if (!token) {
        res.status(401).json({ success: false, error: 'Acess denied not token' })
        next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(404).json({ success: false, error: 'No user found' })
            next();
        }
        req.user = user
        next();

    } catch (error) {
        res.status(401).json({ success: false, error: 'Acess denied' })
        next();

    }

}