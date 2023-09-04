const knexFile = require('../../knexfile');
const dbKnex = require('knex');

const knex = dbKnex(knexFile["development"]);

// console.log(knex);


module.exports = {knex};