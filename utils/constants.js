const crypto = require('crypto'); // экспортируем crypto

const randomString = crypto
  .randomBytes(16) // сгенерируем случайную последовательность 16 байт (128 бит)
  .toString('hex'); // приведём её к строке

const NOT_FOUND_ROUTE_MESSAGE = 'Запрашиваемый ресурс не найден';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходимо авторизироваться';
const AUTHORIZED_ERROR_MESSAGE = 'Неправильные почта или пароль';
const EMAIL_ERROR_MESSAGE = 'Неправильный формат почты';
const USER_NOT_FOUND_MESSAGE = 'Пользователь не найден';
const FILM_NOT_FOUND_MESSAGE = 'Фильм не найден';
const LINK_ERROR_MESSAGE = 'Неправильный формат ссылки';
const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const OWNER_ERROR_MESSAGE = 'Фильм создан другим пользователем';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const CREATE_MOVIE_ERROR_MESSAGE = 'Переданы некорректные данные';

module.exports = {
  NOT_FOUND_ROUTE_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  AUTHORIZED_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  FILM_NOT_FOUND_MESSAGE,
  LINK_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  OWNER_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  CREATE_MOVIE_ERROR_MESSAGE,
  randomString,
};
