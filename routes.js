const express = require('express')
const db = require('./db')
const router = express.Router()
const util = require('./helpers')

// GET /api/recipes
router.get('/', (req, res) => {
  db.getAllRecipes()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      util.logError(err)
    })
})

// GET /api/recipes/{id}
router.get('/:id', (req, res) => {
  let id = req.params.id
  db.getSpecificRecipe(id)
    .then((result) => {
      console.log(result)
      res.json(result)
    })
    .catch((err) => {
      util.logError(err)
    })
})

// POST /api/recipes

router.post('/add', (req, res) => {
  const { name, method, ingredients } = req.body
  const newRecipe = { name, method, ingredients }

  db.addNewRecipe(newRecipe)
    .then((result) => {
      console.log(`line 37 routes.js: ${result}`)
      res.redirect(`/`)
    })
    .catch((err) => {
      util.logError(err)
    })
})

module.exports = router
