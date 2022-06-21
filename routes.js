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

  db.addRecipeWithIngredients(newRecipe)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      util.logError(err)
    })
})

//PATCH /
router.patch('/update/:id', (req, res) => {
  const { id, name, method, ingredients } = req.body

  db.updateRecipe({ id, name, method, ingredients })
    .then(() => {
      res.sendStatus(204)
    })
    .catch((err) => {
      util.logError(err)
    })
})

// DELETE /api/delete/:id
router.post('/delete', (req, res) => {
  const id = Number(req.body.id)

  db.deleteRecipe(id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch((err) => {
      util.logError(err)
    })
})

module.exports = router
