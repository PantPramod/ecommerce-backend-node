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


const loginSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required()
})


const productUpdateSchema = Joi.object({
    id: Joi.string().trim().required(),
    title: Joi.string().trim(),
    price: Joi.number(),
    description: Joi.string().trim(),
    stock: Joi.number(),
    discount: Joi.number(),
    category: Joi.string().trim()
})

const addCartSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number()

})

const updateCartSchema= Joi.object({
    id:Joi.string().required(),
    quantity:Joi.number().required(),
    price:Joi.number().required()
})

const addressSchema= Joi.object({

    isDefault: Joi.boolean(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    zip: Joi.number().required(),
    state: Joi.string().trim().required(),
    country: Joi.string().trim().required()
})

module.exports = {
    registerationSchema,
    loginSchema,
    productUpdateSchema,
    addCartSchema,
    updateCartSchema,
    addressSchema
}