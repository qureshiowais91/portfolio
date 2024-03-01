const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const asyncHandler = require('../middleware/asyncHandler.js');
const ErrorResponse = require("../utils/errorResponse.js");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(201).json({ message: 'User Alread Exist ', status: true })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ message: 'User registered successfully.', status: true });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return new ErrorResponse('Invalid credentials.', 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return new ErrorResponse('Invalid credentials.', 401);
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token, email: user.email, isAuthenticated: true });
};

module.exports = {
  registerUser: asyncHandler(registerUser),
  loginUser: asyncHandler(loginUser),
};
