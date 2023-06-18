const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: [true, "user Id is required"]
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "First name is required"],
    },
    address: {
        type: String,
        required: [true, "address is required"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "city is required"],
        trim: true
    },
    zip: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    })


module.exports = mongoose.model('address', addressSchema)

