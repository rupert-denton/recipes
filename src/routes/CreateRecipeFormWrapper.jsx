import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecipeForm from './RecipeForm'

export default function CreateRecipeFormWrapper() {
  const handleAddRecipe = (data) => {
    fetch('/api/recipes/add', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: data.recipe.name,
        method: data.recipe.method,
        ingredients: data.recipe.ingredients,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json))
  }

  return (
    <div>
      <RecipeForm onSubmit={handleAddRecipe} />
    </div>
  )
}
