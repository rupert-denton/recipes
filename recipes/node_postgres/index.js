const express = require('express')
const app = express()
const port = 3001

//is this correctly set up?
const recipe_model = require('./recipe_model')

app.use(express.json())
app.use(function (req, res, next) {
  //what are these?

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  )
  next()
})

//how does this all work?
app.get('/', (req, res) => {
  recipe_model
    .getRecipes()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.post('/recipes', (req, res) => {
  recipe_model
    .createRecipes(req.body)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
