const CONTACTS = 'CONTACTS'

exports.up = async function(knex) {
    await knex.schema.createTable(CONTACTS, tbl => {
        tbl.increments()
        tbl.string('firstname')
        tbl.string('lastname')
        tbl.string('email')
        tbl.bigInteger('phone')
        tbl.string('address1')
        tbl.string('address2')
        tbl.string('city')
        tbl.string('state')
        tbl.integer('zip')
    })
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists(CONTACTS)
}
