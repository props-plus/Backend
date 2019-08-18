const WORKSPACE_PROFILES = "WORKSPACE_PROFILES"
const WORKSPACES = 'WORKSPACES'
const PROFILES = "PROFILES"

exports.up = async function(knex) {
    await knex.schema.createTable(WORKSPACE_PROFILES, tbl => {
        tbl.increments()
        tbl.string("user-id").notNullable()
        tbl.bool('is-owner').notNullable()
        tbl.bool('is-admin').notNullable()
        tbl.bool('is-active').notNullable()
        tbl
            .integer("fk_workspace_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable(WORKSPACES)
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl
            .integer("fk_profile_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable(PROFILES)
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists(WORKSPACE_PROFILES)
  
};
