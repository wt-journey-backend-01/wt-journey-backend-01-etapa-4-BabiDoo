/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("casos").del();
  await knex("agentes").del();

  await knex("agentes").insert([
    { id: 1, nome: "Gabriela Souza", dataDeIncorporacao: "2022-05-10", cargo: "Delegado" },
    { id: 2, nome: "Carlos Lima", dataDeIncorporacao: "2023-03-15", cargo: "Inspetor" },
  ]);

  await knex("casos").insert([
    {
      id: 1,
      titulo: "Roubo ao Banco Central",
      descricao: "Investigar suspeitos do assalto ao banco central",
      status: "aberto",
      agente_id: 1,
    },
    {
      id: 2,
      titulo: "Fraude Digital",
      descricao: "Caso envolvendo vazamento de dados sigilosos",
      status: "solucionado",
      agente_id: 2,
    },
  ]);
};
