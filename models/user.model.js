const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username'],
    },
    email : {
        type: String,
        required: [true, 'Please enter email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
},
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User