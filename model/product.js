const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Product Price is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product Description is required"],
        trim: true
    },
    images: [String],
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    })


module.exports = mongoose.model('product', productSchema)

