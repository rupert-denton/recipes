import './RecipeForm.css'
import React, { useState } from 'react'

import RecipeTitle from '../components/ui/RecipeTitle'
import RecipeIngredientsContainer from '../components/ui/RecipeIngredientsContainer'
import RecipeMethodContainer from '../components/ui/RecipeMethodContainer'

export default function Recipe() {
  const [name, setName] = useState('')
  const [method, setMethod] = useState('')

  const [ingredientList, setIngredientList] = useState([])
  const [ingredientObject, setIngredientObject] = useState({
    ingredient_name: '',
    quantity: '',
    measure: '',
  })

  const handleChange = (e) => {
    let key = e.target.name
    let value = e.target.value
    console.log(key, value)
    // const { name, value } = e.target //this is an interesting way of declaring two variables inside curlies its called destructuring i believe, changed so i could understand
    let prev = { ...ingredientObject }
    prev[key] = value
    setIngredientObject(prev)
    //setIngredientList((prevState) => {
    //  const newIngredientList = [...prevState]
    //  newIngredientList[idx][key] = value
    //  return [...newIngredientList]
    //})
  }

  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          <div className="page-header">
            <h1>New Recipe</h1>
          </div>
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
            <textarea
              type="text"
              rows="10"
              cols="33"
              onChange={(e) => setMethod(e.target.value)}
            ></textarea>
          </div>

          {/* insert the ingredient list component here*/}

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
            </select>
            <button
              onClick={(e) => {
                setIngredientList((prev) => [
                  ...prev,
                  {
                    measure: ingredientObject.measure,
                    quantity: ingredientObject.quantity,
                    ingredient_name: ingredientObject.ingredient_name,
                  },
                ])
                e.preventDefault()
              }}
            >
              Add
            </button>
          </div>
          <RecipeTitle recipeName={name}></RecipeTitle>
          <div className="ingredient-method-frame">
            <RecipeIngredientsContainer
              recipeIngredients={ingredientList}
            ></RecipeIngredientsContainer>
            <RecipeMethodContainer
              recipeMethod={method}
            ></RecipeMethodContainer>
          </div>
        </form>
      </div>
    </div>
  )
}

///

// const sendRecipeName = function (e) {
//   e.preventDefault()
//   const recipeIngredient = {
//     ingredient_name: ingredient,
//     quantity: ingredientyQty,
//     measure: ingredientMeasure,
//   }

// fetch('http://localhost:3001/recipe', {
//   method: 'POST',
//   headers: { 'Content-type': 'application/json' },
//   body: JSON.stringify({ name: name, method: method }),
// }) //JSON.stringify(ingredientList) then at serverside iterate through the list and post them one by one
//    //run an forEach loop at serverdside running
//    insert the name and method into the recipe table and get the ID from the (last insert id) and then use that
//    id as a fk to help to insert the ingredients into the
//    helpful thing autocomplete plugin
// .then((resp) => resp.json())
//   .then((json) => console.log(json))
