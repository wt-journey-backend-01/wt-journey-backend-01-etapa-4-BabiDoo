const db = require('../db/db.js');

async function findAll({ cargo, sort } = {}) {
  const q = db('agentes').select('*');
  if (cargo) q.whereILike('cargo', cargo); // aceita 'Delegado' ou 'delegado'
  // sort: 'campo' ou '-campo'
  const allowed = new Set(['id', 'nome', 'dataDeIncorporacao', 'cargo']);
  if (sort) {
    const desc = sort.startsWith('-');
    const field = desc ? sort.slice(1) : sort;
    if (allowed.has(field)) q.orderBy(field, desc ? 'desc' : 'asc');
  } else {
    q.orderBy('id', 'asc');
  }
  return q;
}

async function findById(id) {
  return db('agentes').where({ id }).first();
}

async function create({ nome, dataDeIncorporacao, cargo }) {
  const [row] = await db('agentes')
    .insert({ nome, dataDeIncorporacao, cargo })
    .returning('*');
  return row;
}

async function update(id, { nome, dataDeIncorporacao, cargo }) {
  const [row] = await db('agentes')
    .where({ id })
    .update({ nome, dataDeIncorporacao, cargo })
    .returning('*');
  return row || null;
}

async function patch(id, partial) {
  const payload = {};
  if (partial.nome !== undefined) payload.nome = partial.nome;
  if (partial.dataDeIncorporacao !== undefined) payload.dataDeIncorporacao = partial.dataDeIncorporacao;
  if (partial.cargo !== undefined) payload.cargo = partial.cargo;

  const [row] = await db('agentes').where({ id }).update(payload).returning('*');
  return row || null;
}

async function remove(id) {
  const count = await db('agentes').where({ id }).del();
  return count > 0;
}

async function findCasesByAgent(agentId) {
  return db('casos').select('*').where({ agente_id: agentId }).orderBy('id', 'asc');
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
  findCasesByAgent,
};
