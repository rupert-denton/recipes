import './IngredientNameQuant.css'

function IngredientNameQuant(props) {
  return (
    <div className="ingredient-list">
      <div className="ingredient-quantity">
        {props.recipeIngredients.length
          ? props.recipeIngredients[0].quantity
          : ''}
      </div>
      <div className="ingredient-measure">
        {props.recipeIngredients.length
          ? props.recipeIngredients[0].measure
          : ''}
      </div>
      <div className="ingredient-name">
        {props.recipeIngredients.length ? props.recipeIngredients[0].name : ''}
      </div>
    </div>
  )
}

export default IngredientNameQuant
