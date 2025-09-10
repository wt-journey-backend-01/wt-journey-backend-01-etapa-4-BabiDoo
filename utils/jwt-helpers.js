const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET ||
  process.env.JWT_SECRET || // compatibilidade
  "dev_access_secret_only_for_local_tests";

const REFRESH_SECRET =
  process.env.REFRESH_TOKEN_SECRET ||
  process.env.JWT_SECRET || // compatibilidade
  "dev_refresh_secret_only_for_local_tests";

function jwtTokens({ id, email }) {
  const accessToken = jwt.sign({ sub: id, email, type: "access" }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ sub: id, email, type: "refresh" }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

function verifyAccess(token) {
  return jwt.verify(token, ACCESS_SECRET);
}
function verifyRefresh(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

module.exports = { jwtTokens, verifyAccess, verifyRefresh };
