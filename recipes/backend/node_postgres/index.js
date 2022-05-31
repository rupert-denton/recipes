const express = require('express')
const app = express()
const port = 3001

const Pool = require('pg').Pool
const bodyParser = require('body-parser')
const { reset } = require('nodemon')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipes',
  port: 5432,
})

app.use(express.json())
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  )
  next()
})

//ingredient crud

//read
app.get('/', (req, res) => {
  console.log(req.body)
  pool
    .query('SELECT * FROM recipes')
    .then((result) => {
      res.status(200).send(result.rows)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})

app.get('/getbasicrecipe', (req, res) => {
  let recipeName = req.query.name
  pool
    .query(
      'select r.recipe_name, r.recipe_method, ir.*, i.ingredient_name from recipes r ' +
        ' inner join ingredientrecipes ir ' +
        ' on r.id = ir.recipe_id    ' +
        ' inner join ingredients i on ' +
        ' i.id = ir.ingredient_id ' +
        ' where r.recipe_name = $1',
      [recipeName.toLowerCase()]
    )
    .then((result) => {
      console.log(result.rows)
      res.status(200).send(result.rows)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})

app.get('/getjoinedrecipes/', (req, res) => {
  console.log(req.query.name)
  //get recipe id from recipe name sent in fetch request
  pool
    .query(
      `SELECT * FROM ingredientrecipes INNER JOIN recipes ON ingredientrecipes.recipe_id = recipes.id INNER JOIN ingredients ON ingredientrecipes.ingredient_id = ingredients.id where recipe_name=$1`,
      [req.query.name]
    )
    //return results to front end
    .then((result) => {
      console.log(result.rows)
      res.send(result.rows)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})

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

//insert recipe record x
//check ingredient second - if ingredient exists {go next step} else {add to ingredient schema then go to next step}
//connect the schemas

app.post('/recipe', (req, res) => {
  console.log(req.body.name)
  console.log(req.body.method)
  console.log(req.body.ingredients)
  pool
    .query(
      'insert into recipes(recipe_name, recipe_method) values($1, $2) RETURNING id',
      [req.body.name, req.body.method]
    )
    .then((response) => {
      let recipe_id = response.rows[0].id
      for (let i = 0; i < req.body.ingredients.length; i++) {
        pool
          .query(
            'WITH ins as (INSERT INTO ingredients(ingredient_name) values($1) ON CONFLICT DO NOTHING RETURNING id)' +
              'SELECT * FROM ins UNION select id from ingredients where ingredient_name = $1',
            [req.body.ingredients[i].ingredient_name]
          )
          .then((result) => {
            //callback hell
            pool
              .query(
                'INSERT INTO ingredientrecipes(recipe_id, ingredient_id, quantity, measure) values($1, $2, $3, $4)',
                [
                  recipe_id,
                  result.rows[0].id,
                  req.body.ingredients[i].quantity,
                  req.body.ingredients[i].measure,
                ]
              )
              .then((rs) => {})
          })
      }
      res.status(200).send(response)
    })
    .catch((error) => {
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
