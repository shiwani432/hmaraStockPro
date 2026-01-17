const jwt = require('jsonwebtoken');
const SECRET_KEY = "my_super_secret_key_123";

module.exports = (req, res, next) => {
    // Token ko header se nikalna
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        req.user = decoded;
        next(); // Sab sahi hai, aage badho
    });
};