require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const routes = require('./routes/index');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const headerHandler = require('./middlewares/headerHandler');
const { limiter } = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;

const app = express();
app.use(headerHandler);

app.use(helmet());
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter); // подключаем rate-limiter
app.use(cookieParser()); // подключаем парсер кук как мидлвэр
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/movies-explorer', {
  useNewUrlParser: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes); // обработка всех маршрутов
app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler);
app.listen(PORT);
