require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = '1609562';

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
  return token;
};

module.exports = { generateToken };
