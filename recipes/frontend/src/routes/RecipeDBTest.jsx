import './RecipeForm.css'
import React, { useState } from 'react'
import RecipeTitle from '../components/ui/RecipeTitle.js'
import RecipeIngredientsContainer from '../components/ui/RecipeIngredientsContainer'
import RecipeMethodContainer from '../components/ui/RecipeMethodContainer'

export default function GetRecipe() {
  const [searchQuery, setSearchQuery] = useState('')
  const [name, setName] = useState('')
  const [methodStepsList, setMethodStepsList] = useState([])
  const [ingredients, setIngredients] = useState([])

  const retrieveRecipe = function (e) {
    e.preventDefault()
    fetch(`http://localhost:3001/getbasicrecipe/?name=${searchQuery}`, {
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
        setName(recipeName)
        setMethodStepsList(recipeMethod)
        setIngredients(json)
      })
  }

  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          <div className="page-header">
            <h1>Get Recipe!</h1>
          </div>
          <div className="recipe-title recipe-element">
            <label>Recipe Name</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} //event here is onChange this sets the value of e, presumably the target is the <input>
            ></input>
          </div>

          <div className="get-button-container">
            <button className="get-recipe" onClick={(e) => retrieveRecipe(e)}>
              Get Recipe
            </button>
          </div>

          <RecipeTitle recipeName={name}></RecipeTitle>
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
