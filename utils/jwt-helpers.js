
const jwt = require('jsonwebtoken');

const jwtTokens = ({ id, nome, email }) => {
   const user = { id, nome, email };
   const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
   const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'});
   return ({ accessToken, refreshToken, user});
}

module.exports = jwtTokens;