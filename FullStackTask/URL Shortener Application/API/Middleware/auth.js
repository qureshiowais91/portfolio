const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const authHeader = req.headers.authorization; // Assuming token is passed in the Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.substring(7); // Removing 'Bearer ' prefix from the token

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.body["id"] = decoded["id"];

        next();
    });

}


module.exports = { auth };