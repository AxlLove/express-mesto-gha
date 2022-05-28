const { ForbiddenError } = require('../errors/ForbiddenError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const Card = require('../models/card');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  if (!name || !link) {
    throw new ValidationError('Переданы некорректные данные при создании карточки.');
  }
  const owner = req.user.id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(
      (err) => {
        if (err.name === 'ValidationError') {
          const validationError = new ValidationError('Переданы некорректные данные при создании карточки');
          return next(validationError);
        }
        next(err);
      },
    );
};

const getCards = (_, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((findedCard) => {
      if (!findedCard) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (findedCard.owner._id.toString() !== req.user.id) {
        throw new ForbiddenError('У вас нет прав на удаление карточки');
      }
      return cardId;
    }).then((Id) => {
      if (Id) {
        Card.findByIdAndRemove(Id)
          .then((card) => {
            res.send({ data: card });
          });
      }
    }).catch(
      (err) => {
        if (err.kind === 'ObjectId') {
          const validationError = new ValidationError('Не корректный _id');
          return next(validationError);
        }
        next(err);
      },
    );
};

const likeCard = (req, res, next) => {
  const user = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: user } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .catch(
      (err) => {
        if (err.kind === 'ObjectId') {
          const validationError = new ValidationError('Переданы некорректные данные для постановки/снятии лайка.');
          return next(validationError);
        }
        next(err);
      },
    );
};

const dislikeCard = (req, res, next) => {
  const user = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: user } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .catch(
      (err) => {
        if (err.kind === 'ObjectId') {
          const validationError = new ValidationError('Переданы некорректные данные для постановки/снятии лайка.');
          return next(validationError);
        }
        next(err);
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
