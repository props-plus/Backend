const db = require('../dbConfig');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find(){
  return db('WORKSPACE_PROFILES_BADGES');
};

function findById(id){
  return db('WORKSPACE_PROFILES_BADGES')
    .where({ id });
};

function insert(badge){
  return db('WORKSPACE_PROFILES_BADGES')
    .insert(badge)
    .first();
};

function update(id, badge){
  return db('WORKSPACE_PROFILES_BADGES')
    .where({ id })
    .update(badge);
};

function remove(id){
  return db('WORKSPACE_PROFILES_BADGES')
    .where({ id })
    .del();
};
