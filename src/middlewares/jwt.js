const jwt = require("jsonwebtoken")

const isAuthentication = async (req, res, next) =>{
    
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(token, "secret");

    req.user = decoded; // 🔥 important
    next();

}

module.exports = {isAuthentication}