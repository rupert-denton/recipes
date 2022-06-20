import './IngredientsList.css'
import React from 'react'

let ingredientArray
function mapIngredients(props) {
  return ingredientArray.map((item, idx) => (
    <div className="ingredient-grouping" key={idx}>
      <div className="ingredient-element">{item.quantity}</div>
      <div className="ingredient-element">{item.measure}</div>
      <div className="ingredient-element ingredient-name">
        {item.ingredient_name}
      </div>
      <div
        className="ingredient-element delete"
        onClick={(evt) => props.onRemoveIngredient(item.ingredient_name)}
      >
        Remove
      </div>
    </div>
  ))
}

function IngredientsList(props) {
  ingredientArray = props.recipeIngredients || []
  return <div className="ingredient-list">{mapIngredients(props)}</div>
}

export default IngredientsList
