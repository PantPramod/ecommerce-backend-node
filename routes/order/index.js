const express= require('express');
const { getAllOrders, getOrderItemsByOrderId,  placeOrder, getAllOrdersOfUser } = require('../../controller/orderController');
const validateTokenAdmin = require('../../middleware/validateTokenHandlerAdmin');
const validateToken = require('../../middleware/validateTokenHandler');

const router = express.Router();


// @desc : To see all the orders
// @route: /api/order/getallorders
// @method: GET
// @access: Protected (for admin use only)

router.get('/getallorders', validateTokenAdmin, getAllOrders)


// @desc : To see all the order items for user by orderItem id 
// @route: /api/order/getallorders
// @method: GET
// @access: Protected 

router.get('/getorderitems/:id',  getOrderItemsByOrderId )


// @desc : To see all the order items for user by user id 
// @route: /api/order/getallorders
// @method: GET
// @access: Protected 

router.get('/getItems',validateToken ,  getAllOrdersOfUser )






// @desc : To see all the order items for user
// @route: /api/order/placeorder
// @method: POST
// @access: Protected

router.post('/placeorder', validateToken, placeOrder)


module.exports=router