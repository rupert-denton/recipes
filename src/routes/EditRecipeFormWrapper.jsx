import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecipeForm from './RecipeForm'

export default function EditRecipeFormWrapper() {
  let { id } = useParams()

  const handleUpdateRecipe = (data) => {
    console.log(data)
    fetch(`/api/recipes/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id: id,
        name: data.recipe.name,
        method: data.recipe.method,
        ingredients: data.recipe.ingredients,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json))
  }

  const [recipeData, setRecipeData] = useState({
    name: '',
    method: '',
    ingredients: [],
  })

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let recipeName = data[0].recipe_name
        let recipeMethod = data[0].recipe_method
        setRecipeData({
          name: recipeName,
          method: recipeMethod,
          ingredients: data,
        })
      })
      .catch((err) => console.log(err))
  }, [id])

  console.log(recipeData)

  return (
    <div>
      <RecipeForm onSubmit={handleUpdateRecipe} data={recipeData} />
    </div>
  )
}
