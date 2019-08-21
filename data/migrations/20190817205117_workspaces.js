const WORKSPACES = "WORKSPACES";
const ORGANIZERS = "ORGANIZERS";

exports.up = async function(knex) {
  await knex.schema.createTable(WORKSPACES, tbl => {
    tbl.increments();
    tbl.string("name").notNullable();
    tbl.string("team-icon-small").notNullable();
    tbl.string("team-icon-med").notNullable();
    tbl.string("team-icon-large").notNullable();
    tbl.boolean("is-active").notNullable();
    tbl
      .integer("fk_organizer_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable(ORGANIZERS)
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(WORKSPACES);
};
