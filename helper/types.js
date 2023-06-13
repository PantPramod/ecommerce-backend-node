const Joi = require('joi');

const registerationSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    contact: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})


const loginSchema= Joi.object({
    email : Joi.string().email().trim().required(),
    password : Joi.string().required()
})


const productUpdateSchema= Joi.object({
    id:Joi.string().trim().required(),
    title:Joi.string().trim(),
    price:Joi.number(),
    description:Joi.string().trim(),   
})
module.exports={
    registerationSchema,
    loginSchema,
    productUpdateSchema
}