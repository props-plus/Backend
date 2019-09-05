const WORKSPACE_PROFILES = 'WORKSPACE_PROFILES'
const WORKSPACES = 'WORKSPACES'

exports.up = async function(knex) {
    await knex.schema.createTable(WORKSPACE_PROFILES, tbl => {
        tbl.increments()
        tbl.string('userName').notNullable()
        tbl.string('userID').notNullable()
        tbl.string('realName').notNullable()
        tbl.string('userIconSmall').notNullable()
        tbl.string('userIconMed').notNullable()
        tbl.string('userIconLarge').notNullable()
        tbl.bool('isOwner').notNullable()
        tbl.bool('isAdmin').notNullable()
        tbl.bool('isActive').defaultTo(true)
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
