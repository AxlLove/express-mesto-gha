const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, _, next) => {
  req.user = {
    _id: '6281187f96e4ee38a3ad1680',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.patch('*', (_, res) => {
  res.send({ message: 'Неверный адресс' });
});

app.listen(PORT, () => {
  console.log(`Server has been started with PORT=${PORT}`);
});
