import './RecipeList.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

let recipeArray
function mapRecipes() {
  return recipeArray.map((recipeName, idx) => (
    <React.Fragment key={idx}>
      <div className="recipe">
        <Link to={'recipe/' + recipeName}>{recipeName}</Link>
      </div>
    </React.Fragment>
  ))
}

export default function RecipeList() {
  const [recipeList, setRecipeList] = useState([])
  const retrieveAllRecipes = function () {
    fetch(`http://localhost:3001/`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((json) => {
        let recipes = []
        for (const item of json) {
          recipes.push(item.recipe_name)
        }
        setRecipeList(recipes)
      })
  }

  retrieveAllRecipes()
  recipeArray = recipeList || []
  return <div className="recipe-list">{mapRecipes()}</div>
}
