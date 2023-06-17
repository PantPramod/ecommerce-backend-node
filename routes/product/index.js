const express = require('express');
const multer = require('multer');
const { getProducts, createProduct, getProductById, deleteProduct, updateProduct, deleteImage, bestSeller } = require('../../controller/productController');
const validateTokenAdmin = require('../../middleware/validateTokenHandlerAdmin');
const validator = require('../../middleware/validator')
const {productUpdateSchema} = require('../../helper/types')
const { ref, getDownloadURL, uploadBytes } = require("firebase/storage");
const storage = require('../../firebase/config')
const product = require('../../model/product');
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

router.post('/createproduct',multer().array("images", 5),validateTokenAdmin, createProduct)


// @desc: update Product by id
// @route: /api/product/update
// @method: PATCH
// @access: Protected

router.patch('/update',validator(productUpdateSchema),  validateTokenAdmin, updateProduct)


// @desc: Delete Product by id
// @route: /api/product/delete/:id
// @method: DELETE
// @access: Protected

router.delete('/delete/:id',validateTokenAdmin, deleteProduct)

// @desc: Delete Product image by id (image name)
// @route: /api/product/delete/image/:id
// @method: DELETE
// @access: Protected

router.delete('/delete/image/:id', validateTokenAdmin, deleteImage)


// @desc : Best Seller Product abstracted from orders top ten
// @route : /api/product/bestseller
// @method : GET
// @access : Public

router.get('/bestseller',bestSeller)


module.exports = router;