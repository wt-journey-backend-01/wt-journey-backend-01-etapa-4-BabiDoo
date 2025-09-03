const knexLib = require('knex');
const knexConfig = require('../knexfile.js');
const env = process.env.NODE_ENV || 'development';
const config = knexConfig[env];
const knex = knexLib(config);
knex.on('query-error', (err) => {
  console.error('Knex query error:', err.message);
});


module.exports = knex;
