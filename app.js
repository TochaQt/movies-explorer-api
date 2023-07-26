require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DATA_BASE = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(DATA_BASE);

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
