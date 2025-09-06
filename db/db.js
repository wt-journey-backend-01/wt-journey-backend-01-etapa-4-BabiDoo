const knex = require('knex');
const knexConfig = require('../knexfile.js');

const environment = process.env.NODE_ENV || 'development';
const dbConfig = knexConfig[environment];
const db = knex(dbConfig);

db.on('query-error', (err) => {
  console.error('Knex query error:', err.message);
});

module.exports = db;

// const knex = require('knex'); 
// const MyKnexFile = require('../knexfile.js'); 
// const environment = process.env.NODE_ENV || 'development'; 
// const MyDBSetup = MyKnexFile[environment];
// const db = knex(MyDBSetup);
// db.on('query-error', (err) => {
//   console.error('Knex query error:', err.message);
// });


// module.exports = db;