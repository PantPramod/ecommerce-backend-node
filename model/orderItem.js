const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref:"product",
        required: [true, "Product Id is required"]
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity must be greater than or equal to one"],
        max: [50, 'Quantity cannot exceed fifty'],
    },
    orderId:{
        type: mongoose.Types.ObjectId,
        ref:"order",
        required: [true, "Order Id is required"]
    },
    price:{
        type:Number,
        required: [true, "price is required"]
    }
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

module.exports = mongoose.model('orderItem', orderItemSchema)