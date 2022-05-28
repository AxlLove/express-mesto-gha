require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
  return token;
};

module.exports = { generateToken };
