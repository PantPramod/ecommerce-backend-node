const express = require('express');
const {getAllUsers, getUserById, createUser} = require('../../controller/userController')

const router = express.Router();

// @desc: Get All Users
// @route: /api/user/getAllusers
// @method: GET
// @access: Protected    

router.get('/getallusers',getAllUsers)

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

router.post('/', createUser)

module.exports = router;