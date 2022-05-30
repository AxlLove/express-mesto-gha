const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
require('dotenv').config();
const { urlRegExp } = require('./utils/regExp');
const { NotFoundError } = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
  }),
}), createUser);
app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);

app.all('*', (_req, _res) => {
  throw new NotFoundError('Не существующий адрес');
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has been started with PORT=${PORT}`);
});
