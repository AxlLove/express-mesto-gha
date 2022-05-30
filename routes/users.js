const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUsers, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { urlRegExp } = require('../utils/regExp');

router.get('/users/me', getCurrentUser);

router.get('/users', getUsers);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp),
  }),
}), updateAvatar);

module.exports = router;
