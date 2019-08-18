const knex = require("knex");
const knexConfig = require("../knexfile");
const environment = "staging1";

module.exports = knex(knexConfig.development);
