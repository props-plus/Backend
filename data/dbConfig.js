const knex = require("knex");
const knexConfig = require("../knexfile");
const environment = process.env.DB_ENVIRONMENT || "staging1";

module.exports = knex(knexConfig[environment]);
