
const asyncHandler = require('express-async-handler');
const cart = require('../model/cartItem')
const product = require('../model/product')



const getCartData = asyncHandler(async (req, res) => {

    const cartResult = await cart.find({ userId: req.user.id }).populate([{ path: 'productId', select: 'title images price' }, { path: 'userId', select: 'email name contact' }])
    res.send(cartResult)
})

const addItemToCart = asyncHandler(async (req, res) => {

    const { productId, quantity } = req.body

    const productdetails =await product.findById(productId)
    
    console.log(productdetails)

    const isProductAdded = await cart.find({ productId, userId: req.user.id })
    if (isProductAdded.length >= 1) {
        res.status(400);
        throw new Error("Item already added to cart")
    }
  
    const newItem = await cart.create({ productId, quantity, userId: req.user.id, price: quantity * productdetails.price })
    res.send(newItem)
})

const removeItemFromCart = asyncHandler(async (req, res) => {
    await cart.findByIdAndDelete(req.params.id)
    res.status(200).send("Cart Item Deleted")
})

const updateCart = asyncHandler(async (req, res) => {
    const { id, quantity, price } = req.body
    const resp = await cart.findByIdAndUpdate(id, { quantity, price }, {
        returnOriginal: false
    })
    res.send(resp)
})

module.exports = { getCartData, addItemToCart, removeItemFromCart, updateCart }