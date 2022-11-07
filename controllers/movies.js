const Movie = require('../models/movies');
// const NotFound = require('../errors/NotFound');
// const Forbidden = require('../errors/Forbidden');
const ValidationError = require('../errors/ValidationError');

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  Movie.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req) => {
  console.log(req);
  // Movie.findById(req.params.movieId).orFail(new NotFound(
  //  `Карточка c ID = ${req.params.movieId} не найдена`,
  // ));
  // .then((user) => {
  //   if (user.owner.toString() === req.user._id) {
  //     Movie.findByIdAndRemove(req.params.movieId)
  //       .then((item) => res.send(item))
  //       .catch(next);
  //   } else {
  //     next(new Forbidden('Карточка создана другим пользователем'));
  //   }
  // })
  // .catch(next);
};
