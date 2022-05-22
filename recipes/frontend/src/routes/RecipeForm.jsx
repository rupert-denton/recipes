import './RecipeForm.css'
import React, { useState } from 'react'

export default function Recipe() {
  const [name, setName] = useState('')
  const [method, setMethod] = useState('')
  const [ingredientList, setIngredientList] = useState([])

  const [ingredient, setIngredient] = useState('')
  const [ingredientyQty, setIngredientQty] = useState('')
  const [ingredientMeasure, setIngredientMeasure] = useState('')

  const sendRecipeName = function (e) {
    e.preventDefault()
    const recipeIngredient = {
      ingredient_name: ingredient,
      quantity: ingredientyQty,
      measure: ingredientMeasure,
    }

    setIngredientList((prev) => [...prev, recipeIngredient])
    console.log(ingredientList)

    // fetch('http://localhost:3001/recipe', {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    //   body: JSON.stringify({ name: name, method: method }),
    // })
    //   .then((resp) => resp.json())
    //   .then((json) => console.log(json))
  }

  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          <div className="page-header">
            <h1>New Recipe!</h1>
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

          <div className="ingredient-triad">
            <input
              className="ingredient"
              type="text"
              onChange={(e) => setIngredient(e.target.value)}
            ></input>
            <input
              className="quantity"
              type="text"
              onChange={(e) => setIngredientQty(e.target.value)}
            ></input>
            <select
              className="dropdown"
              name="measure"
              id="measure"
              onChange={(e) => setIngredientMeasure(e.target.value)}
            >
              <option value="cup">cup</option>
              <option value="tbsp">tbsp</option>
              <option value="tsp">tsp</option>
              <option value="kilogram">kg</option>
              <option value="gram">g</option>
              <option value="litre">l</option>
              <option value="millilitre">ml</option>
              <option value="none"></option>
            </select>
          </div>

          <div className="ingredient-triad">
            <input
              className="ingredient"
              type="text"
              onChange={(e) => setIngredient(e.target.value)}
            ></input>
            <input
              className="quantity"
              type="text"
              onChange={(e) => setIngredientQty(e.target.value)}
            ></input>
            <select
              className="dropdown"
              name="measure"
              id="measure"
              onChange={(e) => setIngredientMeasure(e.target.value)}
            >
              <option value="cup">cup</option>
              <option value="tbsp">tbsp</option>
              <option value="tsp">tsp</option>
              <option value="kilogram">kg</option>
              <option value="gram">g</option>
              <option value="litre">l</option>
              <option value="millilitre">ml</option>
              <option value="none"></option>
            </select>
          </div>
          <div className="save-button-container">
            <button className="save-recipe" onClick={(e) => sendRecipeName(e)}>
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
