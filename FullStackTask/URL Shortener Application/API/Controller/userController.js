const { Errorhandler } = require("../util/ErrorHandle");
const { USER_EVENTS, URL_EVENTS } = require("../Event/EventTypes");
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
  res.status(201).json({ message: 'User registered successfully', userCreated });

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

  const match = await bcy.compare(password, userData[0].encryptedPassword);

  if (!match) {
    throw new Errorhandler(USER_EVENTS.LOGIN_ATTEMPT_FAILED, "Email And Password Does Not Match", 200)
  }

  const token = generateAccessToken(userData);

  const userLoggedInEvent = {
    eventType: USER_EVENTS.USER_LOGGED_IN,
    eventData: { token }
  };

  res.status(200).json({ message: 'User logged in successfully', userLoggedInEvent });
}

async function activateAccount(req, res) {
  const { activationToken } = req.body;
  
  const filter = { activationToken: activationToken };
  const update = { activationToken: true };

  const userAccount = await User.findOneAndUpdate(filter, update, { new: true });
  res.status(200).json({ message: 'User Account Activated', userAccount })
}


module.exports = {
  loginUser,
  registerUser,
  activateAccount
};
