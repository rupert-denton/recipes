import './RecipeForm.css'
import React, { useState, useEffect } from 'react'
import RecipeTitle from '../components/ui/RecipeTitle.js'
import RecipeIngredientsContainer from '../components/ui/RecipeIngredientsContainer'
import RecipeMethodContainer from '../components/ui/RecipeMethodContainer'
import { useParams } from 'react-router-dom'

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
