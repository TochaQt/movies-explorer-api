const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

function createMovie(req, res, next) {
  const request = req.body;

  request.owner = req.user._id;

  Movie.create(request)
    .then((movie) => res.status(200).send(movie))
    .catch(next);
}

function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить этот фильм');
      }
      return movie;
    })
    .then(() => Movie.findByIdAndRemove(req.params.movieId))
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      return res.status(200).send({ message: 'Фильм удален' });
    })
    .catch(next);
}

module.exports = {
  createMovie, getMovies, deleteMovie,
};
