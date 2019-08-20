const db = require('../dbConfig')
const dbTable = 'WORKSPACES'

module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    updateKey
}

function add(dbTable, obj) {
    return db(dbTable).insert(obj)
}

function find() {
    return db(dbTable)
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
