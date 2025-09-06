/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("agentes", function (table) {
      table.increments("id").primary();
      table.string("nome").notNullable();
      table.date("dataDeIncorporacao").notNullable();
      table.string("cargo").notNullable();
    })
    .createTable("casos", function (table) {
      table.increments("id").primary();
      table.string("titulo").notNullable();
      table.string("descricao").notNullable();
      table
        .enu("status", ["aberto", "solucionado"], {
          useNative: true,
          enumName: "status_enum",
        })
        .notNullable();
      table
        .integer("agente_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("agentes")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("casos")
    .dropTableIfExists("agentes")
    .raw("DROP TYPE IF EXISTS status_enum");
};
