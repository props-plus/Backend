const BADGES = 'BADGES'

exports.up = async function(knex) {
  await knex.schema.createTable(BADGES, tbl => {
      tbl.increments()
      tbl.string('name').notNullable()
      tbl.integer('minimum-value').defaultTo(0)
      tbl.integer('minimum-prop-count').defaultTo(0)
      tbl.string('image')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(BADGES)
};
