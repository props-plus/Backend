const db = require('../dbConfig');
const ORGANIZERS = 'ORGANIZERS';

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find(){
  return db(ORGANIZERS);
};

function findById(id){
  return db(ORGANIZERS)
    .where({ id });
};

function add(org){
  return db(ORGANIZERS)
    .insert(org)
    .first();
};

function update(id, org){
  return db(ORGANIZERS)
    .where({ id })
    .update(org);
};

function remove(id){
  return db(ORGANIZERS)
    .where({ id })
    .del();
};
