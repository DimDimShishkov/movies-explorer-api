const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt; // достаём авторизационный заголовок
  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new Unauthorized(UNAUTHORIZED_ERROR_MESSAGE));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
