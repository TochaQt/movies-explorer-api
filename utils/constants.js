const allowedCors = [
  'http://movies.tochasqt.nomoreparties.sbs',
  'https://movies.tochasqt.nomoreparties.sbs',
  'http://localhost:3000',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = {
  corsOptions,
};
