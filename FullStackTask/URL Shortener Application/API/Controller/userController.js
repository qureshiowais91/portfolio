const { Errorhandler } = require("../util/ErrorHandle");
const { USER_EVENTS } = require("../Event/EventTypes");
const { generateAccessToken } = require("../util/signToken");
const User = require("../Model/UserModel");
const bcy = require("bcryptjs");
const { generateRandomCode } = require("../util/genrateRandome")
const nodemailer = require("nodemailer");


async function registerUser(req, res) {
  const { email, firstName, lastName, password } = req.body;

  const salt = await bcy.genSalt(10);
  const encryptedPassword = await bcy.hash(password, salt);
  const activationToken = generateRandomCode();

  const userRegisteredEvent = {
    eventType: USER_EVENTS.USER_REGISTERED,
    eventData: { email, firstName, lastName, encryptedPassword, activationToken }
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
    to: userRegisteredEvent.eventData.email,
    subject: 'Activation Code',
    html: `https://urlshort-65ao.onrender.com/user/activate?activationToken=${userRegisteredEvent.eventData.activationToken}`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const userData = await User.find({ email });
  if (!(userData[0].activationToken === 'true')) {
    throw new Errorhandler(USER_EVENTS.LOGIN_ATTEMPT_FAILED, "Account Not Activated Check Your Inbox", 200)
  }

  const match = await bcy.compare(password, userData[0].encryptedPassword);

  if (!match) {
    throw new Errorhandler(USER_EVENTS.LOGIN_ATTEMPT_FAILED, "Email And Password Does Not Match", 200)
  }
  const token = generateAccessToken(userData[0]);
  
  const userLoggedInEvent = {
    eventType: USER_EVENTS.USER_LOGGED_IN,
    eventData: token
  };

  res.status(200).json({ message: 'User logged in successfully', userLoggedInEvent });
}

async function passwordReset(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcy.genSalt(10);
  const encryptedPassword = await bcy.hash(password, salt);

  const filter = { email: email };
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


async function profile(req, res) {
  const user = req.user;
  console.log(user)
  if (!user.id) {
    throw new Errorhandler(USER_EVENTS.ACCOUNT_DETAILS_REQUESTED, "Account Id Needed", 304);
  }

  const userAccount = await User.findById(user.id);

  if (!userAccount) { throw new Errorhandler(USER_EVENTS.ACCOUNT_DETAILS_REQUESTED, "Account Not Found", 404) }

  res.status(200).json({ message: 'User Account Found', userAccount });
}

module.exports = {
  loginUser,
  registerUser,
  activateAccount,
  passwordReset,
  profile
};
