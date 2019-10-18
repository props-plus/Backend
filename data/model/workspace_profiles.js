const db = require("../dbConfig");
const dbTable = "WORKSPACE_PROFILES";

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  updateKey,
  findByUserName
};

function add(dbTable, obj) {
  return db(dbTable)
    .insert(obj)
    .returning("*");
}

function find() {
  return db(dbTable);
}

function findById(id) {
  return db(dbTable)
    .where({ id })
    .first();
}

function findByUserName(userName) {
  return db(dbTable)
    .where({ userName })
    .first();
}

function remove(id) {
  return db(dbTable)
    .where({ id })
    .del();
}

function update(id, obj) {
  return db(dbTable)
    .where({ id })
    .update(obj);
}

function updateKey(id, obj) {
  const record = findById(id);
  const newObj = { ...record, ...obj };

  return db(dbTable)
    .where({ id })
    .update(newObj);
}
