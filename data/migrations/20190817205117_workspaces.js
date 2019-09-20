const WORKSPACES = 'WORKSPACES'

exports.up = async function(knex) {
    await knex.schema.createTable(WORKSPACES, tbl => {
        tbl.increments()
        tbl.string('name').notNullable()
        tbl.string('teamID').notNullable()
        tbl.string('teamIconSmall').notNullable()
        tbl.string('teamIconMed').notNullable()
        tbl.string('teamIconLarge').notNullable()
        tbl.boolean('isActive').defaultTo(true)
    })
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists(WORKSPACES)
}
