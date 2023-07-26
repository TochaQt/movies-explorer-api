const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getCurrentUser, updateProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

module.exports = router;
