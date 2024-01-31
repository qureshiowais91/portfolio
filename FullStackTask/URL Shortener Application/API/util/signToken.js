const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    };

    const secret = process.env.SECRET;
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
}

module.exports = { generateAccessToken }