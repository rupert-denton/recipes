const config = require('./knexfile').development
const connection = require('knex')(config)

function getAllRecipes(db = connection) {
  return db('recipes').select()
}

function getSpecificRecipe(id, db = connection) {
  return db('recipes').select().where('id', id).first()
}

module.exports = {
  getAllRecipes,
  getSpecificRecipe,
}
