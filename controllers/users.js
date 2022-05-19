const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    return;
  }
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
          return;
        }
        res.status(500).send({ message: 'Серверная ошибка' });
      },
    );
};

const getUser = (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.send({ data: user });
    })
    .catch(
      (err) => {
        if (err.kind === 'ObjectId') {
          res.status(400).send({ message: 'Не корректный _id' });
          return;
        }
        res.status(500).send({ message: 'Серверная ошибка' });
      },
    );
};

const getUsers = (_, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Серверная ошибка' }));
};
//
const updateProfile = (req, res) => {
  const user = req.user._id;
  const { name, about } = req.body;
  if (!name || !about) {
    res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    return;
  }

  User.findByIdAndUpdate(user, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.send({ data: updatedUser });
    })
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Некоретные данные' });
        }
        res.status(500).send({ message: 'Серверная ошибка' });
      },
    );
};

const updateAvatar = (req, res) => {
  const user = req.user._id;
  const { avatar } = req.body;
  if (!avatar) {
    res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
    return;
  }

  User.findByIdAndUpdate(user, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.send({ data: updatedUser });
    })
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Некоретные данные' });
        }
        res.status(500).send({ message: 'Серверная ошибка' });
      },
    );
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
};
