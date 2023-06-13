const user = require('../model/user');
const asyncHandler = require('express-async-handler')
const Joi = require('joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const schema = Joi.object({
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


// -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// -> { value: {}, error: '"username" is required' }


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await user.find();
  res.send(users)
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await user.findById({ id: req.params.id });
  res.send(user)
})

const createUser = asyncHandler(async (req, res) => {
  const { email, password, name, contact } = req.body



  const schemaresponse = schema.validate(req.body);
  //   console.log(schemaresponse);
  if (schemaresponse.error) {
    res.status(400)
    throw new Error(schemaresponse.error.message)
  }
  const isAvailable = await user.findOne({ email })
  if (isAvailable) {
    res.status(400)
    throw new Error("User already registered")
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword);

  const newUser = await user.create({ email, password: hashedPassword, name, contact })
  console.log("User created successfully")
  if (newUser) {
    res.status(201).send({ id: newUser._id, email: newUser.email })
  } else {
    res.status(400)
    throw new Error("User not created")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(400)
    throw new Error("All Fields are required")
  }
  const isUserExist = await user.findOne({ email });

  if (isUserExist && (await bcrypt.compare(password, isUserExist.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          username: isUserExist.name,
          email: isUserExist.email,
          id: isUserExist._id
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    )
    res.status(200).json({ accesstoken })
  } else {
    res.status(401);
    throw new Error("email or password is not valid")
  }
})

const myAccount = asyncHandler(async (req, res) => {
  const userInfo = await user.findById(req.user.id)
  const { name, email, contact } = userInfo
  res.send({ name, email, contact })
})

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  myAccount
}
