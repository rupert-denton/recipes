const express = require('express')
const db = require('./db')
const router = express.Router()

// GET /api/recipes
router.get('/', (req, res) => {
  db.readRecipes()
    .then((result) => {
      console.log(`hello ${result}`)
      res.json(result)
    })
    .catch((err) => {
      logError(err)
    })
})

//specific recipe dummy code
// GET /api/recipes/{recipeId}
router.get('/:id', (req, res) => {
  //do stuff
})

function logError(err) {
  console.error('Uh oh!', err.message)
}

module.exports = router
