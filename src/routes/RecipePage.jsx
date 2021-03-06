//external dependencies
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//styling
import './RecipeForm.css'

//components
import Navbar from '../components/ui/Navbar'
import RecipeTitle from '../components/ui/RecipeTitle.js'
import RecipeMethodContainer from '../components/ui/RecipeMethodContainer'
import RecipeIngredientsContainer from '../components/ui/RecipeIngredientsContainer'

export default function GetSpecificRecipe() {
  let { id } = useParams()
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [methodStepsList, setMethodStepsList] = useState([])

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let recipeName = data[0].recipe_name
        let recipeMethod = data[0].recipe_method.split(/\r?\n/)
        setRecipeName(recipeName)
        setMethodStepsList(recipeMethod)
        setIngredients(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <React.Fragment>
      <Navbar />
      <div className="recipe-form-container">
        <form className="recipe-form">
          <RecipeTitle recipeName={recipeName}></RecipeTitle>
          <RecipeIngredientsContainer
            recipeIngredients={ingredients}
          ></RecipeIngredientsContainer>
          <RecipeMethodContainer
            recipeMethod={methodStepsList}
          ></RecipeMethodContainer>
        </form>
      </div>
    </React.Fragment>
  )
}
