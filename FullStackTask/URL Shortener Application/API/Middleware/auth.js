const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.headers.authorization; // Assuming token is passed in the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    console.log(token)
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        req.user = decoded;
        console.log("1",decoded)
        next();
    });
}

module.exports = { auth };