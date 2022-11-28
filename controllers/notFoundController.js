const NotFound = require('../errors/NotFound');
const { NOT_FOUND_ROUTE_MESSAGE } = require('../utils/constants');

module.exports.notFoundController = (req, res, next) => {
  next(new NotFound(NOT_FOUND_ROUTE_MESSAGE));
};
