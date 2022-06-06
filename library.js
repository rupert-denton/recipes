const db = require('../db')

function getAllRecipes() {
  return db
    .readRecipes()
    .then((result) => {
      return result
    })
    .catch((err) => {
      logError(err)
    })
    .finally(() => {
      db.close()
    })
}

function logError(err) {
  console.error('Uh oh!', err.message)
}

module.exports = {
  getAllRecipes,
}
