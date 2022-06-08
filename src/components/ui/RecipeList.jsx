import './RecipeList.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RecipeList() {
  // use state as a source of truth for the array of recipes
  const [recipes, setRecipes] = useState([])

  // use effect will fetch the data (BUT not every render,
  // only once when the component FIRST renders)
  // in simple terms: the empty array at the end tells useEffect to only run once
  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      // set the state to the array of recipes, you could use .map here to only get recipe names
      // setRecipes(data.map(recipe => recipe.recipe_name))
      .then((data) => setRecipes(data))
      .catch((err) => console.log(err))
  }, [])

  // pull it out into a variable like this or into another component
  const recipeList = recipes.map((recipe, idx) => (
    <React.Fragment key={idx}>
      <div className="recipe">
        <Link to={'recipe/' + recipe.recipe_name}>{recipe.recipe_name}</Link>
      </div>
    </React.Fragment>
  ))

  return (
    <div className="recipe-list">
      <h1>Recipes</h1>
      {recipeList}
    </div>
  )
}
