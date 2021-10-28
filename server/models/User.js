const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
    },
    role: String,
})

//Using mongoose and bcrypt
//We modify plain password to hash before user.save() method

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

})

//Using mongoose and bcrypt
//We add a method 'matchPassword' to our User model to compare login password with our DB

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//Using mongoose and jwt
//We add a method 'createToken' to our User model which on call will return a Token

userSchema.methods.createToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

const User = mongoose.model('User', userSchema);

module.exports = User