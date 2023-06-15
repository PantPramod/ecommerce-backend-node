const order = require('../model/order')
const orderItem = require('../model/orderItem')
const cart = require('../model/cartItem')
const asyncHandler = require('express-async-handler')
const product = require('../model/product')

const getAllOrders = asyncHandler(async (req, res) => {
    const allOrders = await order.find().populate([{ path: 'userId', select: '_id email name contact' }]);
    res.send(allOrders)
})

// for normal user     
const getOrderItemsByOrderId = asyncHandler(async (req, res) => {
   const resp= await orderItem.find({orderId:req.params.id}).populate([{ path: 'orderId' }, { path: 'productId' }])
    res.send(resp)
})



const placeOrder = asyncHandler(async (req, res) => {
    const { totalAmount } = req.body
                                      
    
    const newOrder = await order.create({
        userId: req.user.id,
        totalAmount,
    })

    if (!newOrder._id ){
        res.status(500)
        throw Error("Something went wrong")
    }
    
    const cartdata =  await cart.find({userId:req.user.id})

     const mappedCartData = cartdata.map((ci)=>{
        return { 
            productId: ci.productId,
            quantity:ci.quantity,
            price:ci.price, 
            orderId:newOrder._id
        }
    })    
     
    await orderItem.insertMany(mappedCartData)

    await cart.deleteMany({userId:req.user.id})

    res.send(newOrder)

})



module.exports = {
    getAllOrders,
    getOrderItemsByOrderId,
    placeOrder
}