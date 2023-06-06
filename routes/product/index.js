const express = require('express');


const router = express.Router();

// @desc: Get All Products
// @route: /api/product/getallproducts
// @method: GET
// @access: Public  

router.get('/getallproducts',(req, res)=>{
    res.send("get all products ")
})

// @desc: Get All Products
// @route: /api/product/${id}
// @method: GET
// @access: Public  

router.get('/:id', (re, res)=>{
    res.send(re.query.id)
})

module.exports = router;