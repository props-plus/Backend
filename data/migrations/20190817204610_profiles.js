const PROFILES = "PROFILES";
const CONTACTS = "CONTACTS";

exports.up = async function(knex) {
  await knex.schema.createTable(PROFILES, tbl => {
    tbl.increments();
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
  await knex.schema.dropTableIfExists(PROFILES);
};
