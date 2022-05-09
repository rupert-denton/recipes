import './IngredientItem.css'

function IngredientItem(props) {
  console.log(props)
  return (
    <div>
      <div className="ingredient-quantity">{props.quantity}</div>
      <div className="ingredient-name">{props.ingredientName}</div>
    </div>
  )
}

export default IngredientItem
