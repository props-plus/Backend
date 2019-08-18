const CONTACTS = "CONTACTS";

exports.up = async function(knex) {
  await knex.schema.createTable(CONTACTS, tbl => {
    tbl.increments();
    tbl.string("firstname").notNullable();
    tbl.string("lastname").notNullable();
    tbl.string("email").notNullable();
    tbl.bigInteger("phone").notNullable();
    tbl.string("address1").notNullable();
    tbl.string("address2").notNullable();
    tbl.string("city").notNullable();
    tbl.string("state").notNullable();
    tbl.integer("zip").notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(CONTACTS);
};
