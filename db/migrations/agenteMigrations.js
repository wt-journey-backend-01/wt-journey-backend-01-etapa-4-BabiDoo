/** @param {import('knex')} knex */
exports.up = async function (knex) {
  await knex.schema.createTable('agentes', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.date('dataDeIncorporacao').notNullable();
    table.string('cargo').notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('casos', (table) => {
    table.increments('id').primary();
    table.string('titulo').notNullable();
    table.string('descricao').notNullable();
    table.enu('status', ['aberto', 'solucionado']).notNullable().defaultTo('aberto');
    table
      .integer('agente_id')
      .unsigned()
      .references('id')
      .inTable('agentes')
      .onDelete('SET NULL')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('casos');
  await knex.schema.dropTableIfExists('agentes');
};