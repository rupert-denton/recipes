const express = require('express')
const app = express()
const port = 3001

const Pool = require('pg').Pool
const bodyParser = require('body-parser')
const db = require('./db')
const routes = require('./routes')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipes',
  port: 5432,
})

app.use(express.json())
app.use(bodyParser.json())
app.use(express.static('frontend/src/views'))
app.use('/api/recipes', require('./routes'))

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

app.get('/', (req, res) => {
  db.readRecipes()
    .then((result) => {
      console.log(`hello ${result}`)
      res.send(result)
    })
    .catch((err) => {
      routes.logError(err)
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
      [recipeName]
    )
    .then((result) => {
      res.status(200).send(result.rows)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})

app.get('/recipes', (req, res) => {
  console.log(req)
  console.log(req.query.name)
  let recipeName = req.query.name
  pool
    .query(
      'select r.recipe_name, r.recipe_method, ir.*, i.ingredient_name from recipes r ' +
        ' inner join ingredientrecipes ir ' +
        ' on r.id = ir.recipe_id    ' +
        ' inner join ingredients i on ' +
        ' i.id = ir.ingredient_id ' +
        ' where r.recipe_name = $1',
      [recipeName]
    )
    .then((result) => {
      res.status(200).send(result.rows)
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
            [req.body.ingredients[i].ingredient_name.toLowerCase()]
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

//frontend stuff

// import './RecipeForm.css'
// import React, { useState, useEffect } from 'react'
// import RecipeTitle from '../components/ui/RecipeTitle.js'
// import RecipeIngredientsContainer from '../components/ui/RecipeIngredientsContainer'
// import RecipeMethodContainer from '../components/ui/RecipeMethodContainer'
// import { useParams } from 'react-router-dom'

//recipeDBTest
export default function GetRecipe(props) {
  let { name } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [recipeName, setRecipeName] = useState('')
  const [methodStepsList, setMethodStepsList] = useState([])
  const [ingredients, setIngredients] = useState([])

  const clickForRecipe = function (e) {
    e.preventDefault()
    retrieveRecipe()
  }
  const retrieveRecipe = function (e) {
    console.log('getting recipe')

    console.log(searchQuery.length)
    let queryString
    if (searchQuery.length) {
      queryString = `http://localhost:3001/getbasicrecipe/?name=${searchQuery}`
    } else {
      queryString = `http://localhost:3001/getbasicrecipe/?name=${name}`
    }
    fetch(queryString, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json)
        let result = json
        let recipeName = result[0].recipe_name
        let recipeMethod = result[0].recipe_method.split(/\r?\n/)
        console.log(recipeMethod)
        setRecipeName(recipeName)
        setMethodStepsList(recipeMethod)
        setIngredients(json)
      })
  }

  useEffect(() => {
    retrieveRecipe()
  }, [])

  return (
    <div>
      <div className="page-header">
        <h1>Get Recipe!</h1>
        <div className="recipe-title recipe-element">
          <input
            type="text"
            placeholder="Find Recipe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <div className="get-button-container">
            <button className="get-recipe" onClick={(e) => clickForRecipe(e)}>
              Get Recipe
            </button>
          </div>
        </div>
      </div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          <RecipeTitle recipeName={recipeName}></RecipeTitle>
          <div className="ingredient-method-frame">
            <RecipeIngredientsContainer
              recipeIngredients={ingredients}
            ></RecipeIngredientsContainer>
            <RecipeMethodContainer
              recipeMethod={methodStepsList}
            ></RecipeMethodContainer>
          </div>
        </form>
      </div>
    </div>
  )
}
