import db from '../db/db.js';

export async function findAll() {
  return db('casos').select('*').orderBy('id', 'asc');
}

export async function findById(id) {
  return db('casos').where({ id }).first();
}

export async function create({ titulo, descricao, status = 'aberto', agente_id = null }) {
  const [created] = await db('casos')
    .insert({ titulo, descricao, status, agente_id })
    .returning('*');
  return created;
}

export async function update(id, { titulo, descricao, status, agente_id }) {
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

export async function patch(id, partialData) {
  return update(id, partialData);
}

export async function remove(id) {
  const deleted = await db('casos').where({ id }).del();
  return deleted > 0;
}