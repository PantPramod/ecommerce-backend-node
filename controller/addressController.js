const asyncHandler = require('express-async-handler');
const address  = require('../model/address')



const saveAddress =asyncHandler(async(req, res)=>{
    const obj = {...req.body, userId:req.user.id}
     const savedAddress = await address.create(obj);
     res.send({addressId:savedAddress._id})  
}) 

const getAllAddressOfUser= asyncHandler(async(req, res)=>{
    const addresses = await address.find({userId:req.user.id});
    res.send(addresses)
})

module.exports={
    saveAddress,
    getAllAddressOfUser
}