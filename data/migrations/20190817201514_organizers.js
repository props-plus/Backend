const ORGANIZERS = "ORGANIZERS";

exports.up = async function(knex) {
  await knex.schema.createTable(ORGANIZERS, tbl => {
    tbl.increments();
    tbl.string("name");
    tbl.string("industry");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(ORGANIZERS);
};
