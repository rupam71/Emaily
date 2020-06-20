const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const {Schema} = mongoose


const userSchema = new Schema({
    googleId: {
        type: String
    },
    name: String
})


mongoose.model('users', userSchema);

