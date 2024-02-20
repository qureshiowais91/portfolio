const jwt = require('jsonwebtoken');
const { Errorhandler } = require("../util/ErrorHandle");

async function auth(req, res, next) {

    const authHeader = req.headers.authorization; // Assuming token is passed in the Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Errorhandler('No token provided', 304);
    }

    const token = authHeader.substring(7); // Removing 'Bearer ' prefix from the token

    const decode = await jwt.verify(token, process.env.SECRET);
    if (!decode) {
        throw new Errorhandler('Invalid Token', 304);
    }
    // console.log(decode)
    req.user = decode
    // console.log(req.id);


    next();
}


module.exports = { auth };