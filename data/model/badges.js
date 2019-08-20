const db = require('../dbConfig');
const BADGES = 'BADGES';

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find(){
  return db(BADGES);
};

function findById(id){
  return db(BADGES)
    .where({ id });
};

function add(badge){
  return db(BADGES)
    .insert(badge)
    .first();
};

function update(id, badge){
  return db(BADGES)
    .where({ id })
    .update(badge);
};

function remove(id){
  return db(BADGES)
    .where({ id })
    .del();
};
