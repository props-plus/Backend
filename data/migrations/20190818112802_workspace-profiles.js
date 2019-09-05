const WORKSPACE_PROFILES = 'WORKSPACE_PROFILES'
const WORKSPACES = 'WORKSPACES'

exports.up = async function(knex) {
    await knex.schema.createTable(WORKSPACE_PROFILES, tbl => {
        tbl.increments()
        tbl.string('userID').notNullable()
        tbl.bool('isOwner').notNullable()
        tbl.bool('isAdmin').notNullable()
        tbl.bool('isActive').notNullable()
        tbl.integer('fk_workspace_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable(WORKSPACES)
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists(WORKSPACE_PROFILES)
}
