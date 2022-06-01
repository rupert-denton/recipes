import './RecipeForm.css'
import React, { useState } from 'react'

import RecipeTitle from '../components/ui/RecipeTitle'
import RecipeIngredientsContainer from '../components/ui/RecipeIngredientsContainer'
import RecipeMethodContainer from '../components/ui/RecipeMethodContainer'

export default function Recipe() {
  const [name, setName] = useState('')
  const [methodStepsList, setMethodStepsList] = useState('')
  const [methodStepObject, setMethodStepObject] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  const [ingredientObject, setIngredientObject] = useState({
    ingredient_name: '',
    quantity: '',
    measure: '',
  })

  const handleChange = (e) => {
    let key = e.target.name
    let value = e.target.value
    let prev = { ...ingredientObject }
    prev[key] = value
    setIngredientObject(prev)
  }

  const handleMethodChange = (e) => {
    let method = e.target.value
    setMethodStepObject(method)
  }

  const postRecipe = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/recipe', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: name,
        method: methodStepsList,
        ingredients: ingredientList,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json))
  }

  //JSON.stringify(ingredientList) then at serverside iterate through the list and post them one by one
  //run an forEach loop at serverdside running
  // insert the name and method into the recipe table and get the ID from the (last insert id)
  //and then use that id as a fk to help to insert the ingredients into the

  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          <div className="page-header">
            <h1>New Recipe</h1>
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
                rows="5"
                name="step_instructions"
                type="text"
                placeholder="Method will be split up based on new lines"
                onChange={(e) => handleMethodChange(e)}
              ></textarea>
              <button
                onClick={(e) => {
                  console.log(methodStepObject)
                  setMethodStepsList(methodStepObject)
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
              postRecipe(e)
            }}
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  )
}
