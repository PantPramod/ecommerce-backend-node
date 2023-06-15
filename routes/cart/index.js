const express = require('express');
const { getCartData, addItemToCart, removeItemFromCart, updateCart } = require('../../controller/cartController');
const validateToken = require('../../middleware/validateTokenHandler');
const validator = require('../../middleware/validator');
const { addCartSchema, updateCartSchema } = require('../../helper/types');
const router = express.Router()


// @desc: get cart Items by id (userId) 
// @route: /api/cart/getcartdata
// @method: GET
// @access: Protected

router.get('/getcartdata', validateToken, getCartData)  


// @desc: Add Item to cart  
// @route: /api/cart/getcartdata/:id
// @method: POST
// @access: Protected

router.post('/addtocart', validator(addCartSchema), validateToken, addItemToCart)  


// @desc : remove Item from cart 
// @route : api/cart/deletet/:id
// @method : DELETE
// @access : Protected

router.delete('/delete/:id', validateToken, removeItemFromCart)  


// @desc : remove Item from cart 
// @route : api/cart/update
// @method : PATCH
// @access : Protected

router.patch('/update',validator(updateCartSchema), validateToken, updateCart)  


module.exports = router