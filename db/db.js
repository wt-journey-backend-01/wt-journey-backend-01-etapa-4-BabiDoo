const knexLib = require('knex');
const knexConfig = require('../knexfile.js');
const env = process.env.NODE_ENV === 'ci' ? 'ci' : 'development';
const knex = knexLib(knexConfig[env]);
knex.on('query-error', (err) => {
  console.error('Knex query error:', err.message);
});


module.exports = knex;