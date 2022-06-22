import './RecipeList.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RecipeList() {
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())

      .then((data) => {
        setRecipes(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const recipeList = recipes.map((recipe, idx) => (
    <React.Fragment key={idx}>
      <div className="recipe-card">
        <div className="recipe-image">
          <img
            alt="placeholder for a recipe"
            className="recipe-image"
            src={'/place-holder.png'}
          />
        </div>
        <div className="recipe">
          <div className="recipe-card-header">
            <Link className="recipe-link" to={`recipe/${recipe.id}`}>
              {recipe.recipe_name}
            </Link>
          </div>
          <div className="recipe-slug">
            <p className="slug-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  ))

  return (
    <div className="recipe-list">
      <h1>Recipes</h1>
      <div className="recipes-list-container">{recipeList}</div>
    </div>
  )
}
