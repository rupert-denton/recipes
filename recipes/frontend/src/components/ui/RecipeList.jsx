import './RecipeList.css'
import React, { useState } from 'react'

export default function RecipeList() {
  const [recipeList, setRecipeList] = useState([])
  const retrieveAllRecipes = function () {
    fetch(`/`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json)
      })
  }

  retrieveAllRecipes()
  return (
    <div className="recipe-list">
      {/* iterate through returned data (recipeList) and put here */}
    </div>
  )
}
