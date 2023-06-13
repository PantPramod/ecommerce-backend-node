const express = require('express');
const {getAllUsers, getUserById, createUser, loginUser, myAccount} = require('../../controller/userController');
const validateToken = require('../../middleware/validateTokenHandler');
const validator = require('../../middleware/validator')
const {registerationSchema, loginSchema} = require('../../helper/types')
const router = express.Router();


// @desc: User Details
// @route: /api/user/myaccount
// @method: GET
// @params: Bearer token in header
// @access: Protected

router.get('/myaccount',validateToken , myAccount)


// @desc: Get All Users
// @route: /api/user/getAllusers
// @method: GET
// @access: Protected    

router.get('/getallusers',getAllUsers)



// @desc: login user
// @route: /api/user/login
// @method: POST
// @params: email, password
// @access: Public

router.post('/login',validator(loginSchema), loginUser)


// @desc: Get Specidic User Detail
// @route: /api/user/${id}
// @method: GET
// @params: id
// @access: Protected


router.get('/:id', getUserById)

// @desc: Create new user
// @route: /api/user/
// @method: POST
// @params: name, email, password, contact
// @access: Public

router.post('/',validator(registerationSchema) , createUser)







module.exports = router;