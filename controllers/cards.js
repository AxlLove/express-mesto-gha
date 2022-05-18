const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  if (!name || !link) {
    res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    return;
  }
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Серверная ошибка' }));
};

const getCards = (_, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Серверная ошибка' }));
};
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.send({ data: card });
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

const likeCard = (req, res) => {
  const user = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: user } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.send({ data: card });
    })
    .catch(
      (err) => {
        if (err.kind === 'ObjectId') {
          res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
          return;
        }
        res.status(500).send({ message: 'Серверная ошибка' });
      },
    );
};

const dislikeCard = (req, res) => {
  const user = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: user } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.send({ data: card });
    })
    .catch(
      (err) => {
        if (err.kind === 'ObjectId') {
          res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
          return;
        }
        res.status(500).send({ message: 'Серверная ошибка' });
      },
    );
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
