const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const asyncHandler = require('../middleware/asyncHandler.js');
const ErrorResponse = require("../utils/errorResponse.js");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    return new ErrorResponse('User with this username or email already exists.', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
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

  res.status(200).json({ token, email: user.email,isAuthenticated:true});
};

module.exports = {
  registerUser: asyncHandler(registerUser),
  loginUser: asyncHandler(loginUser),
};
