const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        unique: true
    },
    contact: {
        type: String,
        required: [true, "Contact is Required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        trim: true
    }
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

const user = mongoose.model('user', userSchema)

module.exports = user