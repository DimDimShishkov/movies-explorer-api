const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { signupCelebrate, signinCelebrate } = require('../utils/celebrate');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { notFoundController } = require('../controllers/notFoundController');

// роуты, не требующие авторизации
router.post('/signup', signupCelebrate, createUser);
router.post('/signin', signinCelebrate, login);
router.post('/signout', logout);
// авторизация
router.use(auth);
// роуты, которым авторизация нужна
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('/*', notFoundController);

module.exports = router;
