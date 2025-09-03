const db = require('../db/db.js');

async function findAll({ status, agente_id } = {}) {
  const q = db('casos').select('*');
  if (status) q.where('status', status);
  if (agente_id !== undefined) q.where('agente_id', agente_id);
  return q.orderBy('id', 'asc');
}

async function findById(id) {
  return db('casos').where({ id }).first();
}

async function create({ titulo, descricao, status = 'aberto', agente_id = null }) {
  const [row] = await db('casos')
    .insert({ titulo, descricao, status, agente_id })
    .returning('*');
  return row;
}

async function update(id, { titulo, descricao, status = 'aberto', agente_id = null }) {
  const [row] = await db('casos')
    .where({ id })
    .update({ titulo, descricao, status, agente_id })
    .returning('*');
  return row || null;
}

async function patch(id, partial) {
  const payload = {};
  if (partial.titulo !== undefined) payload.titulo = partial.titulo;
  if (partial.descricao !== undefined) payload.descricao = partial.descricao;
  if (partial.status !== undefined) payload.status = partial.status;
  if (partial.agente_id !== undefined) payload.agente_id = partial.agente_id;

  const [row] = await db('casos').where({ id }).update(payload).returning('*');
  return row || null;
}

async function remove(id) {
  const count = await db('casos').where({ id }).del();
  return count > 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
};
