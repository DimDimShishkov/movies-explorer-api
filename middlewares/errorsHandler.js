const { SERVER_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { status = 500, message } = err;
  res.status(status).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: status === 500
      ? SERVER_ERROR_MESSAGE
      : message,
  });
  next();
};
