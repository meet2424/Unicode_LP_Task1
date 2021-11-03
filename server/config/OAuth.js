const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('../models/User')


passport.use(new GoogleStrategy(
    {
        //Options to use google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/redirect',
    },
    async (accessTocken, refereshTocken, profile, done) => {

        const currentUser = await User.findOne({ email: profile.emails[0].value })

        //User found in DB 
        if (currentUser) {
            return done(null, currentUser)
        }
        else {
            // creating new User 
            const newUser = await new User({
                email: profile.emails[0].value,
                username: profile.displayName,
                googleId: profile.id,
                role: 'user'
            }).save()

            if (newUser) {
                return done(null, newUser)
            }
        }
    }
))


passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})