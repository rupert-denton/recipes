const config = require('./knexfile').development
const connection = require('knex')(config)

function readRecipes(db = connection) {
  return db('recipes').select()
}

module.exports = {
  readRecipes,
}
