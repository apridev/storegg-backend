const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    email : {
        type: String,
        require: [true, 'Email Harus di isi']
    },

    name : {
        type: String,
        require: [true, 'Nama Harus di isi']
    },

    password : {
        type: String,
        require: [true, 'Password Harus di isi']
    },

    role : {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },

    status : {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },

    phoneNumber : {
        type: String,
        require: [true, 'Nomor Telpon Harus di isi']
    },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)