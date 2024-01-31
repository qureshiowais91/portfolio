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

  const userRegisteredEvent = {
    eventType: USER_EVENTS.USER_REGISTERED,
    eventData: { username, firstName, lastName, encryptedPassword }
  };

  const userCreated = await User.create(userRegisteredEvent["eventData"]);
  res.status(201).json({ message: 'User registered successfully', userCreated });

  const activationToken = generateRandomCode();

  const email = req.body.email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    html: `${activationToken}`,
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




module.exports = {
  loginUser,
  registerUser,

};
