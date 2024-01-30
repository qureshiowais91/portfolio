// const Redis = require('ioredis');
// const redis = new Redis();
// const argon2 = require('argon2');


// // User Registration 
async function registerUser(req, res) {
  // Perform registration logic
  const { username, firstName, lastName, password, activationToken } = req.body;

  // Publish UserRegistered event
  const userRegisteredEvent = {
    eventType: 'UserRegistered',
    eventData: { username, firstName, lastName, password, activationToken }
  };

  await publishEvent('userEvent', userRegisteredEvent);
  res.json({ message: 'User registered successfully' });
}

async function loginUser(req, res) {
  // Perform login logic
  // const { username } = req.body;
  // const userLoggedInEvent = {
  //   eventType: 'UserLoggedIn',
  //   eventData: { username },
  // };
  // await publishEvent('userEvent', userLoggedInEvent);
  res.json({ message: 'User logged in successfully' });
}

// // Account Activation
// async function activateAccount(req, res) {
//   // Perform account activation logic
//   const { activationToken } = req.params;

//   // Publish AccountActivated event
//   const accountActivatedEvent = {
//     eventType: 'AccountActivated',
//     eventData: { activationToken },
//   };
//   await publishEvent('userEvent', accountActivatedEvent);

//   res.json({ message: 'Account activated successfully' });
// }

// // User Login

// // ... Other user-related controller functions

// // Helper function to publish events to Redis
async function publishEvent(channel, event) {
  const message = JSON.stringify(event);
  await redis.publish(channel, message);
}

module.exports = {
  loginUser,
  registerUser
};
