const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || '';
    const [scheme, token] = authHeader.split(' ');
    if ((token == null) && (scheme !== 'Bearer')) {
      return res.status(401).json({ error: 'Null token' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error) return res.status(403).json({ error: error.message });
        req.user = user;
        next();
    })
} 

module.exports = authenticateToken;