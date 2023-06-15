const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref:"product",
        required: [true, "Product Id is required"]
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"user",
        required: [true, "User Id is required"]
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity must be greater than or equal to one"],
        max: [50, 'Quantity cannot exceed fifty'],
    },
    price:Number
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

module.exports = mongoose.model('cartItem', cartItemSchema)