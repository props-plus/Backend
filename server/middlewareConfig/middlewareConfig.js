const json = require('express').json();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const configureMiddleware = server => {
  server.use(json);
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(cors());
  server.use(require('body-parser').urlencoded({extended: false}));
}

module.exports = {
  configureMiddleware
};
