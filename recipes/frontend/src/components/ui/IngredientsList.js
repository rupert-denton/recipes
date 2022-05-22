import './IngredientsList.css'
import React from 'react'

let ingredientArray
function mapIngredients() {
  return ingredientArray.map((item) => (
    <React.Fragment>
      <div key={item.quantity} className="ingredient-element">
        {item.quantity}
      </div>
      <div key={item.measure} className="ingredient-element">
        {item.measure}
      </div>
      <div key={item.name} className="ingredient-element ingredient-name">
        {item.name}
      </div>
    </React.Fragment>
  ))
}

function IngredientsList(props) {
  ingredientArray = props.recipeIngredients || []
  return <div className="ingredient-list">{mapIngredients()}</div>
}

// return (
//   <div className="ingredient-list">
//     <div className="ingredient-element">recipeIngredients.quantity</div>
//     <div className="ingredient-element">recipeIngredients.measure</div>
//     <div className="ingredient-element ingredient-name">
//       recipeIngredients.name
//     </div>
//   </div>
// )

export default IngredientsList
