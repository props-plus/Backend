const db = require('../dbConfig');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find(){
  return db('BADGES');
};

function findById(id){
  return db('BADGES')
    .where({ id });
};

function insert(badge){
  return db('BADGES')
    .insert(badge)
    .first();
};

function update(id, badge){
  return db('BADGES')
    .where({ id })
    .update(badge);
};

function remove(id){
  return db('BADGES')
    .where({ id })
    .del();
};
