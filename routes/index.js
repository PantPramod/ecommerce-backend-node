const express = require('express');
const userRoutes = require('./user')
const productRoutes = require('./product')
const adminRoutes = require('./admin')
const cartRoutes = require('./cart')
const orderRoutes = require('./order')
const addressRoutes = require('./address')
const paymentRoutes = require('./payment')
const router = express.Router();

router.use('/user',userRoutes)

router.use('/product', productRoutes)

router.use('/admin', adminRoutes)

router.use('/cart', cartRoutes)

router.use('/order', orderRoutes)

router.use('/address', addressRoutes)

router.use('/payment', paymentRoutes)

module.exports = router;
