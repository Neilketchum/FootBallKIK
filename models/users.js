const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
        unique: true,
        default: '',

    },
    email: {
        type: String,
        unique: true,
        default: ""
    },
    password: {
        type: String,
        default: ''
    },
    userImage: {
        type: String,
        default: 'default.png'
    },
    facebook: { type: String, default: '' },
    fbTokens: Array,
    google: { type: String, default: '' },
    googleTokens: Array
});
module.exports = mongoose.model('User', userSchema)
