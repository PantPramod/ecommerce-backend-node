const express = require('express');
const { addressSchema } = require('../../helper/types');
const { saveAddress, getAllAddressOfUser } = require('../../controller/addressController');
const router = express.Router();
const validator = require('../../middleware/validator');
const validateToken = require('../../middleware/validateTokenHandler');


// @desc : to save address
// @route : "/api/address/save"
// @metod : POST
//Access : Protected

router.post('/save', validator(addressSchema),validateToken, saveAddress)


// @desc : to get all addresses of a user
// @route : "/api/address/getaddressofuser"
// @metod : GET
//Access : Protected

router.get('/getaddressesofuser',validateToken, getAllAddressOfUser)


module.exports = router;