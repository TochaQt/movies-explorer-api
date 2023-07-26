const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

function auth(req, res, next) {
  const { cookie } = req.headers;

  let JWT_SECRET;

  if (process.env.NODE_ENV !== 'production') {
    JWT_SECRET = 'dev';
  } else {
    JWT_SECRET = process.env.JWT_SECRET;
  }

  if (!cookie || !cookie.startsWith('jwt=')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
}

module.exports = auth;
