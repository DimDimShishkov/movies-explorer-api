const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const ValidationError = require('../errors/ValidationError');
const NotFound = require('../errors/NotFound');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

// создание пользователя через post /signup
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name, email: user.email, _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else next(err);
    })
    .catch(next);
};
// авторизация через post /signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        }).send({ token });
    })
    .catch(next);
};
// авторизация через post /signout
module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  return res.end();
};

// возвращает информацию о пользователе через get /users/me
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id).orFail(new NotFound(
    `Пользователь c ID = ${req.user._id} не найден`,
  ))
    .then((user) => res.send(user))
    .catch(next);
};
// обновляет информацию о пользователе через patch /users/me
module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFound(
      'Пользователь не найден',
    ))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else next(err);
    })
    .catch(next);
};
