import './RecipeForm.css'
import React, { useState, useEffect } from 'react'

import RecipeTitle from '../components/ui/RecipeTitle'
import RecipeIngredientsContainer from '../components/ui/RecipeIngredientsContainer'
import RecipeMethodContainer from '../components/ui/RecipeMethodContainer'

export default function Recipe(props) {
  console.log(props)
  const [name, setName] = useState('')
  const [methodStepsList, setMethodStepsList] = useState('')
  const [methodStepObject, setMethodStepObject] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  const [ingredientObject, setIngredientObject] = useState({
    ingredient_name: '',
    quantity: '',
    measure: '',
  })

  const formLabel = props.data ? 'Update Recipe' : 'New Recipe'
  let buttonLabel = props.data ? 'Update Recipe' : 'Add Recipe'

  useEffect(() => {
    setName(props.data ? props.data.name : '')
    setMethodStepsList(props.data ? props.data.method : '')
    setIngredientList(props.data ? props.data.ingredients : '')
  }, [props])

  //new recipe logic
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

  const recipe = {
    name: name,
    method: methodStepsList,
    ingredients: ingredientList,
  }

  function handleAddRecipe() {
    props.onSubmit({
      recipe,
    })
  }

  function handleUpdateRecipe() {
    console.log(recipe)
    // props.onSubmit({
    //   recipe,
    // })
  }

  function handleRemoveIngredient(ingredient) {
    console.log(`Removing ingredient ${ingredient}`)
    const updatedIngredientList = ingredientList.filter(
      (item) => item.ingredient_name !== ingredient
    )
    setIngredientList(updatedIngredientList)
  }

  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          <div className="page-header">
            <h1>{formLabel}</h1>
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

          <div className="recipe-blurb recipe-element">
            <label>Recipe Method</label>
            <span className="method-span">
              <textarea
                rows="5"
                name="step_instructions"
                type="text"
                placeholder="Method will be split up based on new lines"
                defaultValue={methodStepsList}
                onChange={(e) => handleMethodChange(e)}
              ></textarea>
              <button
                onClick={(e) => {
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
              onRemoveIngredient={handleRemoveIngredient}
            ></RecipeIngredientsContainer>
            <RecipeMethodContainer
              recipeMethod={
                methodStepsList ? methodStepsList.split(/\r?\n/) : []
              }
            ></RecipeMethodContainer>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              buttonLabel = 'Add Recipe'
                ? handleAddRecipe()
                : handleUpdateRecipe()
            }}
          >
            {buttonLabel}
          </button>
        </form>
      </div>
    </div>
  )
}
