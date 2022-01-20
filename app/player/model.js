const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const HASH_ROUND = 10


let playerSchema = mongoose.Schema({
    email : {
        type: String,
        require: [true, 'Email Harus di isi']
    },

    name : {
        type: String,
        require: [true, 'Nama Harus di isi'],
        maxlength : [225, "Panjang nama harus antara 3 - 225 karakter"],
        minLength : [3, "Minimal nama Harus antara 3 - 225 Karakter"],
    },

    username : {
        type: String,
        require: [true, 'Nama Harus di isi'],
        maxlength : [225, "Panjang nama harus antara 3 - 225 karakter"],
        minLength : [3, "Minimal nama Harus antara 3 - 225 Karakter"],
    },

    password : {
        type: String,
        require: [true, 'Password Harus di isi'],
        maxlength : [225, "Panjang nama harus antara 3 - 225 karakter"],
    },

    role : {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    status : {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },

    avatar : {
        type: String
    },

    fileName: {
        type: String,
    },

    phoneNumber : {
        type: String,
        require: [true, 'Nomor Telpon Harus di isi'],
        maxlength : [13, "Panjang nama harus antara 9 - 13 karakter"],
        minLength : [9, "Minimal nama Harus antara 9 - 13 Karakter"],
    },

    favorite :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

}, { timestamps: true })

playerSchema.path('email').validate(async function (value){
    try {
        const count = await this.model('Player').countDocuments({ email : value })
        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`)

playerSchema.pre('save', function (next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player', playerSchema)