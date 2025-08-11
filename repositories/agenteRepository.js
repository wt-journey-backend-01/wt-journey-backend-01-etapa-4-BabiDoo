import db from '../db/db.js';

export async function findAll() {
  return db('agentes').select('*').orderBy('id', 'asc');
}

export async function findById(id) {
  return db('agentes').where({ id }).first();
}

export async function create({ nome, dataDeIncorporacao, cargo }) {
  const [created] = await db('agentes')
    .insert({ nome, dataDeIncorporacao, cargo })
    .returning('*');
  return created;
}

export async function update(id, { nome, dataDeIncorporacao, cargo }) {
  const [updated] = await db('agentes')
    .where({ id })
    .update({ nome, dataDeIncorporacao, cargo })
    .returning('*');
  return updated;
}

export async function patch(id, partialData) {
  const payload = {};
  if (partialData.nome !== undefined) payload.nome = partialData.nome;
  if (partialData.dataDeIncorporacao !== undefined) payload.dataDeIncorporacao = partialData.dataDeIncorporacao;
  if (partialData.cargo !== undefined) payload.cargo = partialData.cargo;

  const [updated] = await db('agentes')
    .where({ id })
    .update(payload)
    .returning('*');
  return updated;
}

export async function remove(id) {
  const deleted = await db('agentes').where({ id }).del();
  return deleted > 0;
}

// bônus
export async function findCasosByAgenteId(id) {
  return db('casos').where({ agente_id: id }).select('*').orderBy('id', 'asc');
}