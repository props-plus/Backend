const db = require('../dbConfig')
const dbTable = 'PROPS'
const knex = require('../dbConfig')

module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    updateKey,
    findByUserID,
    findByDateRange
}

function add(dbTable, obj) {
    return db(dbTable).insert(obj)
}

function find() {
    return db(dbTable)
}

function findByDateRange(obj) {
    const { year, month, fk_from_workspace_profile_id } = obj
    const from = `${year}-${month}-01 00:00:00.000000+00`
    const to = knex.fn.now()
    return db(dbTable)
        .select({ fk_from_workspace_profile_id }, 'value')
        .whereBetween('createdAt', [from, to])
        .where({ fk_from_workspace_profile_id })
}

function findByUserID(fk_to_workspace_profile_id) {
    return db(dbTable)
        .where({ fk_to_workspace_profile_id })
        .sum('value')
        .first()
}

function findById(id) {
    return db(dbTable)
        .where({ id })
        .first()
}

function remove(id) {
    return db(dbTable)
        .where({ id })
        .del()
}

function update(id, obj) {
    return db(dbTable)
        .where({ id })
        .update(obj)
}

function updateKey(id, obj) {
    const record = findById(id)
    const newObj = { ...record, ...obj }

    return db(dbTable)
        .where({ id })
        .update(newObj)
}
