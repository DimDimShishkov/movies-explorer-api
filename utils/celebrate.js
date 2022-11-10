const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const { CREATE_MOVIE_ERROR_MESSAGE } = require('./constants');

const signupCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signinCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const patchUserCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieCelebrate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(CREATE_MOVIE_ERROR_MESSAGE);
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(CREATE_MOVIE_ERROR_MESSAGE);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(CREATE_MOVIE_ERROR_MESSAGE);
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdCelebrate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signupCelebrate,
  signinCelebrate,
  patchUserCelebrate,
  createMovieCelebrate,
  movieIdCelebrate,
};
