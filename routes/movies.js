const router = require('express').Router();
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieCelebrate, movieIdCelebrate } = require('../utils/celebrate');

router.get('/', getAllMovies);
router.post('/', createMovieCelebrate, createMovie);
router.delete('/:movieId', movieIdCelebrate, deleteMovie);

module.exports = router;
