const express = require('express');
const userRoutes = require('./user')
const productRoutes = require('./product')
const adminRoutes = require('./admin')
const router = express.Router();

router.use('/user',userRoutes)

router.use('/product', productRoutes)

router.use('/admin', adminRoutes)

module.exports = router;