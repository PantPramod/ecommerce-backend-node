const express = require('express');
const multer = require('multer');
const { getProducts, createProduct, getProductById, deleteProduct, updateProduct } = require('../../controller/productController');
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
// @method: POST
// @access: Protected

router.delete('/delete/:id',validateTokenAdmin, deleteProduct)

router.use(express.urlencoded({ limit: '5mb', extended: true }));

router.post('/uploadimage',multer().array("images", 5), async(req, res)=>{
    const urls=[]
    for(f in req.files) {
        const file = req.files[f];
        const timeStamp = Date.now();
        const nt = file.originalname.split(".");
        const name = nt[0];
        const type = nt[1];

        const filename = name + "_" + timeStamp + "." + type;
        const imageRef = ref(storage,  "/" + filename);
        const metaData = {
            contentType : file.mimetype
        }

        try{
            const snapshot = await uploadBytes(imageRef, file.buffer, metaData);
            const url = await getDownloadURL(snapshot.ref);
            urls.push(url);
        }catch(e){
            res.status(400).send({
                error : e
            })
        };
    
    }      
    
    res.send(urls)
    
})

module.exports = router;