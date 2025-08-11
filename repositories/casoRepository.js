const db = require('../db/db.js');

async function findAll() {
  return db('casos').select('*').orderBy('id', 'asc');
}
 async function findById(id) {
  return db('casos').where({ id }).first();
}

async function create({ titulo, descricao, status = 'aberto', agente_id = null }) {
  const [created] = await db('casos')
    .insert({ titulo, descricao, status, agente_id })
    .returning('*');
  return created;
}

async function update(id, { titulo, descricao, status, agente_id }) {
  const payload = {};
  if (titulo !== undefined) payload.titulo = titulo;
  if (descricao !== undefined) payload.descricao = descricao;
  if (status !== undefined) payload.status = status;
  if (agente_id !== undefined) payload.agente_id = agente_id;

  const [updated] = await db('casos')
    .where({ id })
    .update(payload)
    .returning('*');
  return updated;
}
async function patch(id, partialData) {
  return update(id, partialData);
}

async function remove(id) {
  const deleted = await db('casos').where({ id }).del();
  return deleted > 0;
}

module.exports = { findAll, findById, create, update, patch, remove }