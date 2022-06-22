import '../components/ui/RecipeList.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'

export default function RecipeList() {
  const [recipes, setRecipes] = useState([])

  const recipeSetter = () => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    recipeSetter()
  }, [])

  const deleteRecipe = (e, id) => {
    console.log(id)
    e.preventDefault()
    fetch('/api/recipes/delete', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id,
      }),
    }).then(() => recipeSetter())
  }

  const recipeList = recipes.map((recipe, idx) => (
    <React.Fragment key={idx}>
      <div className="recipe">
        <span>
          <Link to={'/edit/' + recipe.id}>{recipe.recipe_name}</Link>
        </span>
        <span
          className="delete"
          onClick={(evt) => deleteRecipe(evt, recipe.id)}
        >
          Delete
        </span>
      </div>
    </React.Fragment>
  ))

  return (
    <div className="recipe-list">
      <Navbar />
      <h1>Edit Recipes</h1>
      {recipeList}
    </div>
  )
}
