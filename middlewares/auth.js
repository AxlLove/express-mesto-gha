const jwt = require('jsonwebtoken');
require('dotenv').config();
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const SECRET_KEY = '1609562';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      const validationError = new UnauthorizedError('Необходима авторизация');
      return next(validationError);
    }
  }
  req.user = payload;

  next();
};
