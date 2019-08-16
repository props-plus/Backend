const express = require('express');

const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

//const {configureMiddleware} = require('../middlewareConfig/middlewareConfig.js');

const server = express();

server.use(helmet());
server.use(morgan());
server.use(cors());
server.use(express.json());

module.exports = {
  server
};
