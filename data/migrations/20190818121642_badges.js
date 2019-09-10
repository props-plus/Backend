const BADGES = 'BADGES'

exports.up = async function(knex) {
    await knex.schema.createTable(BADGES, tbl => {
        tbl.increments()
        tbl.string('name').notNullable()
        tbl.integer('minimumValue').defaultTo(0)
        tbl.integer('minimumPropCount').defaultTo(0)
        tbl.boolean('isVisible')
        tbl.string('image')
    })
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists(BADGES)
}
