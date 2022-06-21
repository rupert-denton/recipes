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

  db.addNewRecipe(newRecipe)
    .then((result) => {
      res.redirect(`/`)
    })
    .catch((err) => {
      util.logError(err)
    })
})

//PATCH /
router.patch('/update/:id', (req, res) => {
  const { id, name, method, ingredients } = req.body
  const data = req.body

  db.updateRecipe(data)
    .then((result) => {})
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server Error')
    })
})

// DELETE /api/delete/:id
router.post('/delete', (req, res) => {
  const id = Number(req.body.id)

  db.deleteRecipe(id)
    .then((result) => {
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server Error')
    })
})

module.exports = router
