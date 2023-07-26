const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');
const NotFoundError = require('../errors/NotFoundError');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/https?:\/\/[\S]+/).required(),
    trailerLink: Joi.string().pattern(/https?:\/\/[\S]+/).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(/https?:\/\/[\S]+/).required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

router.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
