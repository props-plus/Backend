const db = require('../dbConfig')

const add = dbTable => obj => {
    return db(dbTable).insert(obj)
}

const find = dbTable => {
    return db(dbTable)
}

const findById = dbTable => id => {
    return db(dbTable)
        .where({ id })
        .first()
}

const remove = dbTable => id => {
    return db(dbTable)
        .where({ id })
        .del()
}

const update = dbTable => id => user => {
    return db(dbTable)
        .where({ id })
        .update(user)
}

const updateKey = dbTable => id => obj => {
    const record = findById(id)
    const newObj = { ...record, ...obj }

    return db(dbTable)
        .where({ id })
        .update(newObj)
}

module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    updateKey
}
