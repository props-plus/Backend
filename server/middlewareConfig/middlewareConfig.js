const json = require("express").json();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const configureMiddleware = server => {
  server.use(json);
  server.use(helmet());
  server.use(morgan());
  server.use(cors());
  server.use(require("body-parser").urlencoded();
}

module.exports = {
  configureMiddleware
};
