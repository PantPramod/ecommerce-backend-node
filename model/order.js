const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default: () => Date.now()
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required: [true, "user Id is required"]
    },
    totalAmount:{
        type:Number,
        required: [true, "total amount is required"]
    },
    isDelivered:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

module.exports = mongoose.model('order', orderSchema)