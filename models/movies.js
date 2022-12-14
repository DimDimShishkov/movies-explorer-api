const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { LINK_ERROR_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { // год выпуска фильма
    type: String,
    required: true,
  },
  description: { // описание фильма
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: true,
    validate: [isURL, LINK_ERROR_MESSAGE],
  },
  trailerLink: { // ссылка на трейлер фильма
    type: String,
    required: true,
    validate: [isURL, LINK_ERROR_MESSAGE],
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: true,
    validate: [isURL, LINK_ERROR_MESSAGE],
  },
  owner: { // _id пользователя, который сохранил фильм.
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    required: true,
    type: Number,
  },
  nameRU: { // название фильма на русском языке
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('card', movieSchema);
