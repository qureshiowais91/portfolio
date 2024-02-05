const { Errorhandler } = require("../util/ErrorHandle");
const { USER_EVENTS } = require("../Event/EventTypes");
const { generateAccessToken } = require("../util/signToken");
const User = require("../Model/UserModel");
const bcy = require("bcryptjs");
const { generateRandomCode } = require("../util/genrateRandome")
const nodemailer = require("nodemailer");

async function registerUser(req, res) {
  const { username, firstName, lastName, password } = req.body;

  const salt = await bcy.genSalt(10);
  const encryptedPassword = await bcy.hash(password, salt);
  const activationToken = generateRandomCode();

  const userRegisteredEvent = {
    eventType: USER_EVENTS.USER_REGISTERED,
    eventData: { username, firstName, lastName, encryptedPassword, activationToken }
  };

  const userCreated = await User.create(userRegisteredEvent["eventData"]);
  res.status(201).json({ message: 'User registered successfully', userRegisteredEvent });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userRegisteredEvent.eventData.username,
    subject: 'Activation Code',
    html: `127.0.0.1/account/${userRegisteredEvent.eventData.activationToken}`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  const userData = await User.find({ username });
  console.log(userData)
  if (!(userData[0].activationToken === 'true')) {
    throw new Errorhandler(USER_EVENTS.LOGIN_ATTEMPT_FAILED, "Account Not Activated Check Your Inbox", 200)
  }

  const match = await bcy.compare(password, userData[0].encryptedPassword);

  if (!match) {
    throw new Errorhandler(USER_EVENTS.LOGIN_ATTEMPT_FAILED, "Email And Password Does Not Match", 200)
  }

  const token = generateAccessToken(userData);

  const userLoggedInEvent = {
    eventType: USER_EVENTS.USER_LOGGED_IN,
    eventData: token
  };

  res.status(200).json({ message: 'User logged in successfully', userLoggedInEvent });
}

async function passwordReset(req, res, next) {
  const { username, password } = req.body;

  const salt = await bcy.genSalt(10);
  const encryptedPassword = await bcy.hash(password, salt);

  const filter = { username: username };
  const update = { encryptedPassword: encryptedPassword }

  const userData = await User.findOneAndUpdate(filter, update, { new: true });

  const PasswordResetEvent = {
    eventType: USER_EVENTS.PASSWORD_RESET,
    eventData: { userData }
  }

  res.status(200).json({ message: 'Password Reset', PasswordResetEvent });
}

async function activateAccount(req, res) {
  const { activationToken } = req.body;

  if (!activationToken) {
    throw new Errorhandler(USER_EVENTS.ACCOUNT_ACTIVATION_FAILED, "Activation Code Not Found", 404)
  }

  const filter = { activationToken: activationToken };
  const update = { activationToken: true };

  const userAccount = await User.findOneAndUpdate(filter, update, { new: true });

  if (!userAccount) { throw new Errorhandler(USER_EVENTS.ACCOUNT_ACTIVATION_FAILED, "Account Not Found", 404) }

  res.status(200).json({ message: 'User Account Activated', userAccount })
}


module.exports = {
  loginUser,
  registerUser,
  activateAccount,
  passwordReset
};
