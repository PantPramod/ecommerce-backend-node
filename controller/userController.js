const user = require('../model/user');
const asyncHandler = require('express-async-handler')
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    contact:Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})


// -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// -> { value: {}, error: '"username" is required' }


const getAllUsers=asyncHandler(async(req, res)=>{
         const users = await user.find();
         res.send(users)   
})

const getUserById=asyncHandler(async(req, res)=>{
    const user = await user.findById({id:req.params.id});
    res.send(user)   
})

const createUser = asyncHandler(async(req, res)=>{
    const {email, password, name, contact}  = req.body
  

    
  const schemaresponse= schema.validate(req.body);
//   console.log(schemaresponse);
  if(schemaresponse.error){
    res.status(400)
    throw new Error(schemaresponse.error.message)
  }
    const newUser = await user.create(req.body)
    res.status(201).send(newUser)
  

})

module.exports={
    getAllUsers,
    getUserById,
    createUser
}
