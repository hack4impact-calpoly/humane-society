const jwt = require('jsonwebtoken');
require('dotenv').config();

// makes login tokens
const Token = function (token) {
    console.log("verifying")
  console.log("token is: " + token)
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  return decoded;
};

const makeToken = function (data) {
  const token = jwt.sign(
    data,
    process.env.JWT_KEY,
    { expiresIn: '24h' },
  );
  return token;
};

module.exports = { Token, makeToken };
