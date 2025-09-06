const db = require('../db');

const findAll = async () => {
  return db('agentes').select('*')
};

const findById = async (id) => {
  return db('agentes').where({ id }).first();
};

const create = async (data) => {
  const [row] = await db('agentes')
    .insert({
      nome: data.nome,
      cargo: data.cargo,
      dataDeIncorporacao: data.dataDeIncorporacao,
    })
    .returning(['id','nome']);
  return row;
};

const update = async (id, data) => {
  const [row] = await db('agentes')
    .where({ id })
    .update(
      {
        nome: data.nome,
        cargo: data.cargo,
        dataDeIncorporacao: data.dataDeIncorporacao
      },
      '*'
    );
  return row || null;
};

const patch = async (id, partial) => {
  const toUpdate = {};
  if (partial.nome !== undefined) toUpdate.nome = partial.nome;
  if (partial.cargo !== undefined) toUpdate.cargo = partial.cargo;
  if (partial.dataDeIncorporacao !== undefined)
    toUpdate.dataDeIncorporacao = partial.dataDeIncorporacao;

  if (Object.keys(toUpdate).length === 0) return findById(id);

  const [row] = await db('agentes')
    .where({ id })
    .update({ ...toUpdate }, '*');
  return row || null;
};

const remove = async (id) => {
  const count = await db('agentes').where({ id }).del();
  return count > 0; //pq a variavel chama count e retorna count > 1 ???
};

module.exports = { findAll, findById, create, update, patch, remove };
