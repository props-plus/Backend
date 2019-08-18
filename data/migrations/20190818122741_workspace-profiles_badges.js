const WORKSPACE_PROFILES_BADGES = 'WORKSPACE_PROFILES_BADGES'
const WORKSPACE_PROFILES = 'WORKSPACE_PROFILES'
const BADGES = 'BADGES'

exports.up = async function(knex) {
  await knex.schema.createTable(WORKSPACE_PROFILES_BADGES, tbl => {
      tbl
        .integer('fk_workspace-profile_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable(WORKSPACE_PROFILES)
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer('fk_badge_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable(BADGES)
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(WORKSPACE_PROFILES_BADGES)
};
