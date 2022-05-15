const express = require('express')
const app = express()
const port = 3001

const Pool = require('pg').Pool
const bodyParser = require('body-parser')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipes',
  port: 5432,
})

//is this correctly set up?
//const recipe_model = require('./recipe_model')

app.use(express.json())
app.use(bodyParser.json())

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

//ingredient crud
app.get('/', (req, res) => {
  console.log(req)
  console.log(res)
  pool
    .query('SELECT * FROM recipe_table')
    .then((result) => {
      res.status(200).send(result.rows)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})

app.post('/recipe', (req, res) => {
  console.log(req)
  console.log(res)
  pool
    .query(
      'insert into recipe_table(recipe_name, recipe_blurb) values($1, $2)',
      [req.body.name, req.body.blurb]
    )
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

//ingredient crud

//read
app.get('/getingredients', (req, res) => {
  pool
    .query('SELECT * FROM ingredients')
    .then((result) => {
      res.status(200).send(result.rows)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})

//create
app.post('/ingredient', (req, res) => {
  pool
    .query('insert into ingredients(ingredient_name) values($1)', [
      req.body.ingredient_name,
    ])
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.get('/getjoinedrecipes', (req, res) => {
  console.log(req)
  //get recipe id from recipe name sent in fetch request
  pool
    .query(`SELECT id FROM recipe_table WHERE recipe_name = ?`, [
      req.params.name,
    ])
    // .then((result) => {
    //   // insert a new query here to get the rest of the recipe with the result
    //   pool.query(
    //     `SELECT * FROM ingredientrecipes INNER JOIN recipes ON ingredientrecipes.recipe_id = ${result} INNER JOIN ingredients ON ingredientrecipes.ingredient_id = ingredients.id;`
    //   )
    // })
    //return results to front end
    .then((result) => {
      res.status(200).send(result.rows)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})

app.post('/createjoinedrecipe', (req, res) => {
  pool
    .query(
      'insert into ingredientrecipes(recipe_id, ingredient_id, quantity, measure) values($1, $2, $3, $4)',
      [
        req.body.recipe_id,
        req.body.ingredient_id,
        req.body.quantity,
        req.body.measure,
      ]
    )
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
