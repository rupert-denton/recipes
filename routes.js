const express = require('express')
const db = require('./db')
const router = express.Router()

// GET /api/recipes
router.get('/', (req, res) => {
  db.getAllRecipes()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      logError(err)
    })
})

//specific recipe dummy code
// GET /api/recipes/{recipeId}
router.get('/:id', (req, res) => {
  let id = req.params.id
  console.log(id)
  db.getSpecificRecipe(id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      logError(err)
    })
})

function logError(err) {
  console.error('Uh oh!', err.message)
}

module.exports = router
