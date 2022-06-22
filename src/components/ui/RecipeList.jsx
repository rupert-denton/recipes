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
            src={
              'https://i.pinimg.com/originals/8c/70/b7/8c70b7a537c15408a19eb92b5c1232c4.jpg'
            }
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
      <div className="recipes-list-container">{recipeList}</div>
    </div>
  )
}
