const config = require('./knexfile').development
const connection = require('knex')(config)

function readRecipes(db = connection) {
  return db('recipes').select()
}

function close(db = connection) {
  db.destroy()
}

module.exports = {
  readRecipes,
  close,
}
