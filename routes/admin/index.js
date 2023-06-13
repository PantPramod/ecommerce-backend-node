const express = require('express');
const loginAdmin = require('../../controller/adminController');

const router = express.Router();

// @desc: login for admin
// @route: /api/admin/login
// @method: post
// @access: Public  

router.post('/login',loginAdmin)

module.exports = router