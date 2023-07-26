const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login, signOut } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/movies', movieRouter);
router.use('/users', userRouter);
router.post('/signout', signOut);

router.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
