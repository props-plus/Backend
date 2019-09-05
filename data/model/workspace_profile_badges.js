const db = require('../dbConfig')
const WORKSPACE_PROFILES_BADGES = 'WORKSPACE_PROFILES_BADGES'

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find(WORKSPACE_PROFILES_BADGES) {
    return db()
}

function findById(id) {
    return db(WORKSPACE_PROFILES_BADGES).where({ id })
}

function add(badge) {
    return db(WORKSPACE_PROFILES_BADGES)
        .insert(badge)
        .first()
}

function update(id, badge) {
    return db(WORKSPACE_PROFILES_BADGES)
        .where({ id })
        .update(badge)
}

function remove(id) {
    return db(WORKSPACE_PROFILES_BADGES)
        .where({ id })
        .del()
}
