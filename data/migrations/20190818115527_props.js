const PROPS = 'PROPS'
const WORKSPACE_PROFILES = 'WORKSPACE_PROFILES'

exports.up = async function(knex) {
    await knex.schema.createTable(PROPS, tbl => {
        tbl.increments()
        tbl.timestamp('createdAt').defaultTo(knex.fn.now())
        tbl.integer('value')
        tbl.text('message')
        tbl.integer('fk_to_workspace_profile_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable(WORKSPACE_PROFILES)
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.integer('fk_from_workspace_profile_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable(WORKSPACE_PROFILES)
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists(PROPS)
}
