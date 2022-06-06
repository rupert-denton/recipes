const db = require('./db')

function getRecipes() {
  return db
    .readRecipes()
    .then((result) => {
      console.log(result)
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

getRecipes()
