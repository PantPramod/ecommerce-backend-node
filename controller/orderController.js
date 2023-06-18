const order = require('../model/order')
const orderItem = require('../model/orderItem')
const cart = require('../model/cartItem')
const asyncHandler = require('express-async-handler')
const product = require('../model/product')
const { default: mongoose } = require('mongoose')

const getAllOrders = asyncHandler(async (req, res) => {
    const allOrders = await order.find().populate([{ path: 'userId', select: '_id email name contact' }]);
    res.send(allOrders)
})

const getAllOrdersOfUser = asyncHandler(async (req, res) => {

    console.log(req.user.id)

    const orders = await order.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(req.user.id) }
        },

    ]).exec()

    const orderIds = orders.map(order => order._id);

    const detailedOrderItems = await orderItem.find({ orderId: { $in: orderIds } }).populate([ { path: 'productId' }])

    res.send(detailedOrderItems)

})

// for normal user     
const getOrderItemsByOrderId = asyncHandler(async (req, res) => {
    const resp = await orderItem.find({ orderId: req.params.id }).populate([{ path: 'orderId' }, { path: 'productId' }])
    res.send(resp)
})




const placeOrder = asyncHandler(async (req, res) => {
    const { totalAmount, addressId } = req.body
   
    if(!totalAmount && ! addressId){
        res.status(400)
        throw new Error("totalAmount and addressId is required")
    }

    const newOrder = await order.create({
        userId: req.user.id,
        addressId,
        totalAmount,
    })

    if (!newOrder._id) {
        res.status(500)
        throw Error("Something went wrong")
    }

    const cartdata = await cart.find({ userId: req.user.id })

    const mappedCartData = cartdata.map((ci) => {
        return {
            productId: ci.productId,
            quantity: ci.quantity,
            price: ci.price,
            orderId: newOrder._id
        }
    })

    await orderItem.insertMany(mappedCartData)

    await cart.deleteMany({ userId: req.user.id })

    res.send(newOrder)

})



module.exports = {
    getAllOrders,
    getOrderItemsByOrderId,
    placeOrder,
    getAllOrdersOfUser
}