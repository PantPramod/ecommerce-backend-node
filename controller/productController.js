const asyncHandler = require('express-async-handler')
const product = require('../model/product')

const createProduct=asyncHandler(async(req, res)=>{
     const newProduct = await product.create(req.body)
     res.send(newProduct)       
})

const getProducts=asyncHandler(async(req, res)=>{
   const allProducts =  await product.find({});
   res.send(allProducts)
})

const getProductById=asyncHandler(async(req, res)=>{
    const deatiledProduct = await product.findById(req.params.id)
    res.send(deatiledProduct)
})

const deleteProduct=asyncHandler(async(req, res)=>{
   const del = await product.deleteOne({id:req.params.id})   
   res.send(del)
})

const updateProduct = asyncHandler(async(req, res)=>{
    const {id, title, description, price} = req.body
    const resp =await product.findByIdAndUpdate(id, {title, description, price},{
        returnOriginal: false
      }) 
    res.send(resp)
})


module.exports={
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}