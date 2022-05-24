import './IngredientsList.css'
import React from 'react'

let ingredientArray
function mapIngredients() {
  return ingredientArray.map((item, idx) => (
    <React.Fragment key={idx}>
      <div className="ingredient-element">{item.quantity}</div>
      <div className="ingredient-element">{item.measure}</div>
      <div className="ingredient-element ingredient-name">
        {item.ingredient_name}
      </div>
    </React.Fragment>
  ))
}

function IngredientsList(props) {
  console.log(props)
  ingredientArray = props.recipeIngredients || []
  return <div className="ingredient-list">{mapIngredients()}</div>
}

export default IngredientsList
