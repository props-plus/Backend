const express = require('express');

const { configureMiddleware } = require('../middlewareConfig/middlewareConfig.js');

const server = express();

configureMiddleware(server);

module.exports = {
  server
};
