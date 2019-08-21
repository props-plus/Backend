const ORGANIZERS = "ORGANIZERS";
const CONTACTS = "CONTACTS";

exports.up = async function(knex) {
  await knex.schema.createTable(ORGANIZERS, tbl => {
    tbl.increments();
    tbl.string("name").notNullable();
    tbl.string("industry");
    tbl
      .integer("fk_contact_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable(CONTACTS)
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(ORGANIZERS);
};
