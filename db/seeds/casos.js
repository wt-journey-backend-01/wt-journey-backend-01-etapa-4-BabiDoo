/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const ana   = await knex('agentes').where({ nome: 'Ana Alves' }).first('id');
  const bruno = await knex('agentes').where({ nome: 'Bruno Souza' }).first('id');

  await knex('casos').del();

  await knex('casos').insert([
    {
      titulo: 'Roubo no Centro',
      descricao: 'Furto em loja de eletrônicos',
      status: 'aberto',
      agente_id: ana?.id ?? null
    },
    {
      titulo: 'Fraude Online',
      descricao: 'Golpe em marketplace',
      status: 'solucionado',
      agente_id: bruno?.id ?? null
    }
  ]);
};
