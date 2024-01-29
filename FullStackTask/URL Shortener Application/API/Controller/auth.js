const { userSchema } = require("../Model/UserModel");

const login = async (req, res, next) => {
    res.status(200).json({ "learn": "test" })
}


module.exports = {
    login
}