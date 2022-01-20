const mongoose = require('mongoose')

let transactionSchema = mongoose.Schema({
    historyVoucherTopup : {
        gameName : { type : String, require : [true, 'Nama Game Harus di isi']},
        category : { type : String, require : [true, 'Kategori harus di isi']},
        thumbnail : { type : String },
        coinName : { type : String, require : [true, 'Nama koin harus di isi']},
        coinQuantity : { type : String, require : [true, 'Nama koin harus di isi']},
        price : { type : Number},
    },

    historyPayment : {
        name : { type : String, require : [true, 'Nama Harus di isi']},
        type : { type : String, require : [true, 'Tipe Pembayaran Harus di isi']},
        bankName : { type : String, require : [true, 'Nama Bank Harus di isi']},
        noRekening : { type : String, require : [true, 'Nomor Harus di isi']},
    },

    name : {
        type : String,
        require : [true, "Nama harus di isi"],
        maxlength : [225, "Panjang nama harus antara 3 - 225 karakter"],
        minLength : [3, "Minimal nama Harus antara 3 - 225 Karakter"],
    },

    accountUser : {
        type : String,
        require : [true, "Nama akun Harus di isi"],
        maxlength : [225, "Panjang nama harus 3 - 225 karakter"],
        minLength : [3, "Minimal nama harus 3 - 225 karakter"]
    },

    tax : {
        type : Number,
        default : 0
    },

    value : {
        type : Number,
        default : 0
    },

    status : {
        type : String,
        enum : ['pending', 'success', 'failed'],
        default : 'pending'
    },

    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },

    historyUser : {
        name : { type : String, require : [true, 'Nama Player Harus di isi']},
        phoneNumber: {
            type: String,
            require: [true, "Nama akun Harus di isi"],
            maxlength: [13, "Panjang nama antara 9 - 13 karakter"],
            minLength: [9, " Panjang nama harus antara 9 - 13 karakter"]
        }
    },

    category :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)