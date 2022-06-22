import './RecipeForm.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'

import Navbar from '../components/ui/Navbar'
import RecipeTitle from '../components/ui/RecipeTitle'
import RecipeIngredientsContainer from '../components/ui/RecipeIngredientsContainer'
import RecipeMethodContainer from '../components/ui/RecipeMethodContainer'

export default function Recipe() {
  let { id } = useParams()

  const [name, setName] = useState('')
  const [methodStepsList, setMethodStepsList] = useState('')
  const [methodStepObject, setMethodStepObject] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  const [ingredientObject, setIngredientObject] = useState({
    ingredient_name: '',
    quantity: '',
    measure: '',
  })

  //pass through props
  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let recipeName = data[0].recipe_name
        let recipeMethod = data[0].recipe_method
        setName(recipeName)
        setMethodStepsList(recipeMethod)
        setIngredientList(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleChange = (e) => {
    let key = e.target.name
    let value = e.target.value
    let prev = { ...ingredientObject }
    prev[key] = value
    setIngredientObject(prev)
  }

  const handleMethodChange = (e) => {
    console.log(e.target.value)
    let method = e.target.value
    setMethodStepObject(method)
  }

  return (
    <div>
      <Navbar />
      <div className="recipe-form-container">
        <form className="recipe-form">
          <div className="page-header">
            <h1>Edit Recipe</h1>
          </div>

          {/* recipe name logic */}
          <div className="recipe-title recipe-element">
            <label>Recipe Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          {/* recipe method logic */}
          <div className="recipe-blurb recipe-element">
            <label>Recipe Method</label>
            <span className="method-span">
              <textarea
                rows="20"
                name="step_instructions"
                type="text"
                placeholder="Method will be split up based on new lines"
                value={methodStepsList}
                onChange={(e) => handleMethodChange(e)}
                // need to fix this so it isn't frozern
              ></textarea>
              <button
                onClick={(e) => {
                  setMethodStepsList()
                  e.preventDefault()
                }}
              >
                Add Method
              </button>
            </span>
          </div>

          {/* recipe ingredient logic */}
          <label>Recipe Ingredients</label>
          <div className="ingredient-triad">
            <input
              className="ingredient"
              name="ingredient_name"
              type="text"
              value={ingredientObject.ingredient_name}
              placeholder="Ingredient..."
              onChange={(e) => handleChange(e)}
            ></input>
            <input
              className="quantity"
              name="quantity"
              type="text"
              placeholder="Quantity..."
              value={ingredientObject.quantity}
              onChange={(e) => handleChange(e)}
            ></input>
            <select
              className="dropdown"
              name="measure"
              id="measure"
              value={ingredientObject.measure}
              onChange={(e) => handleChange(e)}
            >
              <option value="" disabled>
                --measure--
              </option>
              <option value="cup">cup</option>
              <option value="tsp">tsp</option>
              <option value="tbsp">tbsp</option>
              <option value="l">l</option>
              <option value="ml">ml</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="cm">cm</option>
              <option value="mm">mm</option>
              <option value="packet">packet</option>
              <option value="handful">handful</option>
              <option value="clove">clove</option>
              <option value="cloves">cloves</option>
              <option value="slice">slice</option>
              <option value="slices">slices</option>
              <option value="pinch">pinch</option>
              <option value="pinches">pinches</option>
              <option value="head">head of</option>
              <option value="heads">heads of</option>
              <option value="whole">whole</option>
            </select>
            <button
              onClick={(e) => {
                setIngredientList((oldIngredientList) => [
                  ...oldIngredientList,
                  {
                    measure: ingredientObject.measure,
                    quantity: ingredientObject.quantity,
                    ingredient_name: ingredientObject.ingredient_name,
                  },
                ])
                e.preventDefault()
              }}
            >
              Add Ingredient
            </button>
          </div>

          {/* recipe preview logic */}

          <RecipeTitle recipeName={name}></RecipeTitle>
          <div className="ingredient-method-frame">
            <RecipeIngredientsContainer
              recipeIngredients={ingredientList}
            ></RecipeIngredientsContainer>
            <RecipeMethodContainer
              recipeMethod={
                methodStepsList ? methodStepsList.split(/\r?\n/) : []
              }
            ></RecipeMethodContainer>
          </div>
          <button
            onClick={(e) => {
              console.log('Posting recipe')
              // postRecipe(e)
            }}
          >
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  )
}
