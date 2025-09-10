const db = require('../db/db');

const findAll = async () => {
  return db('casos').select('*');
}

const findById = async (id) => {
  return db('casos').where({ id }).first();
}

const create = async (data) => {
   const [row] = await db('casos').insert({
      titulo: data.titulo,
      descricao: data.descricao,
      status: data.status,
      agente_id: data.agente_id,
   }).returning('*');
   return row;
}


const update = async (id, data) => {
  const [row] = await db('casos').where({ id }).update(
    {
      titulo: data.titulo,
      descricao: data.descricao,
      status: data.status,
      agente_id: data.agente_id,
    },
    '*'
  );
  return row || null;
}

const patch = async (id, partial) => {
  const toUpdate = {};
  if ("titulo" in partial) toUpdate.titulo = partial.titulo;
  if ("descricao" in partial) toUpdate.descricao = partial.descricao;
  if ("status" in partial) toUpdate.status = partial.status;
  if ("agente_id" in partial) toUpdate.agente_id = partial.agente_id;

  if (Object.keys(toUpdate).length === 0) return findById(id);

  const [row] = await db('casos').where({ id })
  .update({...toUpdate}, '*');

  return row || null;
}

const remove = async (id) => {
  const count = await db('casos').where({ id }).del();
  return count > 0;
}

module.exports = { 
  findAll, 
  findById, 
  create, 
  update, 
  patch, 
  remove
};