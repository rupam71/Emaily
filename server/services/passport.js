const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')


//serializeUser user => id
passport.serializeUser((user,done) => {
    done(null, user.id)
})


//deserializeUser id => user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
})

passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret : keys.googleClientSecret,
    callbackURL: '/auth/google/callback'    //where user will go after login
    }, (accessToken, refreshToken, profile, done) => {
        // console.log('accessToken: ', accessToken)   // our beloved auth
        // console.log('refreshToken: ', refreshToken) //if we change accessToken
        // console.log('profile: ', profile)   //actual object
        User.findOne({googleId:profile.id})
            .then((existingUser)=>{
                if(existingUser) {
                    //already have a record with this id
                    done(null, existingUser)    //done(err, res)
                } else {
                    // new User
                    new User({ googleId: profile.id })
                        .save()
                        .then(user=> done(null, user))
                }

            })
    })
)

// it will not return anything
// so no export.modules
//we just want
//this file will be exicutes
//thats all