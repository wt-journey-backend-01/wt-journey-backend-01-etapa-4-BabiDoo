/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('casos').del();
  await knex('agentes').del();

  await knex('agentes').insert([
    { nome: 'Ana Alves',   dataDeIncorporacao: '2020-03-10', cargo: 'Investigadora' },
    { nome: 'Bruno Souza', dataDeIncorporacao: '2018-07-22', cargo: 'Delegado' },
  ]);
};
