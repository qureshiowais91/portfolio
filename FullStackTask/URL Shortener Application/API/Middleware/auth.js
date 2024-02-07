function auth(req, res, next) {
    const token = req.headers.authorization; // Assuming token is passed in the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded; // Store the decoded payload in the request object
        next();
    });
}

module.exports = { auth };