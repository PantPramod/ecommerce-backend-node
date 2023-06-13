const express = require('express');
const { getProducts, createProduct, getProductById, deleteProduct, updateProduct } = require('../../controller/productController');
const validateTokenAdmin = require('../../middleware/validateTokenHandlerAdmin');


const router = express.Router();

// @desc: Get All Products
// @route: /api/product/getallproducts
// @method: GET
// @access: Public  

router.get('/getallproducts',getProducts)

// @desc: Get All Products
// @route: /api/getdetailedproduct/product/${id}
// @method: GET
// @access: Public  

router.get('/getdetailedproduct/:id', getProductById)

// @desc: Create Products
// @route: /api/product/createproduct
// @method: POST
// @access: Protrcted

router.post('/createproduct',validateTokenAdmin, createProduct)


// @desc: update Product by id
// @route: /api/product/update
// @method: PATCH
// @access: Protected

router.patch('/update',validateTokenAdmin, updateProduct)


// @desc: Delete Product by id
// @route: /api/product/delete/:id
// @method: POST
// @access: Protected

router.delete('/delete/:id',validateTokenAdmin, deleteProduct)


module.exports = router;