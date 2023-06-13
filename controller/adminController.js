const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (email === process.env.ADMIN_USERNAME && password === process.env.PASSWORD) {
        const accesstoken = jwt.sign(
            { user: { type: "admin", email } },
            process.env.ACCESS_TOKEN_SECRET_ADMIN,
            { expiresIn: "60m" })

        res.status(200).json({ accesstoken })
    } else {
        res.status(401);
        throw new Error("Wrong Email or password!")
    }

})


module.exports = loginAdmin