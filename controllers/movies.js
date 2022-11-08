const Movie = require('../models/movies');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const ValidationError = require('../errors/ValidationError');
// возвращает все сохранённые фильмы через get /movies
module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((card) => res.send(card))
    .catch(next);
};
// создаёт фильм через post /movies
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailer, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      }
    })
    .catch(next);
};
// удаляет сохранённый фильм через delete /:movieId
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).orFail(new NotFound(
    'Фильм не найден',
  ))
    .then((user) => {
      if (user.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((item) => res.send(item))
          .catch(next);
      } else {
        next(new Forbidden('Карточка создана другим пользователем'));
      }
    })
    .catch(next);
};
